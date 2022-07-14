const crypto = require('crypto')

class HashService {
    hashOtp(data){
     const hashData =  crypto.createHmac('sha256', process.env.HASH_SECRET).update(data).digest('hex');
     return hashData;
    }


}



module.exports = new HashService();