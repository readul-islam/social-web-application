import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    
    const newUser = new User ({
        ...rest,
        password: passwordHash,
        viewedProfile:Math.floor(Math.random() * 10000),
        impression:Math.floor(Math.random() * 10000)
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (error) {
    res.status(500).json({type:error.name, massage:error.message});
  }
};


/* LOGGING IN */
export const login = async(req,res) =>{
  try {
     const {email,password} = req.body;
     const user = await User.findOne({email});
     if(!user) return res.status(400).json({massage:'User does not exist.'});
     const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch) return res.status(400).json({massage:'Invalid credentials.'});
     
     const token = Jwt.sign({id:user._id}, process.env.JWT_SECRET);
     delete user.password;
     res.status(200).json({token, user});

  } catch (error) {
    res.status(500).json({type:error.name, massage:error.message});
  }
}
