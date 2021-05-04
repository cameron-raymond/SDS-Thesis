const fs = require("fs");

const sample = (arr, num) => {
    const max = arr.length;
    if (num > max) {
        console.error("To sample number is greater than array length. Using array length.")
    }
    const toSample = Math.min(num, max)
    return arr.sort(() => 0.5 - Math.random()).slice(0, toSample)
}

function arrayFromObject(obj) {
    var arr = [];
    for (var i in obj) {
        arr.push(obj[i]);
    }
    return arr;
}

function groupBy(list, fn) {
    var groups = {};
    for (var i = 0; i < list.length; i++) {
        var group = fn(list[i]);
        if (group in groups) {
            groups[group].push(list[i]);
        } else {
            groups[group] = [list[i]];
        }
    }
    return groups;
}

exports.handler = async (event, context) => {
    switch (event.httpMethod) {
        case "GET":
            // Get posts
            let posts = JSON.parse(fs.readFileSync(require.resolve('./assets/posts.json', {
                encoding: "utf8",
            })));
            posts = posts.map(post => {
                post.evidence = post.rumour == "R1" ? "high" : "low"
                post.profileImage = undefined;
                post.timestamp = undefined;
                post.username = undefined;
                post.name = undefined;
                post.warning = false;
                post.reshared = false;
                post.clickedWarning = false;
                return post
            });

            // Sample 
            let { numPerCategory, affirms, denies, neutral, questions } = event.queryStringParameters;
            numPerCategory = parseInt(numPerCategory) || posts.length
            affirms = parseInt(affirms) || posts.length
            denies = parseInt(denies) || posts.length
            neutral = parseInt(neutral) || posts.length
            questions = parseInt(questions) || posts.length
            let toSample = { numPerCategory, affirms, denies, neutral, questions } 
            
            // group posts by rumour
            const groupedByRumour = arrayFromObject(groupBy(posts, item => item.rumour));
            // For each rumour
            const sampledFrames = groupedByRumour.map(rumour => {
                // group by code ID
                const groupedByCode =  groupBy(posts, item => item.code);
                // Sample the specified number of posts
                const sampledFrames = Object.keys(groupedByCode).map(key => sample(groupedByCode[key], toSample[key]));
                // Concat the the 2d array (1 for each code) into one big array
                const sampledPosts = [].concat.apply([], sampledFrames)
                return sampledPosts
            })
            // Put all the frames back together
            const sampledPosts = [].concat.apply([], sampledFrames)
            console.log("2 * ("+affirms+" + "+denies+" + "+neutral+" + "+questions+") = "+sampledPosts.length)
            return {
                statusCode: 200,
                /* Required for CORS support to work */
                'Access-Control-Allow-Origin': '*',
                /* Required for cookies, authorization headers with HTTPS */
                'Access-Control-Allow-Credentials': true,
                body: JSON.stringify(sampledPosts)
            }
            break;
    }
    return {
        statusCode: 404,
        body: JSON.stringify({ "error": "Request type not known." })
    }
}