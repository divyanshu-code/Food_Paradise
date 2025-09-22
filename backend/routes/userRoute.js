import express from 'express'
import { login , signup } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/login' , login)
userRouter.post('/register' , signup);


export default userRouter;