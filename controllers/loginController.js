import cookieParser from "cookie-parser"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config()

export const registerController = async (req, res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400).json({message:"Missing details"})
        return
    }


    try{
        // check if user exists
        const existingUser = await userModel.findOne({email})        
        if(existingUser){
            res.status(400).json({message:"User already already exists"})
            return
        }

        // create user for db
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        // add to db
        await user.save()

        // create jwt, use the default mongo UUID
        const token = jwt.sign({
            id:user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: '7d'})

        // send to client
        res.cookie('token', token, {
            httpOnly: true,
            secure: (process.env.NODE_ENV === "production") ? true:false,
            sameSite: (process.env.NODE_ENV === "production") ? 'none':'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({message:"Credentials successfully created"})
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Could not register"})
    }    
}

export const loginController = async (req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        res.status(400).json({message:"Missing details"})
        return
    }

    try{
        // check if user exists & validate password
        const existingUser = await userModel.findOne({email})        
        if(!existingUser){
            res.status(400).json({message:"Invalid email"})
            return
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)

        if(!isMatch){
            res.status(400).json({message:"Invalid password"})
            return
        }        

        // create jwt, use the default mongo UUID
        const token = jwt.sign({
            id:existingUser._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: '7d'})

        // send to client
        res.cookie('token', token, {
            httpOnly: true,
            secure: (process.env.NODE_ENV === "production") ? true:false,
            sameSite: (process.env.NODE_ENV === "production") ? 'none':'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({message:"Login Successful"})
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Could not verify credentials"})
    } 
}

export const logoutController = (req, res)=>{

    try{

        // clear cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: (process.env.NODE_ENV === "production") ? true:false,
            sameSite: (process.env.NODE_ENV === "production") ? 'none':'strict',
            
        })

        res.json({message:"Log out successful"})

    }catch(error){
        console.error(error)
        res.status(500).json({message:"Could not log out "})
    }        
}