const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const RefreshSchema = new Schema({
    token: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: "User"}
},{
    timeseries: true
})


module.exports = mongoose.model('Refresh', RefreshSchema, 'tokens')