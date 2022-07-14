import React from 'react'
import { useState } from 'react'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import TextInput from '../../../components/TextInput/TextInput'
import styles from "./StepName.module.css"
import {useDispatch, useSelector} from "react-redux"
import {setName} from "../../../store/activateSlice"

const StepName = ({onNext}) => {
  const {name} = useSelector(state => state.activateSlice)
  const [fullName, setFullName]= useState(name)
  const dispatch= useDispatch()

  const submitName = ()=>{
    if(!fullName) return;
    dispatch(setName(fullName))
    onNext()
  }
  return (
    <div className={styles.cardWrapper}>
    <Card title='What’s your full name?' icon='smile-imoji-2'>
      <TextInput type='text' required placeholder='Your name' onChange={(e)=> setFullName(e.target.value)} value={fullName}/>
      <p className={styles.cardParagarph}>People use real names at <br/> codershouse :)</p>
      <div className={styles.buttonWrapper}>
        <Button onClick={submitName} text='Next'/>
      </div>
    </Card>
  </div>
  )
}

export default StepName