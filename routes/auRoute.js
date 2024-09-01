import express from 'express'
import {
    registerController, 
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
} from "../controller/authController1.js"
import { isAdmin, requireSignIn } from "../middleware/auMiddleware.js"
const router = express.Router()

router.post('/register',registerController)


router.post('/login',loginController)

router.post('/forgot-password', forgotPasswordController)

router.get("/test", requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req,res) => {
    res.status(200).send({ok:true})
})

router.get("/admin-auth", requireSignIn,isAdmin, (req,res) => {
    res.status(200).send({ok:true})
})

router.put("/profile", requireSignIn, updateProfileController);



export default router