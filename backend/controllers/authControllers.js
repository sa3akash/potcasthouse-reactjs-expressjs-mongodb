const OtpService = require("../services/otpServices")
const HashService = require("../services/hashServices");
const userServices = require("../services/userServices");
const TokenServices = require("../services/tokenServices");
const UserDto = require('../dtos/user-dto');

class AuthController {
    async sendOtp(req, res) {
        const {phone} = req.body;
        if (!phone) {
            return res.status(400).json({error: 'Phone Number is required!'});
        }
        const otp = await OtpService.generateOtp();

        // expiry date and hashdata ready
        const ttl = 1000 * 60 * 2;
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hashOtp = HashService.hashOtp(data)

        // send otp request
        try{
         // await OtpService.sendBySms(phone, otp)
            return res.status(200).json({
                hash: `${hashOtp}.${expires}`,
                phone: phone,
                otp
            })
        } catch(error){
            res.status(500).json({message : 'Message sending failed'})
        }

        res.json({msg: hashOtp})
    }



    async verifyOtp(req, res, next){
        const {phone, otp, hash}= req.body;
        if (!phone || !otp || !hash) {
            return res.status(400).json({message: "All fields are required!" })
        }

        // const {hashOtp, expires} = hash.split('.');
        const hashOtp = hash.split('.')[0];
        const expires = hash.split('.')[1];

        if(Date.now() > +expires) {
            return res.status(400).json({message: 'Your OTP code is expired! Please try again'})
        }
        const data = `${phone}.${otp}.${expires}`;

        const isValid = OtpService.verifyOtp(hashOtp, data)
        if(!isValid){
            return res.status(400).json({message: 'Invalid OTP'})
        }
        // if otp is valid then....
        let user;

     try{
      user = await userServices.findUser({phone: phone});
      if(!user){
       user = await userServices.createUser({phone: phone})
      }
     }catch(error){
        return res.status(500).json({message: 'DB Error'})
     }

    const {accessToken, refreshToken} = TokenServices.generateTokens({id: user._id, activated: user.activated})

    // save refreshToken to database
    await TokenServices.storeRefreshToken(refreshToken, user._id)

    res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    })
    res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    })

    const userDto = new UserDto(user)
    res.json({ user: userDto, auth: true })

    }




   async refresh(req, res) {
    // get refreshToken and verifyRefreshToken
    const refreshTokenFromCookie = req.cookies.refreshToken;
    let userData;

    try{
        userData = await TokenServices.verifyRefreshToken(refreshTokenFromCookie)
    }catch(err){
        return res.status(401).json({message: 'Invalid userData'})
    }
  // if refreshToken in database
  
    try{
        const token = await TokenServices.findRefreshToken(userData.id, refreshTokenFromCookie)
        if(!token){
            return res.status(401).json({message: 'Invalid Token'})
        }
    }catch(err){
        return res.status(500).json({message: 'Internal Error'})
    }
    
    // user check who is logged in to database
    const user = await userServices.findUser({_id: userData.id})
    if(!user){
        return res.status(404).json({message: 'No user in database'})
    }

    // genarate token 
    const {accessToken, refreshToken} = await TokenServices.generateTokens({id: userData.id})
    // UPDATE refresh token IN database

    try{
      await TokenServices.updateRefreshToken(userData.id, refreshToken)
    }catch(err){
        return res.status(500).json({message: 'Internal Error'})
    }

    // set token to browser cookies

    res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    })
    res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    })

    // response 
    const userDto = new UserDto(user)

    res.json({ user: userDto, auth: true })

    }

    async logout(req, res){
        const refreshToken = req.cookies.refreshToken;
        await TokenServices.removeToken(refreshToken)
        res.clearCookie('refreshToken')
        res.clearCookie('accessToken')

        res.status(200).json({user: null, isAuth: false})
    }
}



module.exports = new AuthController();