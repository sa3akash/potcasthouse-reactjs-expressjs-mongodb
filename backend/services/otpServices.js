const crypto = require('crypto');
const { PhoneNumberContext } = require('twilio/lib/rest/lookups/v1/phoneNumber');
const hashServices = require('./hashServices')

const smsSid = process.env.SMS_SID;
const smsToken = process.env.SMS_SID_TOKEN;

const twilio = require('twilio')(smsSid, smsToken, {
    lazyLoading: true,
});


class OtpService {
    async generateOtp(){
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }


    async sendBySms(phone, otp){
        return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your Potcasthouse OTP Code is: ${otp}`
        })
    }


    verifyOtp(hashOtp, data){
        const computedHash = hashServices.hashOtp(data);
        return computedHash === hashOtp;
        // return boliun true or false
    }
}



module.exports = new OtpService();