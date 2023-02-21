const userSchema = require("../collections/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = { 
    async findUser(Email){
        try{
            const existingUser = await userSchema.findOne({Email : Email})
            if(!existingUser){
                return {
                    success: false
                }
            }else{
                return {
                    success: true,
                    user: existingUser
                }
            }
        }catch(err){
            console.log(err)
        }
    },

    async signIn(user,password){
        try{
            //comparing password
            const matchPassword = await bcrypt.compare(password , user.Password)
            if(!matchPassword){
                return {
                    success: false
                }
            //   res.status(400).json({message : "password is not matched"})
            }
            //generating token based on user information
            const token = jwt.sign({Email : user.Email , id : user._id} , process.env.SECRET_KEY , {expiresIn : '5m'}) 
            return {
                success: true,
                user : user , token : token
            }
        }catch(err){
            console.log(err)
        }
    }
}