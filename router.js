const express = require('express');
const router = express.Router();
// const data = require('./model');


router.post("/registerUser",async(req,res) => {
  const newUser = new data({
    name: req.body.name,
    email: req.body.req,
    password: password.body.password,
    phone_number: phone_number.body.phone_number,
  });
  try{
    const res1 = await newUser.save();
    res.json(res1);
    res.status(201).send("user created successfully");
  }
  catch(err){
    res.send("Error sending data" +err);
  }

  
});
// catch(err) {
//   console.log(err);
// }
// });



router.post('/login',async(req,res) => {
  const {email,password} = req.body;

  const findUser = await data.findOne({where:{email:email}});

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
module.exports = router;