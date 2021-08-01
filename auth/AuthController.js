var express = require('express');
var router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

var User = require('../models/user');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

router.post('/signup', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var hashedPasswordConfirmation = bcrypt.hashSync(req.body.password_confirmation, 8);

    User.create({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : hashedPassword,
        password_confirmation : hashedPasswordConfirmation,
    },
    function (err, user) {
        if (err) return res.status(500).send("There was a problem registering the user.")
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ 
          auth: true, 
          token: token, 
          user: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
          } 
        });
    }); 
});

router.post('/signin', function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ 
        auth: true, 
        token: token, 
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        } 
      });
    });
    
  });

  // AuthController.js
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;