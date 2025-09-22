import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { error } from "console";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// placing user order from razorpay

const placeorder = async (req, res) => {

  try {
    const { cart, amount, address } = req.body;
    const userId = req.user._id;

    // Create order in Razorpay
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    // Save order in DB (status: pending)
    const newOrder = new orderModel({
      user: userId,
      items: cart,
      amount,
      address,
      razorpayOrderId: order.id,
      status: "Food Processing",
      paymentMethod: "ONLINE",
    });

    await newOrder.save();

    // Clear cart
    await userModel.findByIdAndUpdate(userId, { cartdata: {} });

    res.status(201).json({
      success: true,
      orderId: order.id,                 // send to frontend for Razorpay Checkout
      amount: order.amount,
      currency: order.currency,
      message: "order placed"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
};

// Verify payment 

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentStatus } = req.body;

    if (paymentStatus === "failed") {
      await orderModel.findOneAndDelete({ razorpayOrderId: razorpay_order_id });
      return res.status(200).json({
        success: false,
        message: "Payment failed. Order deleted.",
      });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      await orderModel.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: "Food Processing",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          payment: true,
        }
      );
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      await orderModel.findOneAndDelete({ razorpayOrderId: razorpay_order_id });

      return res.status(400).json({
        success: false,
        message: "Payment unsuccessful. Order deleted.",
      });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};

// Place Order with COD
const placeCodOrder = async (req, res) => {
  try {
    const { cart, amount, address } = req.body;
    const userId = req.user._id;

    // Save COD order in DB
    const newOrder = new orderModel({
      user: userId,
      items: cart,
      amount,
      address,
      paymentMethod: "COD",
      payment: false, 
      status: "Food Processing"
    });

    await newOrder.save();

    // Clear cart
    await userModel.findByIdAndUpdate(userId, { cartdata: {} });

    res.status(201).json({
      success: true,
      message: "order placed successfully",
      order: newOrder
    });
  } catch (error) {
    console.log("COD Order Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to place COD order" });
  }
};


// user all order 

const userorder = async (req, res) => {

  try {

    const orders = await orderModel.find({ userId: req.body.userId });

    res.json({ success: true, data: orders })

  } catch {
    res.json({ success: false, message: "Error" });
  }
}

// list of all orders by user 

const listorder = async (req, res)=>{

    try {

    const orders = await orderModel.find({});

    res.json({ success: true, data: orders })

  } catch {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }

}

const updatestatus = async( req , res)=>{
      try {
        const { orderId, status } = req.body;

        const updatedOrder = await orderModel.findByIdAndUpdate(
          orderId,
          { status },
          { new: true }
        );

        if (!updatedOrder) {
          return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Order status updated", data: updatedOrder });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update order status" });
      }
}

export { placeorder, verifyPayment, userorder , listorder  , updatestatus , placeCodOrder}