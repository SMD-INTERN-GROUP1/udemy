const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const course = new mongoose.Schema({

        title: {
            type:String,
            default:''
        },
        image: {
            type:String,
            default:''
        },
        description: {
            type: String,
            default:''
        },
        author: {
            type: String,
            default: ''
        },
        price: {
            type:Number,
            default:0
        },
        slug: {
            type: String, 
            slug: "title", 
            unique: true 
        },
        price_discount: {
            type: Number,
            default:false
        },
        chapter_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Chapter'
        },
        topic_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Topic'
        }
    },
    {timestamps:true}

);

module.exports=mongoose.model("Courses",course);