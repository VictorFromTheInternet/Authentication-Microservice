import mongoose from 'mongoose'
const {Schema, model} = mongoose

export const userSchema = new Schema({
    name: String,
    email: String,
    password: String,    
})


export default model('User', userSchema)