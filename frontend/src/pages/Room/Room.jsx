
import styles from './Room.module.css'
import {useWebRTC} from "../../hooks/useWebRTC"
import {useParams} from 'react-router-dom'
import {useSelector} from "react-redux"

const Room = () => {
  const {id: roomId} = useParams()
  const {user} = useSelector(state=> state.authSlice)

  const {clients,providerRef} = useWebRTC(roomId, user);

  return (
    <div className='container'>
      <h2>All voice rooms</h2>
      {
        clients.map((client) => {
          return (
            <div key={client.id}>
              <audio 
              src="" 
              controls 
              autoPlay 
              ref={(instance) => providerRef(instance, client.id)}
                ></audio>
              <h4>{client.name}</h4>
            </div>
          )
        })
      }
    </div>
  )
}

export default Room