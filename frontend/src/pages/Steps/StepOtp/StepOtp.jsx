import React from 'react'
import { useState } from 'react'
import Button from '../../../components/Button/Button'
import Card from "../../../components/Card/Card"
import TextInput from "../../../components/TextInput/TextInput"
import { verifyOtp } from '../../../http'
import { useSelector } from 'react-redux'
import { setAuth } from '../../../store/authSlice'
import { useDispatch } from 'react-redux'
import styles from "./StepOtp.module.css"

const StepOtp = () => {
  const [otp, setOtp] = useState('')
  const dispatch = useDispatch()
  const {phone, hash} = useSelector((state)=> state.authSlice.otp)

  const onNextSubmit = async () => {
    if(!otp) return;
    
    try{
   const {data} = await verifyOtp({otp, phone, hash})
   dispatch(setAuth(data))
    }catch (error){
      console.log(error.response.data.message);
    }
  }
  return (
    <div className={styles.otp}>
      <Card title='Enter the code we just texted you' icon='lock-imoji'>
      <TextInput type='text' placeholder='7777' onChange={(e)=> setOtp(e.target.value)} value={otp}/>
      <div className={styles.buttonWrapper}>
        <Button onClick={onNextSubmit} text='Next'/>
      </div>
      <p className={styles.cardParagarph}>
      By entering your number or email, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
      </p>
    </Card>
    </div>
  )
}

export default StepOtp