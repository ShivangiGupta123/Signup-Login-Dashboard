const userSchema = require("../collections/userSchema");

module.exports = { 
    async getUserDetails(){
        try{
            let result = userSchema.find();
            return result;
        }catch(err){
            console.log(err)
        }
    }
}