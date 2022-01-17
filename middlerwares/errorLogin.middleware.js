const checkErrorLogin={
  check:(req,res,next)=>{
    let errors=[];  
    let {email,password} = req.body;
    if(!email){
      errors.push('Email không chính xác');
    }
    if(!password){
      errors.push('Password không chính xác');
    }
    // if(!errors.length){
    //   res.render('component/login',{

    //   });
    //   return;
    // }
    console.log('123',email,password)
    next();
    }
};
module.exports=checkErrorLogin;