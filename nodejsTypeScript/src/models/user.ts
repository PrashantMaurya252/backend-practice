import mongoose, { Schema,Document } from "mongoose";

interface IUSER extends Document{
    name:string,
    email:string,
    age:number,
    createdAt:Date
}

const userSchema = new Schema<IUSER>({
    name:String,
    email:String,
    age:Number,
    createdAt:Date
})

const User = mongoose.model<IUSER>('User',userSchema)

export {User,IUSER}