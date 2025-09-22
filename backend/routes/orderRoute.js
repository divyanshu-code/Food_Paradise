import express from 'express'
import { placeorder , verifyPayment, userorder , listorder , updatestatus , placeCodOrder} from '../controllers/orderController.js';
import authMiddleware from '../middleware/Auth.js';

const orderRouter = express.Router()

orderRouter.post('/place' , authMiddleware , placeorder);
orderRouter.post("/place-cod", authMiddleware, placeCodOrder); 
orderRouter.post('/verify' , verifyPayment)
orderRouter.post('/order-item' , authMiddleware, userorder );
orderRouter.get('/list-user-order' , listorder)
orderRouter.post('/updatestatus' , updatestatus )

export default orderRouter;