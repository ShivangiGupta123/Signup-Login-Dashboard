//require jwt token
//add req.headers.authorization in any variable liken token variable
//verify the token i.e. valid or not
//if valid token then move on next()
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {

  const token = req.headers.authorization;
  if (token) {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.Email = user.Email;
    console.log("token = " , token)
    console.log("req.email = ",req.Email)
    console.log("user.email = ",user.Email)
    console.log("req.email = user.email " , req.Email = user.Email)
    next();
  }
  else{
    console.log("Unauthorized Users")
    res.status(500).json({message : "Unauthorized User"})
  }

};
module.exports = auth