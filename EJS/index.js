const express = require('express');
const path = require('path');

const app = express()

app.set('view engine','ejs')

// set the directory for the views

app.set('views',path.join(__dirname,'views'));

const products =[
    {
        id:1,
        label:'Product 1'
    },
    {
        id:2,
        label:'Product 2'
    },
    {
        id:3,
        label:'Product 3'
    },
];

app.get('/',(req,res)=>{
    res.render('home',{title:'Home',products:products})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About page'})
})

const port = 3000

app.listen(3000,()=>{
    console.log('Server is running at 3000')
})