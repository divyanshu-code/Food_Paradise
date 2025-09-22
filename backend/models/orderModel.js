import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: {
        type: Array,
        required: true

    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    }
    ,
    status: {
        type: String,
        default: "Food Processing"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    paymentMethod: {
        type: String,
        enum: ["ONLINE", "COD"],
        required: true
    },
    razorpayOrderId: {
        type: String,
    },
    razorpayPaymentId: {
        type: String,
    },
    razorpaySignature: {
        type: String,
    },
    payment: {
        type: Boolean,
        default: false
    }
});

const orderModel = mongoose.model.order || mongoose.model('order', orderSchema);

export default orderModel