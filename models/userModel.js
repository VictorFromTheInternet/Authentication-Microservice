import mongoose from 'mongoose'
const {Schema, model} = mongoose

export const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},    
})


export default model('User', userSchema)