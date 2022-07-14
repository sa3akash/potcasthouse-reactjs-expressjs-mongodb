import React from 'react'
import styles from './RoomCard.module.css'
import {useNavigate} from "react-router-dom"


const RoomCard = ({room}) => {
  const navigate = useNavigate()

  return (
    <div className={styles.card} onClick={()=> navigate(`/room/${room._id}`)}>
      <h3 className={styles.topic}>{room.topic}</h3>
      <div className={`${styles.speakerWrapper} ${room.speakers.length === 1 ? styles.singleSpeaker : ''}`}>
        <div className={styles.speakerLeftAvater}>
            {room.speakers.map((speaker,i) =>(
                <img src={speaker.avater} alt="speaker-avater" key={i}/>
            ))}
        </div>
        <div className={styles.speakerRightName}>
            {room.speakers.map((names,i) =>(
                <div className={styles.nameWrapper} key={i}>
                     <span>{names.name}</span>
                     <img src="/images/chat.png" alt="chat" />
                </div>
            ))}
        </div>
      </div>
      <div className={styles.peopleCount}>
        <span>{room.speakers.length}</span>
        <img src="/images/people.png" alt="people" />
      </div>
    </div>
  )
}

export default RoomCard