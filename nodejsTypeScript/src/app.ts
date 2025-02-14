import express,{Express,Request,Response,NextFunction} from 'express'
import { IUSER, User } from './models/user'

const app:Express =express()
const port = 3000


// req -> Request <p, ResBody, ReqBody, ReqQuery,Locals>
// /user/:id -> res.json / res.send

app.use(express.json())

interface CustomRequest extends Request{
    startTime?:number
}

app.use((req:CustomRequest,res:Response,next:NextFunction)=>{
    req.startTime = Date.now()
    next()
})
app.get('/',(req:Request,res:Response)=>{
    res.send("Hello. Types with express")
})

// post route -> new user -> name,email -> req.body
//  -> /user/:id?name -> Request <{},{},{},{}>

interface User{
    name:String,
    email:String
}

app.post('/user',(req:Request<{},{},User>,res:Response)=>{
    const {name,email} = req.body
    res.json({
        message:`User created ${name}-${email}`
    })
})

// users based by id
app.get('/users/:id',(req:Request<{id:string}>,res:Response)=>{
    const {id} = req.params
    res.json({
        userId:id
    })
})

app.get('/users',async(req:Request,res:Response)=>{
    try {
        const user:IUSER[] = await User.find()
    } catch (error) {
        console.log(error,"error")
        res.status(400).json({
            message:'Some error occured!'
        })
    }
})

app.listen(port,()=>{
    console.log(`Server is now running on port ${port}`)
})