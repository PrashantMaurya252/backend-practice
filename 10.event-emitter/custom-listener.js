const EventEmitter = require('events')

class MyCustomEmitter extends EventEmitter{
    constructor(){
        super()
        this.greeting = 'Hello'
    }

    greet(name){
        this.emit('greeting',`${this.greeting},${name}`)
    }
}

const MyCustomEmitter1 = new MyCustomEmitter()
MyCustomEmitter1.on('greeting',(input)=>{
    console.log(`Greeting event`,input)
})

MyCustomEmitter1.greet('Prashant Kumar Maurya')