import React,{useRef} from 'react'
import IdleTimer from 'react-idle-timer';

export default function IdleTimeCotainer() {
    const idleTimerRef = useRef(null);
    const onIdleFun = () => {
        alert("Session Idle");
    }
  return (
    <div>
        <IdleTimer
            ref={idleTimerRef}
            timeout={5*1000}
            onIdle={onIdleFun}
        ></IdleTimer>
    </div>
  )
}
