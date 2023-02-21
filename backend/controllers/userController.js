const userSchema = require("../collections/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate = require('../middleware/userValidation');
const userDetails = require('../services/UserDetails');
const signin = require('../services/Signin');
const CryptoJS = require("crypto-js");
// const signup = require('../services/Signup');

//Signup

const Signup = async (req, res) => {
  //Existing User
  //Hashed Password
  //Creating User
  //generate token

  const { Username, Email, Password, Confirm_Password, Phone , DOB ,token } = req.body;
  try {
    //Checking existing user or not

    const existingUser = await userSchema.findOne({ Email: Email });
    if (existingUser) {
      res.status(400).json({ message: "User is already exist" });
    }

    if (Password === Confirm_Password) {
      // encrypt or hash password

      const hashedPassword = await bcrypt.hash(Password, 12);
      const hashedConfirmPassword = await bcrypt.hash(Confirm_Password, 12);
     
     //valid or not
      const valid = await validate.validateAsync(req.body)
      
      if(valid){
         //user creation
        const data = new userSchema({
            Username: Username,
            Email: Email,
            Password: hashedPassword,
            Confirm_Password: hashedConfirmPassword,
            Phone: Phone,
            DOB: DOB,
            
          });
          
    
          // generating token
    
          const token = jwt.sign(
            { Email: data.Email, id: data._id },
            process.env.SECRET_KEY ,{expiresIn : '5d'}
          );
        //  const Double_Encryption_Token = CryptoJS.AES.encrypt(JSON.stringify(token), 'secretkey123').toString();
        //  console.log("Double_Encryption_Token" , Double_Encryption_Token)

          // token will save in database 
          if(token){
            const data = new userSchema({
                Username: Username,
                Email: Email,
                Password: hashedPassword,
                Confirm_Password: hashedConfirmPassword,
                Phone: Phone,
                DOB: DOB,
                token : token,
                // token1 : Double_Encryption_Token
                
              });
              //save in database
              await data.save();
            
          }
        
          res
            .status(201)
            .json({
              message: "Register is done successfully ",
              result: data,
              token: token,
              // token1 : Double_Encryption_Token
            });

      }
      else {
        res.status(400).json({message : "data is not valid"})
      }
      
    } else {
      res
        .status(400)
        .json({ message: "password and confirm password is not matched" });
    }
  } catch (error) {
    console.log("error", error);
  }
};


//Signin

const Signin = async(req,res)=>{
  const { Email, Password } = req.body
  try{
    const exist = await userSchema.findOne({Email: Email})
    if(!exist){

      return res.status(400).json({message : "email not store in database"})
      

    }
    const comparePassword = await bcrypt.compare(Password , exist.Password)
    const token = await jwt.sign({Email : exist.Email , id : exist._id}, process.env.SECRET_KEY)
    console.log("token" , token)
    const Double_Encryption_Token = CryptoJS.AES.encrypt(JSON.stringify(token), 'secret key 123').toString();
    console.log("Double_Encryption_Token" , Double_Encryption_Token)

    if(!comparePassword)
    {
        res.status(400).json({message : 'password not match in  our database'})
    }
    // console.log("token =",token)
    return res.status(201).json({
        data : exist,
        token : Double_Encryption_Token,
        message : 'login is done successfully'
    })
  }
  catch(error){
    res.status(500).json({message : "Error is coming" , error : error })
  }

}








//UserDetails

const UserDetails = async(req,res)=>{
  let users = await userDetails.getUserDetails()
  console.log(users);
  res.status(200).json({message : "All user Data" , UserDetails : users})
 
}



module.exports = { Signup , Signin ,UserDetails};























































// const Signin = async(req,res)=>{
//   const { Email, Password } = req.body
//   try{
//     let existingUser = await signin.findUser(Email)
//     if(existingUser.success){
//       let signIn = await signin.signIn(existingUser.user,Password);
//       if(signIn.success){
//         res.status(200).json({message : "Login successfully" , user : signin.existingUser , token : signin.token})
//         console.log("signin.existingUser" ,signin.existingUser )
//       }else{
//         res.status(400).json({message : "password is not matched"})
//       }
//     }else{
//       res.status(400).json({message : "User is not exist"})
//     }
//   }
//   catch(error){
//     res.status(500).json({message : "Error is coming" , error : error })
//   }

// }


 // userSchema.find((err , userDetails)=>{
  //   if(err){
  //     return res.status(500).json({message : " error " , error : error})
  //   }
  //   res.status(200).json({message : "All user Data" , UserDetails : userDetails})
  // })
