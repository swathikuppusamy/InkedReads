//routes/user.js
import express from 'express'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { User } from '../models/User.js'
const router =express.Router()
import jwt from 'jsonwebtoken'


router.post('/signup',async(req,res)=>{
    const {username,email,password}=req.body
    const user= await User.findOne({email})
    if(user){
        return res.json({message: "User already existed"})
    }
    const hashPassword = await bcrypt.hash(password,10)
    const newuser=new User({
        username,
        email,
        password:hashPassword,
    })
    await newuser.save()
    res.status(201).json({ message: 'User created successfully', userId: newuser._id });

   // return res.json({status:true,message : "record registered"})


})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        return res.json({message: "User is not Registered"})
    }
    const validPassword=await bcrypt.compare(password,user.password)
    if(!validPassword)
    {
        return res.json({message: "Password is incorrect"})
    }

    const token=jwt.sign({username:user.username},process.env.JSON_KEY,{expiresIn:'1h'})
    res.cookie('token',token,{httpOnly:true,maxAge:360000})
    return res.json({status:true,message:"Login Successfully"})
})

// router.post('/forgot-password',async(req,res)=>{
//     const {email}=req.body
//     try{
//         const user=await User.findOne({email})
//         if(!user){
//           return res.json({message:"user not registered"})
//           const token = jwt.sign({id:user._id},process.env.JSON_KEY,{expiresIn:'5m'})
//           var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: 'swathik.22cse@kongu.edu',
//               pass: '7-May-05'
//             }
//           });
          
//           var mailOptions = {
//             from: 'swathik.22cse@kongu.edu',
//             to: email,
//             subject: 'Reset Password',
//             text: `http://localhost:5173/resetPassword/${token}`
//           };
          
//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               return res.json({message:"error sending email"})
//             } else {
//               return res.json({status:true,message:"email sent successfully"})
//             }
//           });
        
//         }
//     }catch(err){
//         console.log(err)
//     }
// })

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not registered" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JSON_KEY, { expiresIn: '5m' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'swathikuppusamy2005@gmail.com',
                pass: 'hdoq zvsi wsbs kajg',
            }
        });

        const mailOptions = {
            from: 'swathikuppusamy2005@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `Please use the following link to reset your password: http://localhost:5173/resetpassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.json({ message: "Error sending email" });
            } else {
                return res.json({ status: true, message: "Email sent successfully" });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
    }
});

router.post('/reset-password/:token',async(req,res)=>{
    const {token}=req.params;
    const {password}=req.body;
    try{
        const decoded = await jwt.verify(token,process.env.JSON_KEY)
        const id=decoded.id
        const hashPassword=await bcrypt.hash(password,10)
        await User.findByIdAndUpdate({_id:id},{password:hashPassword})
        return res.json({status:true,message:"Updated Password"})

    }catch(err)
    {
        return res.json("Invalid token")
    }
})

const verifyUser= async(req,res,next)=>{
    try{
    const token = req.cookies.token;
    if(!token){
        return res.json({status:false,message:"no token"});
    }
    const decoded= await jwt.verify(token,process.env.JSON_KEY)
    next()
}catch(err){
    return res.json(err)
}
}

router.get('/verify',verifyUser,(req,res) =>{
    return es.json({status:true,message:"authorized"})
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({status:true})
})

export {router as UserRouter}