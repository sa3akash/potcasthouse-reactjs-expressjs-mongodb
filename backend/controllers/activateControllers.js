const Jimp = require('jimp');
const path = require('path');
const UserDto = require('../dtos/user-dto');
const userServices = require('../services/userServices');


class ActivateController {
   async activate(req, res){

    const {name, avater} = req.body;

    if(!name){
        return res.status(400).json({message:"All fields are required"});
    }
       // Image Base64
       const buffer = Buffer.from(
        avater.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''),
        'base64'
    );

    const imagePath = `potcasthouse-${Date.now()}-${Math.round(Math.random() * 1e9)}.png`

    try{
        const jimpResp = await Jimp.read(buffer)
        jimpResp.resize(150, Jimp.AUTO).write(path.resolve(__dirname, `../storage/${imagePath}`));

    }catch(err){
       return res.status(500).json({message:"Couldn't process this image"});
    }

    // update user
    const userID = req.user.id;
    try{
            const user = await userServices.findUser({_id: userID})

            if(!user){
            res.status(404).json({message: "User not found!"})
            }
            user.activated = true;
            user.name = name;
            user.avater = `/storage/${imagePath}`;
            user.save();
            res.json({user: new UserDto(user),  auth: true});

        }catch(err){
            res.status(500).json({message: "Couldn't process this user"});
            }
    }

}

module.exports = new ActivateController();