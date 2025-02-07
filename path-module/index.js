const path = require('path')


// imp
console.log("Directory name:", path.dirname(__filename))

console.log("File name",path.basename(__filename))

console.log("file extension",path.extname(__filename))


// imp
const joinedPath = path.join("/user","documents","node","projects")
console.log("Joined path", joinedPath)

const resolvedPath = path.resolve("user","documents","node","project")
console.log("Resolved Path",resolvedPath)

const normalize = path.normalize("/user/.documents/../node/projects")

console.log("normalize path", normalize)