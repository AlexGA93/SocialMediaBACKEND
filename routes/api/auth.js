//Bring in express Router
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
//bcrypt
const bcrypt = require("bcryptjs");
//We need a name , email and password so we need to use express validator
const { check, validationResult } = require("express-validator");
const config = require("config");

const User = require("../../models/User"); //Schema

//@route GET api/auth
//@desc Test route
//@access Public
router.get("/", auth, async (req, res) => {
  //we want to recieve the user's data
  try {
    const user = await User.findById(req.user.id) //we put req. user because we put that it had the user decoded with its ID
      .select("-password"); //we don't want to show password

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/auth
//@desc Authenticate User & Get Token
//@access Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    //'async' ==>  function always returns a promise
    //to handle with the response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //if not errors
      return res.status(400).json({ errors: errors.array() }); //return us status (ideal : 400)
    }

    const { email, password } = req.body;
    try {
      //See if User exists
      let user = await User.findOne({ email }); //'await' ==> Javascript wait until that promise settles and return its result

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //we want to be sure that passwords matches
      const isMatch = await bcrypt.compare(password, user.password); //comparing the password in the user's entry with the encrypted password
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
      }

      //Return jsonwebtoken (JWT)
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000, //we want to expire in the time but we can put a big value to work easy
        },
        (err, token) => {
          //callback that takes the possible error an the token itself
          if (err) throw err; //check for errors
          res.json({ token }); //if not errors, send token as json
        }
      ); //we need a jwt secret ==> default.js
    } catch (err) {
      console.error("Error: " + err.message);
      res.status(500).send("Server error"); //message sent if there's an error and status responsed
    }
  }
);

//exports
module.exports = router;
