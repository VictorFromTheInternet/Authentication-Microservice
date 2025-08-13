import express from 'express'
const router = express.Router()

// health check
router.get('/', (req,res)=>{

    res.send('<h1>Hello World</h1>')
})

export default router