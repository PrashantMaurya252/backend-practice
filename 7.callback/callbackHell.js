const fs = require('fs')


fs.readFile('input.txt','utf8',(err,data)=>{
    if(err){
        console.log('error in reading file ',err)
        return
    }

    const modifyFileData = data.toUpperCase();

    fs.writeFile('output.txt',modifyFileData,(err)=>{
        if(err){
            console.log("Error writing file",err)
            return;
        }

        console.log('data written into new File')
        fs.readFile('output.txt','utf8',(err,data)=>{
            if(err){
                console.error('Error reading in file',err)
                return
            }
            console.log(data)
        })
    })
})