const mongoose = require('mongoose');
const musicSchema  = new mongoose.Schema({
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
        ref:"users",
        required:true
    }
})

const music = mongoose.model("music" , musicSchema);
module.exports = music