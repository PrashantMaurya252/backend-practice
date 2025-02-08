const fs = require('fs')


function person(name,callbackFn){
    console.log(`Hello ${name}`)
    callbackFn()
}

function address(){
    console.log("India")
}

person('Prashant Maurya',address)

fs.readFile('input.txt','utf8',(err,data)=>{
    if(err){
        console.log('error in reading file ',err)
    }

    console.log(data)
})