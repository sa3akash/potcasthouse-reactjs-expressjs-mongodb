const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    phone: {type: String, required: true},
    name: {type: String},
    avater: {type: String, get: (avater)=>{
        if(avater){
            return `${process.env.BASE_URL}${avater}`
        }
    }},
    activated: {type: Boolean, required: false, default:false},
},{
    timeseries: true,
    toJSON: {getters: true}
})


module.exports = mongoose.model('User', UserSchema, 'users')