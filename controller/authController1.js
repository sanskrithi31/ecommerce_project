import { comparePassword, hashPassword } from "./../helper/auHelper.js"
import usersModel from "../models/usersModel.js"
import JWT from 'jsonwebtoken'

export const registerController = async(req,res) => {

    try{
        const {name,email,password,phone,address,answer} = req.body
        if(!name){
            return res.send({message:'Name is Required'})
        }
        if(!email){
            return res.send({message:'Email is Required'})
        }
        if(!password){
            return res.send({message:'Password is Required'})
        }
        if(!phone){
            return res.send({message:'Phone no is Required'}) 
        }
        if(!address){
            return res.send({message:'Address is Required'})
        }
        if(!answer){
            return res.send({message:'Answer is Required'})
        }
        const existingUser = await usersModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already registered please login to continue',                
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await new usersModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer,
        }).save();
        res.status(201).send({
            success:true,
            message:'User registered successfully',
            user,
        });
    }   catch(error){
        console.log(error)
        res.status(500).send({
          success:false,
          message:'Error in Register',
            error
        })
        }
}

export const loginController = async(req,res) => {
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        const user = await usersModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        const token = await JWT.sign({_id:user._id}, process.env.jwt_secret,{expiresIn: "7d",
    });
    res.status(200).send({
        success:true,
        message:'login successfully',
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role,
        },
        token,
    });
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error,
        });
    }
};

export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Email is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      
      const user = await usersModel.findOne({ email, answer });
      
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await usersModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };


export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };


  export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await usersModel.findById(req.user._id);
      
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await usersModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error While Update profile",
        error,
      });
    }
  };
