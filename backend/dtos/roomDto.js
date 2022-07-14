class RoomDto{
    _id;
    topic;
    roomtype;
    ownerId;
    speakers;
    createdAt;

    constructor(room){
        this._id = room._id;
        this.topic = room.topic;
        this.roomtype = room.roomtype;
        this.ownerId = room.ownerId;
        this.speakers = room.speakers;
        this.createdAt = room.createdAt;

    }
}

module.exports = RoomDto;