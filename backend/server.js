import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRoute.js";


// app config 
const app = express();
const port = process.env.Port || 4000;

// middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//db connection

connectDB()

// api endpoints 

app.use('/food', foodRouter)
app.use('/user' , userRouter)
app.use('/images' , express.static('uploads'));
app.use('/cart' , cartRouter);
app.use('/order' , orderRouter)


app.get("/", (req, res) => {
      res.send("API working")
})

app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);

})