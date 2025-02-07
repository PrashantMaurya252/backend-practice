console.log("node module wrapper demo")

console.log("__dirname in wrapper",__dirname)
console.log("__filename in wrapper",__filename)

module.exports.greet = function(name){
    console.log(`Hello ${name}`)
}