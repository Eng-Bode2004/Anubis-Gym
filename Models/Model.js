const mongoose =require('mongoose')

const Role_Schema = new mongoose.Schema({


    name:{
        type:String,
        required:true,
        unique:true,
    },


    description:{
        type:String,
    },

    imageUrl:{
        type:String,
    }


})

module.exports = new mongoose.model('Role',Role_Schema);