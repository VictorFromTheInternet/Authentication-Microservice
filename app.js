import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieparser from 'cookieparser'
import mongoose from 'mongoose'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'


import login_router from './routers/login.js'

const app = express()

app.use(express.json())


app.listen(()=>{
    console.log(`Listening on port: ${PORT}`)
})