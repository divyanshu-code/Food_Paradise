import express from 'express'
import { addtocart , removefromcart , fetchfromcart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/Auth.js'

const cartRouter = express.Router()

cartRouter.post('/add' ,authMiddleware, addtocart)
cartRouter.post('/remove' ,authMiddleware, removefromcart)
cartRouter.post('/get' ,authMiddleware, fetchfromcart)


export default cartRouter;