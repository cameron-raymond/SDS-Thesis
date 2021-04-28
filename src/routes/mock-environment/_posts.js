// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.
const fs = require("fs");
const frontMatter = require("front-matter");
const marked = require("marked");

const dirPath = `./content`;
export const posts = fs.readdirSync(dirPath).map((postFilename) => {
  const postContent = fs.readFileSync(dirPath + `/${postFilename}`, {
    encoding: "utf8",
  });
  const postFrontMatter = frontMatter(postContent);
  let post = postFrontMatter.attributes
  post.evidence = post.rumour == "R1" ? "high" : "low"
  post.profileImage = undefined;
  post.timestamp = undefined;
  post.username = undefined;
  post.name = undefined;
  post.text = marked(postFrontMatter.body).replace(/^\t{3}/gm, "")
  post.warning = false;
  post.reshared = false;
  post.clickedWarning = false;
  return post
});