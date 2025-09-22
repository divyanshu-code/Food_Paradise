import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";
import { fileURLToPath } from "url";

// recreate __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config 
const app = express();
const port = process.env.PORT || 4000;

// middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//db connection

connectDB()

// api endpoints 

app.use('/food', foodRouter)
app.use('/user' , userRouter)
app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use('/cart' , cartRouter);
app.use('/order' , orderRouter)


app.get("/", (req, res) => {
      res.send("API working")
})

app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);

})