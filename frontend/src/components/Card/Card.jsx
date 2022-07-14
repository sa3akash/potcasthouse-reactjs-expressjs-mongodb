import React from 'react'
import styles from "./Card.module.css";

const Card = ({title, icon, children}) => {
  return (
    <div className={styles.card}>
       {
        title && icon &&  
        <div className={styles.cardWrapper}>
          <img src={`/images/${icon}.png`} alt={icon} />
          <h1 className={styles.cardHeadding}>{title}</h1>
        </div>
       }
        {children && children}
      </div>
  )
}

export default Card