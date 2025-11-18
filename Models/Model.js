const mongoose = require('mongoose')

const PaymentProviderSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },

    Provider: {
        type: String,
        required: true,
        unique: true
    },

    type: {
        type: String // 'card','wallet','bank','offline'
    },
    is_active: {
        type: Boolean,
        default: true
    }


},{timestamps:true})

module.exports = mongoose.model('PaymentProvider', PaymentProviderSchema);
