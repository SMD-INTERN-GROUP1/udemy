const User = require("../database/models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController ={
    //login
    loginUser: async(req,res)=>{
        const {email , password} = req.body;
        try{
            const user = await User.findOne({email : email});
            if(!user){
                // json('Sai tài khoản!');
                return res.status(404).render('component/login');
            }
            const validPassword = await bcrypt.compare(
                password,
                user.password
            );
            if(!validPassword){
                // json('Sai mật khẩu!');
                return res.status(404).render('component/login');
            }
            if(user && validPassword){
                const accessToken = jwt.sign({
                    user_id:user._id,
                    username: user.username,
                    isTeacher:user.isTeacher,
                    createdAt:user.createdAt,
                    updatedAt:user.updatedAt,
                },process.env.JWT_ACCESS_KEY,
                {expiresIn:"1h"}
                );
                 const refreshToken=jwt.sign({
                    user_id:user._id,
                    username: user.username,
                    isTeacher:user.isTeacher,
                    createdAt:user.createdAt,
                    updatedAt:user.updatedAt,
                },process.env.JWT_REFRESHTOKEN_KEY,
                {expiresIn:"2h"}
                
                );
                res.cookie("user", user, {
                    httpOnly: true,
                    sameSite: "strict",
                })
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    sameSite: "strict",
                })
                res.redirect("/");
                
            }
        }catch(err){
            return   res.status(500).json(err);
        }
    },
    logOut:(req,res)=>{
        res.clearCookie("user");
        res.clearCookie("accessToken");
        res.redirect("/");
    }
     
}
module.exports = authController;
