const fs = require("fs");
const path = require("path");


// create folder
const dataFolder = path.join(__dirname,"data")

if(!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder);
    console.log("folder created")
}

// creating file

const filePath = path.join(dataFolder,"example.txt")
// Sync way of creating
// fs.writeFileSync(filePath,"Hello from node js")
// console.log('file created successfully')


const readContentFromFile = fs.readFileSync(filePath,"utf8")

console.log("File reading",readContentFromFile)

fs.appendFileSync(filePath,'\nThis is a new line added to file')

console.log('new file content added')

// async way of creating file

const asyncFilePath = path.join(dataFolder,'async-example.txt')

fs.writeFile(asyncFilePath,'Hello , Async node js',(err)=>{
    if(err) throw err
    console.log(`Async file is created successfully`);
})

fs.readFile(asyncFilePath,"utf8",(err,data)=>{
    if(err) throw err;
    console.log("Async file content:",data)

    fs.appendFile(asyncFilePath,'\nThis is a new line added',(err)=>{
        if(err) throw err
        console.log('New line added to async')
    })
})