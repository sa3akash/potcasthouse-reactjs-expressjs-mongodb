import React from 'react'
import {Link} from "react-router-dom"
import { logout } from '../../http'
import styles from "./Navbar.module.css"
import {useDispatch, useSelector} from 'react-redux'
import {setAuth} from '../../store/authSlice'

const Navbar = () => {

  const dispatch = useDispatch()
  const {isAuth, user} = useSelector(state=> state.authSlice)
 async function LogoutUser(){
  try{
  const {data} = await logout()
  dispatch(setAuth(data))

  }catch(err){
    console.log(err)
  }
  }
  return (
    <nav className={`${styles.navbar} container`}>
      <Link to='/' className={styles.navlink}>
        <img src="/images/logo.png" alt="logo"/>
        <span className={styles.marginLeft}>Potcasthouse</span>
      </Link>
      {isAuth && 
      
      <div className={styles.navRight}>
        <h3 className={styles.navRightTitle}>{user.name}</h3>
        <Link to='/' className={styles.navRightimgContainer} title='Profile'>
          <img src={user.avater ? user.avater : '/images/monky.png'} alt="avater" className={styles.navRightimg}/>
        </Link>
        <button title='Logout' onClick={LogoutUser} className={styles.navRightButton}><img src="/images/logout.png" alt="logoutImg" /></button>
      </div>}
      
    
      
    </nav>
  )
}

export default Navbar