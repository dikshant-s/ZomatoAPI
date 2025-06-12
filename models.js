const {DataTypes, INTEGER, BOOLEAN} = require('sequelize');

const sequelize = require('./dbconnect');

const Users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  createdAt: {
    type: DataTypes.TIME,
  },
  updatedAt: {
    type: DataTypes.TIME,
  }
});

const Menu = sequelize.define("Menu",{
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  item_description: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  item_price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  item_rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  item_availability: {
    type:DataTypes.INTEGER,
    allowNull: false,
  },
  is_veg:{
    type: DataTypes.BOOLEAN,
    allowNull:false,
  },
  restaurant_id:{
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  createdAt: {
    type: DataTypes.TIME,
  },
  updatedAt: {
    type: DataTypes.TIME,
  },
});

const Restaurant = sequelize.define("Restaurant",{
  restaurant_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull:false,
  }, 
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.TIME,
  },
  updatedAt: {
    type: DataTypes.TIME,
  },
});

const Orders = sequelize.define("Orders",{
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  item_id: {
    type: INTEGER,
    allowNull:false
  },
  id  : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order_status: {
    type: DataTypes.STRING  ,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.TIME,
  },
  updatedAt: {
    type: DataTypes.TIME,
  },
});

const Order_details = sequelize.define("Order_details",{
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  quantity  : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER  ,
    allowNull: false,
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:true
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.TIME,
  },
  updatedAt: {
    type: DataTypes.TIME,
  },
});

Menu.belongsTo(Restaurant,{foreignKey:"restaurant_id"});
Restaurant.hasMany(Menu,{foreignKey:"restaurant_id"});

Users.hasMany(Orders,{foreignKey:"id"});
Orders.belongsTo(Users,{foreignKey:"id"});
Order_details.belongsTo(Orders,{foreignKey:"order_id"});
Orders.hasMany(Order_details,{foreignKey:"order_id"});

module.exports = {Users:Users,Restaurant:Restaurant,Menu:Menu,Orders:Orders,Order_details:Order_details};