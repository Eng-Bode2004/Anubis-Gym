const mongoose =require('mongoose')

const Specialization_Schema = new mongoose.Schema({


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

module.exports = new mongoose.model('Specialization',Specialization_Schema);