import { useCallback, useEffect, useRef, useState } from "react";


export function useStateWithCallback(initialState){
    const [state, setState] = useState(initialState)

    const cbUseRef = useRef()
    const updateState = useCallback((newState, cb) =>{
        cbUseRef.current = cb;

        setState((prev)=>{
            return typeof newState === "function" ? newState(prev) : newState;
        })
    },[])///useCallback dependency 

    useEffect(()=>{
        if(cbUseRef.current){
            cbUseRef.current(state);
            cbUseRef.current = null;
        }
        
    },[state])

    return [state, updateState]
}