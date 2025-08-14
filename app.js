import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'

import connectDb from './config/mongodb.js'
import healthCheck_router from './routers/helloWorld.js'
import login_router from './routers/loginRouter.js'

const app = express()
const PORT = process.env.PORT
connectDb()

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.use('/', healthCheck_router)
app.use('/api', login_router)


app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})