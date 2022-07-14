import React, {useState} from 'react'
import Button from '../../../../components/Button/Button'
import Card from '../../../../components/Card/Card'
import TextInput from '../../../../components/TextInput/TextInput'
import styles from "../StepPhoneEmail.module.css"

const Email = ({onNext}) => {
  const [email, setEmail] = useState('')

  return (
    <div>
    <Card title='Enter your email id' icon='email'>
    <TextInput type='email' placeholder='sa3shakil@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <div className={styles.buttonWrapper}>
      <Button onClick={onNext} text='Next'/>
      </div>
      <p className={styles.cardParagarph}>
      By entering your number or email, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
      </p>
    </Card>
  </div>
  )
}

export default Email