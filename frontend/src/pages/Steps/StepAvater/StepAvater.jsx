import React from 'react'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import styles from "./StepAvater.module.css"
import {useSelector, useDispatch} from "react-redux"
import { useState } from 'react'
import {setAvater} from "../../../store/activateSlice"
import { activate } from '../../../http'
import {setAuth} from "../../../store/authSlice"
import Loader from '../../../components/Loader/Loader'

const StepAvater = () => {
  const [loading, setLoading] = useState(false)
  const {name, avater}= useSelector(state=> state.activateSlice)
  const [image, setImage]= useState('./images/monky.png')
  const dispatch = useDispatch()
 
  function photoChange(e){
    const file = e.target.files[0]
    // photo reader
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
      dispatch(setAvater(reader.result))
    }
  }

 async function submit(){
  if(!avater || !name) return;
  setLoading(true)
    try{
    const {data} = await activate({name, avater})
    if(data.auth){
       dispatch(setAuth(data))
    }
    }catch(err){
      console.log(err.message)
    }finally{
      setLoading(false)
    }
  }

  if(loading) return <Loader message='Activation in progress ...' />
  return (
    <div className={styles.cardWrapper}>
    <Card title={`Okay, ${name}!`} icon='profile-imoji' styles={{margin:"0"}}>
    <p className={styles.subHeading}>How’s this photo?</p>
    <div className={styles.avaterWrapper}>
        <img src={image} alt="avater" />
    </div>
    <div>
      <input type="file" name="" id="avaterID" style={{display: 'none'}} onChange={photoChange}/>
      <label htmlFor='avaterID' className={styles.avaterLink}>Choose a different photo</label>
    </div>
      <div className={styles.buttonWrapper}>
        <Button onClick={submit} text='Submit'/>
      </div>
    </Card>
  </div>
  )
}

export default StepAvater