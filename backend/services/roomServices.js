const RoomModel = require("../models/roomModel");

class RoomService {
    async create(payload){
        const {topic,roomtype,ownerId} = payload;

        // create room 
        const room = await RoomModel.create({topic,roomtype,ownerId, speakers:[ownerId]})


        return room;
    }

    async getRooms(types){
        // create room 
        const rooms = await RoomModel.find({roomtype: {$in: types}}).populate('speakers').populate('ownerId').exec();

        return rooms;
    }
}


module.exports = new RoomService();