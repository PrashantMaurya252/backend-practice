const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register endpoint

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // check if the user is already exist in our database

    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User is already exists either with same username or same email ! Try different username or email",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newUser.save();

    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Unable to register user please try again",
      });
    }
  } catch (error) {
    console.log(error, "register error");
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

// login controller

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExist = await User.findOne({ username });
    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const accessToken = jwt.sign(
      {
        userId: userExist._id,
        username: userExist.username,
        role: userExist.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successful",
      accessToken,
    });
  } catch (error) {
    console.log(error, "register error");
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

const changePassword = async(req,res)=>{
  try {
    const userId = req.userInfo.userId;
   
    // extract old and new password
    const {oldPassword,newPassword} = req.body

    const user = await User.findById(userId)
    if(!user){
      return res.status(400).json({
        success:false,
        message:'User not found'
      })
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword,user.password)

    if(!isPasswordMatch){

      return res.status(400).json({
        success:false,message:'Old password is not correct! Please try again!'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const newHashedPassword = await bcrypt.hash(newPassword,salt)

    user.password = newHashedPassword
    await user.save()
    res.status(200).json({
      success:true,message:'Password change successfully'
    })
  } catch (error) {
    console.log(error,"change pasword error")
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
}

module.exports = { loginUser, registerUser,changePassword };
