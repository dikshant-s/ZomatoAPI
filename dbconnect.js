const {Sequelize} = require("sequelize")


const sequelize = new Sequelize("zomato","root","mysql",{
  host : "localhost",
  dialect : "mysql",
});

sequelize.authenticate().then(() => {
  console.log("Connected to database sucessfully")

}).catch((err) => {
  console.log("Unable to connect to db due to "+ err)
});

module.exports = sequelize;