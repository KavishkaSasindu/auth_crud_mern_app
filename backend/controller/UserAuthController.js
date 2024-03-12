const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");

const signUpUser = async (request, response) => {
  const { username, email, password } = request.body;
  try {
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword,
      });
      if (!newUser) {
        return response.status(200).json({
          message: "user not created",
        });
      }
      return response.status(201).json({
        message: "user created",
        user: newUser,
      });
    }
    return response.status(200).json({
      message: "user already exist",
    });
  } catch (error) {
    return response.status(400).json({
      message: "error occur",
      error: error.message,
    });
  }
};

module.exports = { signUpUser };
