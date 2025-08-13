import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieparser from 'cookieparser'
import mongoose from 'mongoose'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'

import healthCheck_router from './routers/helloWorld.js'
import login_router from './routers/login.js'

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use('/', healthCheck_router)
app.use('/login', login_router)


app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})