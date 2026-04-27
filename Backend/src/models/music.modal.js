const mongoose = require('mongoose');
const musicScema  = new mongoose.Schema({
    url:{
        type:String,
        required:true,
    },
    thumbnail: {
        type: String,
        default: ""
    },
    title:{
     type:String,
      required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

const music = mongoose.model("music" , musicScema);
module.exports = music