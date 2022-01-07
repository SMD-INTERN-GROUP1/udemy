const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController ={
    //register
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
                    username: user.username,
                    createdAt:user.createdAt,
                    updatedAt:user.updatedAt,
                },process.env.JWT_ACCESS_KEY,
                {expiresIn:"2h"}
                );
                 const refreshToken=jwt.sign({
                    username: user.username,
                    createdAt:user.createdAt,
                    updatedAt:user.updatedAt,
                },process.env.JWT_REFRESHTOKEN_KEY,
                {expiresIn:"365d"}
                );
                // res.status(200).json({user,accessToken,refreshToken});
                delete user.password;
                req.session.isAuthenticated=true;
                req.session.authUser=user;
                res.redirect("/");
            }
        }catch(err){
            return   res.status(500).json(err);
        }
    }
}
module.exports = authController;