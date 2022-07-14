const { request, response } = require("express");
const RoomDto = require("../dtos/roomDto");
const roomServices = require("../services/roomServices");

class RoomsController {
   async create(req, res){
    // request chack 
    const {createTopic, typeRoom} = req.body;

    if(!createTopic || !typeRoom){
        return res.status(400).json({message: "Required fields not provided"});
    }

    const room = await roomServices.create({
        topic: createTopic,
        roomtype: typeRoom,
        ownerId: req.user.id
    })

    return res.status(200).json(new RoomDto(room))


    }


/// get all rooms from database

   async getAllRooms(req, res) {
        const rooms = await roomServices.getRooms(['public'])

        const allRooms = rooms.map(room => new RoomDto(room));
        return res.json(allRooms)
    }
}

module.exports = new RoomsController();