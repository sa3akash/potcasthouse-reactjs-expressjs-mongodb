
import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import {socketInit} from "../socket"
import { ACTIONS } from "../actions";
import freeice from 'freeice'


export function useWebRTC(roomId, user){
    const [clients, setClients] = useStateWithCallback([]) // callback works for new function

    const audioElements = useRef({})
    const connections = useRef({})
    const localMediaStream = useRef(null)
    const socketRef = useRef(null)

    useEffect(() => {
      socketRef.current = socketInit()
    },[])

    // add new client
    const addNewClient = useCallback((newClient, cb)=>{
      const lookingFor = clients.find(client => client.id === newClient.id)
      if(lookingFor === undefined){
        setClients((exiestingClient)=>[...exiestingClient, newClient], cb)
      }
    },[clients, setClients])

   
/// capture audio from mobile or desktop

  useEffect(()=>{
    const startCapture = async ()=>{
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    }
    startCapture().then(()=>{
      addNewClient(user, ()=>{
        const localEliments = audioElements.current[user.id];
        if(localEliments){
          localEliments.volume = 0;
          localEliments.srcObject = localMediaStream.current
        }

        // socket emit this app
        socketRef.current.emit(ACTIONS.JOIN, {roomId, user});
        
      })
    });
  },[])




  useEffect(()=>{

    const handlePeer = async ({peerId, createOffer, user: remoteUser}) => {
        // if already connected then give warning
        if(peerId in connections.current){
              return console.warn(`Your are already connected with ${peerId} (${user.name})`);
        }
        connections.current[peerId] = new RTCPeerConnection({
          iceServers: freeice()
        })
        // handle new ice candidates
        connections.current[peerId].onicecandidate = (event)=>{
          socketRef.current.emit(ACTIONS.RELAY_ICE, {
            peerId,
            icecandidate: event.candidate
          })
        }
        // handle on track on this connections
        connections.current[peerId].ontrack = ({ streams: [remoteStream] }) =>{
          addNewClient(remoteUser, ()=>{
            if(audioElements.current[remoteUser.id]){
              audioElements.current[remoteUser.id].srcObject = remoteStream;
            }else{
              let settled = false;
              const interval = setInterval(()=>{
                if(audioElements.current[remoteUser.id]){
                  audioElements.current[remoteUser.id].srcObject = remoteStream;
                  settled = true;
                }
                if(settled){
                  clearInterval(interval);
                }
              },1000)
            }
          })
        }

        // all local track add connetions  
        localMediaStream.current.getTracks().forEach(track =>{
          connections.current[peerId].addTrack(track, localMediaStream.current)
        })

        /// createOffer for other clients
        if(createOffer) {
          const offer = await connections.current[peerId].createOffer()

          // send offer to anader clients
          socketRef.current.emit(ACTIONS.RELAY_SDP, {
            peerId,
            sessionDiscription : offer
          })

        }
    }

    socketRef.current.on(ACTIONS.ADD_PEER, handlePeer)

    return ()=>{
      socketRef.current.off(ACTIONS.ADD_PEER)
    }
  },[])

// handle icecandidate
  useEffect(()=>{
    socketRef.current.on(ACTIONS.RELAY_ICE, ({peerId, icecandidate})=>{
      if(icecandidate){
        connections.current[peerId].addIceCandidate(icecandidate);
      }
      return ()=>{
        socketRef.current.off(ACTIONS.RELAY_ICE)
      }
    })
  },[])

  // handle sdp 
  useEffect(()=>{
    socketRef.current.on(ACTIONS.RELAY_SDP, async ({peerId, sessionDiscription: remoteSessionDsc})=>{
      connections.current[peerId].remoteSessionDsc(
        new RTCSessionDescription(remoteSessionDsc)

      )
      // sessionDiscription type is offer then create an answer
      if(remoteSessionDsc.type === 'offer'){
          const connection = connections.current[peerId]
          const answer = connection.createAnswer()
          connection.setLocatDescription(answer)

          socketRef.current.emit(ACTIONS.RELAY_SDP, {
            peerId,
            remoteSessionDsc: answer
          })
      }

    })
  },[])

  function  providerRef(instance, userId){
    audioElements.current[userId] = instance;
  }


  return {clients, providerRef};

}