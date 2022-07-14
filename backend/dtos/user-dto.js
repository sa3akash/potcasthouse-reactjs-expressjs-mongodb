class UserDto{
    id;
    phone;
    activated;
    created;
    name;
    avater

    constructor(user){
        this.id = user._id;
        this.phone = user.phone;
        this.activated = user.activated;
        this.created = user.createdAt;
        this.name = user.name;
        this.avater = user.avater;
    }
}

module.exports = UserDto;