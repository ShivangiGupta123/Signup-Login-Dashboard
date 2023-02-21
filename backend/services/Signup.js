const userSchema = require("../collections/userSchema");
const jwt = require("jsonwebtoken");
const { findUser } = require("./Signin");

module.exports = {
  async findUser(Email) {
    try {
      const existingUser = await userSchema.findOne({ Email: Email });
      if (existingUser) {
        return {
          success: false,
        };
      } else {
        return {
          success: true,
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
  async comparePassword(params) {
    try {
      if (params.Password === params.Confirm_Password) {
        // encrypt or hash password

        const hashedPassword = await bcrypt.hash(params.Password, 12);
        const hashedConfirmPassword = await bcrypt.hash(
          params.Confirm_Password,
          12
        );
        return {
          success: true,
          hashPassword: hashedPassword,
          hashCpassword: hashedConfirmPassword,
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
};
