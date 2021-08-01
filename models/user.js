// https://github.com/adnanrahic/securing-restful-apis-with-jwt

var mongoose = require('mongoose');  

var UserSchema = new mongoose.Schema({  
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  password_confirmation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
