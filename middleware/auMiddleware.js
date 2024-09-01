import JWT from 'jsonwebtoken'
import usersModel from '../models/usersModel.js';

export const requireSignIn = async(req,res,next) => {
    try {
      const decode = JWT.verify(
        req.headers.authorization, 
        process.env.jwt_secret
       );
       req.user = decode;
       next();
    }  catch(error) {
       console.log(error)
    }
};

export const isAdmin = async(req,res,next) => {
    try {
      const user = await usersModel.findById(req.user._id)
      if(user.role !== 1){
        return res.status(401).send({
          success:false,
          message:'Unauthorized Access',
        });
      } else {
        next();
      }
    } catch(error) {
      console.log(error);
      res.status(401).send({
       success:false,
       error,
       message:'Error in admin middleware please try again',
     });
    }
};

