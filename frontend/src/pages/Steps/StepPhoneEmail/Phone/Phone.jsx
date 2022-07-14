import React, { useState } from 'react'
import Button from '../../../../components/Button/Button'
import Card from '../../../../components/Card/Card'
import TextInput from '../../../../components/TextInput/TextInput'
import styles from "../StepPhoneEmail.module.css"
import {sendOtp} from '../../../../http'
import {useDispatch} from "react-redux"
import { setOtp } from '../../../../store/authSlice'


const Phone = ({onNext}) => {
  const [phoneNumber, setPhoneNumber] = useState('')

  const dispatch = useDispatch()

  const submitNumber = async ()=> {
    if(!phoneNumber) return;
    // server request
    const {data} = await sendOtp({phone: phoneNumber})

    dispatch(setOtp({phone: data.phone, hash: data.hash}))
    console.log(data);

    onNext()
  }
  return (
    <div>
    <Card title='Enter you phone number' icon='phone'>
      <TextInput type='text' placeholder='+880 1812-068629' onChange={(e)=> setPhoneNumber(e.target.value)} value={phoneNumber}/>
      <div className={styles.buttonWrapper}>
        <Button onClick={submitNumber} text='Next'/>
      </div>
      <p className={styles.cardParagarph}>
      By entering your number or email, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
      </p>
    </Card>
  </div>
  )
}

export default Phone