const mongoose = require('mongoose');

const Chess_Schema = new mongoose.Schema({
    GameCode:{
        type:String
    }
});

const Chess_Model = mongoose.model("Chess_Schema",Chess_Schema);

module.exports = Chess_Model;