import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {useDispatch} from "react-redux"
import { setAuth } from '../store/authSlice'

export function useLoadingWidthRefresh(){
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(()=>{
        (async()=>{
            try{
                const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {withCredentials: true})

                dispatch(setAuth(data));
                setLoading(false);
            }catch(error){
                console.log(error.message);
                setLoading(false);
            }
        })();
    },[dispatch])

  return {loading}
}