const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const {User,Restaurant, Menu,Orders,Order_details} = require('./models');
const { Json } = require('sequelize/lib/utils');

// const User = require("./router");
// const { mongo, default: mongoose } = require('mongoose');
// const url = "mongodb://localhost:27017/userdata";

const port = 4000;
const app = express();
// mongoose.connect(url);
// const con = mongoose.connection;
// con.on("open",() => {
//   console.log("Connected Successfully");
// })
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());

// app.use('/user',User);

app.listen(port,(err) => {
  if (err) {
    console.log("Error" + err)
  }
  else{
    console.log("Server Started successfully on port http://localhost:" +  port)
  }
})

// for getting data

app.get('/test', (req,res) => {
  res.status(200).send("helllo");
})

// app.post("/login",(req,res) => {
//   console.log(req.body);
//   res.status(200).send("data send successfully");
// })

app.post("/registerUser",async(req,res) => {
  const {name,email,password,phone_number,createdAt,updatedAt} = req.body;
  console.log(name,email);
  try{
  const newUser = await User.create({
    name,
    email,
    password,
    phone_number,
    createdAt,
    updatedAt,
  });

  res.status(201).send("user created successfully");
}
catch(err) {
  console.log(err);
}
});

app.post('/login',async(req,res) => {
  const {email,password} = req.body;

  const findUser = await User.findOne({where:{email:email}});

  if (findUser) {
    // console.log(findUser);
    const data = JSON.parse(JSON.stringify(findUser));
    console.log(data.password);
    if (data.password == password){
      res.status(200).send("logged in successfully");
    }
    else{
      res.status(401).send("Invalid Password");
    }
  }
  else{
    res.status(200).send("User doesn't exit Please register!")
  }
});


app.post("/registerRestaurant", async(req,res) => {
  
  const {name,address,phone_number,rating,status} = req.body;

  try{

    const newRestaurant = await Restaurant.create({
      name,
      address,
      phone_number,
      rating,
      status,
  });

  if (newRestaurant) {
    res.status(201).send("restaurant added successfully");
  }

  }
  catch(err){
    console.log(err);
    res.status(400).send("something went wrong");
  }


});

app.post("/addMenu", async(req,res) => {
  const {restaurant_id,item_name,item_description,item_price,item_rating,item_availability,is_veg} = req.body;
  
  try{

    const newItem = await Menu.create({
      restaurant_id,
      item_name,
      item_description,
      item_price,
      item_rating,
      item_availability,
      is_veg
    });
    if (newItem){
      res.status(201).send("Item added successfully");
    }
    
  }
  catch(err){
    console.log(err);
    res.status(400).send("Error adding item");
  }
});

app.post("/createOrder", async (req,res) => {
  const {id,order_status,item_id,quantity,price,payment_method} = req.body;

  try{
    const newOrder = await Order_details.create({
      id,
      // restaurant_id,
      order_status,
      item_id,
      quantity,
      price,
      payment_method,
    });
    if (newOrder) {
      try{
        
        const restaurant_id_data = await Menu.findByPk(item_id);

        const obj = JSON.parse(JSON.stringify(restaurant_id_data));

        const restaurant_id = obj.restaurant_id;

        const order_id_obj = JSON.parse(JSON.stringify(newOrder));
        
        const order_id = order_id_obj.order_id;

        const createOrder = await Orders.create({
          order_id,
          restaurant_id,
          item_id,
          id,
          order_status,
        });

        if(createOrder){
          res.status(200).send("Order placed successfully");
        }
      }
      catch(err){
        console.log(err); 
        res.status(400).send("error occured")
      }
    }
  }
  catch(err){
    console.log(err);
    res.status(400).send("Something went wrong please try again..")
  }
});


