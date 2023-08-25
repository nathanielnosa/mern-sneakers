const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require("dotenv").config();



// making api
const app = express()

app.use(cors())
app.use(express.json({limit:"20mb"}))
const PORT = process.env.PORT || 4000

//Mongodb connection
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('connected to database'))
.catch((err)=>console.log(err))



// ::::API:::

// get
app.get("/",(req,res)=>{
    res.send("Server is running");
});

//::: USER API ::::://
//::: USER API ::::://

// schema
const userSchema = mongoose.Schema({
    fname:String,
    lname:String,
    email:{
        type:String,
        unique:true,
    },
    pwd:String,
    cpwd:String,
    profile:String
})

// model
const userModel = mongoose.model('user',userSchema)

// register
app.post("/register",(req,res)=>{
    console.log(req.body);
    const{email} = req.body
    userModel.findOne({email: email})
    .then((result)=>{
        if(result){
            res.send({message: "Email already exists!",alert: false});
        }else{
            const data = userModel(req.body)
            const save = data.save()
            res.send({message: "Register successful!",alert:true})
        }
    })
});
// login
app.post("/login",(req,res)=>{
    const{email} = req.body
    userModel.findOne({email: email})
    .then((result)=>{
        if(result){
            const dataSend = {
                _id: result._id,
                fname:result.fname,
                lname:result.lname,
                email:result.email,
                profile:result.profile,

            }
            console.log(dataSend);
            res.send({message: "Login Successfully!",alert: true,data:dataSend})
        }else{
            res.send({message: "Email/Password is not registered!",alert: false})

        }
    })
});

// ::PRODUCT API::: //
// schema
const productSchema = mongoose.Schema({
    pName: String,
    pCat: String,
    pPrice: Number,
    pDesc: String,
    image: String,
})

// model

const productModel = mongoose.model('product',productSchema);

// create product
app.post('/addproduct',async (req,res)=>{
    console.log(req.body);
    const data = await productModel(req.body);
    const saveData = await data.save();
    
    res.send({message:'A new product added successfully!', alert:true})
})

// get all product
app.get('/products',async (req,res)=>{
    // get data from mongodb
    const data = await productModel.find({})
    res.send(JSON.stringify(data));
});


app.listen(PORT,()=>console.log(`server running on port ${PORT}`))