const jwt = require('jsonwebtoken');
const RefreshTokenModel = require('../models/refreshModel')


class TokenService{
    generateTokens(payload){
      const accessToken =  jwt.sign(payload, process.env.JWI_ACCESS_TOKEN_SECRET,{
        expiresIn: '1m'
      })
      const refreshToken =  jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET,{
        expiresIn: '1y'
      })
      return {accessToken, refreshToken};
    }
  async storeRefreshToken(token, userId){
    try{
     await RefreshTokenModel.create({
      token: token,
      userId: userId
     })
    }catch(err){
      console.log(err.message)
    }
   }

  async verifyAccessToken(accessToken){
      return jwt.verify(accessToken, process.env.JWI_ACCESS_TOKEN_SECRET)
   }

  async verifyRefreshToken(refreshToken){
      return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
   }


  async findRefreshToken(userId, refreshToken){
      return await RefreshTokenModel.findOne({userId: userId, token: refreshToken})
   }


   async updateRefreshToken(userId, refreshToken){
    return await RefreshTokenModel.updateOne({userId: userId}, {token: refreshToken})

   }
   async removeToken(refreshToken){
    return await RefreshTokenModel.deleteOne({token: refreshToken})
   }

}




module.exports = new TokenService();