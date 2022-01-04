const User = require('../models/Users');

const userController={

    getAllUsers: async(req,res)=>{
        try{
            const user = await User.find();
            res.status(200).json(user);
        }catch(err)
        {
            res.status(500).json(err);
        }
    },

    deleteUser: async(req,res)=>{
        const {id}=req.params;
        try{
            const user =await User.findById(id);
            
            res.status(200).json("Xóa thành công");
        }catch(err)
        {
            res.status(500).json(err);
        }
    }
}

module.exports=userController;


