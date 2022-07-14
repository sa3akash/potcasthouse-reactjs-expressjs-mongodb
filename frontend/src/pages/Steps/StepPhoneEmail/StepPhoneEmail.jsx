import React from 'react'
import { useState } from 'react'
import Phone from "./Phone/Phone"
import Email from "./Email/Email"
import styles from "./StepPhoneEmail.module.css"

const PhoneEmailMap = {
  phone: Phone,
  email: Email
}

const StepPhoneEmail = ({onNext}) => {
  const [type, setType] = useState('phone')
  const Component = PhoneEmailMap[type];

  return (
    <div className={styles.cardWrapper}>
     <div>
      <div className={styles.buttonWrapper}>
            <button className={`${styles.toggleButton} ${type === 'phone' ? styles.active : ''}`} onClick={()=> setType("phone")}>
              <img src="/images/phone-0.png" alt="phone" />
            </button>
            <button className={`${styles.toggleButton} ${type === 'email' ? styles.active : ''}`} onClick={()=> setType("email")}>
            <img src="/images/email-0.png" alt="phone" />
            </button>
          </div>
        <Component onNext={onNext} />
    </div>
  </div>
  )
}

export default StepPhoneEmail