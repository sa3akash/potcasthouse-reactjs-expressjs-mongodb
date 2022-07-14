import React from 'react'
import styles from "./TextInput.module.css"

const TextInput = (props) => {
  return (
    <div>
        <input {...props} style={{width: props.fullwidth === 'true' ? '100%' : ''}} className={styles.input}/>
    </div>
  )
}

export default TextInput