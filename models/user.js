// https://github.com/adnanrahic/securing-restful-apis-with-jwt

var mongoose = require('mongoose');  

var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  password_confirmation: String
});

module.exports = mongoose.model("User", UserSchema);
