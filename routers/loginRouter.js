import express from 'express'
const router = express.Router()

import {
    loginController,
    logoutController,
    registerController
} from '../controllers/loginController.js'

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/logout', logoutController)

export default router