import mongoose from 'mongoose'
const {Schema, model} = mongoose

export const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},    
    isAccountVerified: {type: Boolean, required: false, default: false},
    verifyOtp: {type: String, required: false, default: ''},
    verifyOtpExpiresAt: {type: Number, required: false, default: 0},    
    resetOtp: {type: String, required: false, default: ''},
    resetOtpExpiresAt: {type: String, required: false, default: 0},
})


export default model('User', userSchema)