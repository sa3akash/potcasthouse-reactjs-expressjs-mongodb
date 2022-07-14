const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const RoomSchema = new Schema({
    topic: {type: String, required: true},
    roomtype: {type: String, required: true},
    ownerId: {type: Schema.Types.ObjectId, ref: "User"},
    speakers: {
        type: [
            {type: Schema.Types.ObjectId, ref: 'User'},
    ],
    required: false,
    }
},{
    timeseries: true
})


module.exports = mongoose.model('Room', RoomSchema, 'rooms')