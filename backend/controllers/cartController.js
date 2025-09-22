import userModel from "../models/userModel.js";

// add item to user cart 

const addtocart = async (req,res)=>{
    
        try {
            const userId = req.user._id;
            const userdata = await userModel.findById(userId)           // findOne()  gives a object always 
            const cartData = await userdata.cartdata

            if(!cartData[req.body.itemId]){
                cartData[req.body.itemId] = 1;
            }else{
             
                cartData[req.body.itemId] += 1;
                 
            }

            await userModel.findByIdAndUpdate(userId, {cartdata: cartData})

            res.json({success: true , message:"Added to cart"})

        } catch (error) {
            console.log(error);
            
            res.status(500).json({success: false ,message: "error"});
        }

}

// remove item from user cart 

const removefromcart = async (req , res)=>{
    try {
    const userId = req.user._id;
    const userdata = await userModel.findById(userId);
    const cartData = userdata.cartdata;

    if (cartData[req.body.itemId]) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] <= 0) {
        delete cartData[req.body.itemId];               // remove item if count <= 0
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartdata: cartData });

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error removing from cart" });
  }
}

// fetch data from user cart 

const fetchfromcart = async (req , res)=>{
    try {
    const userId = req.user._id;
    const userdata = await userModel.findById(userId);

    res.json({ success: true, cartdata: userdata.cartdata });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching cart data" });
  }

}

export { addtocart , removefromcart , fetchfromcart};