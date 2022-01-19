const jwt = require("jsonwebtoken");

const middlewareController = {
    verifyToken:(req,res,next)=>{
        // const token = decodeURIComponent(req.headers.cookie);
        const token = decodeURIComponent(req.cookies.accessToken);
        if(token){
            const accessToken=token;
           try{
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY,(err,user)=>{
                if(err){
                    res.redirect("/login");
                }
                req.user=user;
                next();
            });
           }catch(err){
                console.log(error);
                res.sendStatus(403);
           }
        }
        else{
            res.status(401).json("You're not authenticated");
        }
    }
}

module.exports=middlewareController.verifyToken;