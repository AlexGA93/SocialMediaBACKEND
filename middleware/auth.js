// Midleware that validates the web token to access to protected routes

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //middleware function

  //Get token from header
  //When we send a request too a protected route we need to send the token with a header so let's go to create it
  const token = req.header("x-auth-token");

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //Verify token
  try {
    //decode the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //take the request object and assign a value to user
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
