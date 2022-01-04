const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController ={
    //register

    registerUser: async(req,res)=>{ 
        try{
            const salt =  await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,salt);

            //Create new account
            const {username , email} = req.body;
            const newUser = await new User({
                username:username,
                email:email,
                password:hashed,
            });

            //Save DB
            const user = await newUser.save();
            res.status(200).json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //login
    loginUser: async(req,res)=>{
        const {email , password} = req.body;
        try{
            const user =await User.findOne({email:email});
            if(!user){
                res.status(404).json("Sai tài khoản!");
            }
            const validPassword = await bcrypt.compare(
                password,
                user.password
            );
            if(!validPassword){
                res.status(404).json('Sai mật khẩu!');
            }
            if(user && validPassword){
                const accessToken = jwt.sign({
                    username: user.username,
                    createdAt:user.createdAt,
                    updatedAt:user.updatedAt,
                },process.env.JWT_ACCESS_KEY,
                {expiresIn:"2h"}
                );
                
                res.status(200).json({user,accessToken});
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports = authController;