const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signUpUser
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
      const token = await jwt.sign(
        { userId: newUser._id, userEmail: newUser.email },
        "secret",
        {
          expiresIn: "24h",
        }
      );
      return response.status(201).json({
        message: "user created",
        user: newUser,
        jwt: token,
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

// signInUser
const signInUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await UserModel.findOne({ email });
    console.log("User:", user); // Log user details for debugging
    if (!user) {
      return response.status(401).json({
        message: "user not found",
      });
    }
    const authUser = await bcrypt.compare(password, user.password);
    console.log("Auth User:", authUser); // Log authentication result for debugging
    if (!authUser) {
      return response.status(401).json({
        message: "incorrect password",
      });
    }
    const token = await jwt.sign(
      { userId: user._id, usrEmail: user.email },
      "secret",
      { expiresIn: "24h" }
    );

    return response.status(200).json({
      message: "user loggedIn",
      jwt: token,
      data: user.email,
    });
  } catch (error) {
    return response.status(400).json({
      message: "error occur",
      error: error.message,
    });
  }
};

// dashboard
const dashboard = async (request, response) => {
  return response.status(200).json({
    message: "Hello User",
  });
};

module.exports = { signUpUser, signInUser, dashboard };
