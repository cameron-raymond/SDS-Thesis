// Creates a new post-study-response item in the database's post-study-responses table
export async function post(req, res, next) {
    console.log("Creating a new post-study response")
    /* Initializes */
    res.setHeader('Content-Type', 'application/json')
    /* Retrieves the data */
    var data = req.body
    // Do something with the data...
    /* Returns the result */
    console.log(data)
    return res.end(JSON.stringify({ success: true }))
}