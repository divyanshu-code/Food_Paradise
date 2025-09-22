import foodModel from "../models/foodModels.js";
import fs from "fs"

// add food items
const addFood = async(req , res)=>{

     if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
         
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
         
        name:req.body.name,
        description:req.body.description, 
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try{
        await food.save();
        res.json({success:true ,message:"Food Added"})
    }catch(error){
         
        console.log("error");
        res.json({success:false ,message:"Error"})
    }
}

// list food items 
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching food items" });
    }
};

//remove food items 
const removeFood = async (req, res) => {
    try {
        const { id } = req.body;

         const food = await foodModel.findById(id);
         fs.unlink(`uploads/${food.image}` , ()=>{})

        const deletedFood = await foodModel.findByIdAndDelete(id);
        if (!deletedFood) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        res.json({ success: true, message: "Food item removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};

export { addFood, listFood, removeFood };

