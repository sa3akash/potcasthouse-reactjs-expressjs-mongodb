import React, { useEffect, useState } from 'react'
import AddRoomModle from '../../components/AddRoomModle/AddRoomModle'
import RoomCard from '../../components/RoomCard/RoomCard'
import styles from './RoomsPage.module.css'
import { getAllRooms } from '../../http'



// const rooms = [
//   {
//       id: 1,
//       topic: 'Which framework best for frontend ?',
//       totalPeople: 40,
//       speakers: [
//           {
//               id: 1,
//               name: 'Jonathan Wolfe',
//               avater: '/images/monky.png'
//           },
//           {
//               id: 2,
//               name: 'Anushka Sharma',
//               avater: '/images/monky.png'
//           }
//       ]
//   },
//   {
//       id: 2,
//       topic: 'What’s new in machine learning',
//       totalPeople: 60,
//       speakers: [
//           {
//               id: 1,
//               name: 'John Doe',
//               avater: '/images/monky.png'
//           },
//           {
//               id: 2,
//               name: 'Anushka Sharma',
//               avater: '/images/monky.png'
//           }
//       ]
//   },
//   {
//       id: 3,
//       topic: 'Why people use stack overflow',
//       totalPeople: 20,
//       speakers: [
//           {
//               id: 1,
//               name: 'Virat Kohli',
//               avater: '/images/monky.png'
//           },
//           {
//               id: 2,
//               name: 'Shawn  Dell',
//               avater: '/images/monky.png'
//           }
//       ]
//   },
//   {
//       id: 4,
//       topic: 'What’s new in machine learning',
//       totalPeople: 80,
//       speakers: [
//           {
//               id: 1,
//               name: 'Virat Kohli',
//               avater: '/images/monky.png'
//           },
//           {
//               id: 2,
//               name: 'Anushka Sharma',
//               avater: '/images/monky.png'
//           }
//       ]
//   },
// ]



const RoomsPage = () => {
    const [rooms, setRooms] = useState([])
    const [openModel, setOpenModel] = useState(false)
    const [searchTopic, setSearchTopic] = useState('')

   useEffect(()=>{
        const fetchRooms = async () => {
            const {data} = await getAllRooms()
            setRooms(data);
        }
   fetchRooms()
   },[])


  return (
    <>
    <div className='container'>
      <div className={styles.roomsHeader}>
          <div className={styles.roomsHeaderLeft}>
            <span className={styles.roomsHeaderLeftHeading}>All voice rooms</span>
            <div className={styles.roomsHeaderSearchBox}>
              <img src="/images/search.png" alt="Search" />
              <input type="text" className={styles.roomsHeaderSearchBoxInput} placeholder='Search topic:)' onChange={(e)=>setSearchTopic(e.target.value)} value={searchTopic}/>
            </div>
          </div>
          <div className={styles.roomsHeaderRight}>
            <button className={styles.roomsHeaderRightButton} onClick={()=> setOpenModel(true)}>
              <img src="/images/room.png" alt="rooms" />
              <span className={styles.roomsHeaderRightButtonText}>Start a room</span>
            </button>
          </div>
      </div>

      <div className={styles.roomsLists}>
        {
          rooms?.map((room,i)=> <RoomCard room={room} key={i}/>)
        }
      </div>
    </div>
    {openModel && <AddRoomModle setOpenModel={setOpenModel}/>}
    </>
  )
}

export default RoomsPage


// 17 00 00