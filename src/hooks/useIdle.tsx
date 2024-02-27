import {useState } from 'react';
import {useIdleTimer} from 'react-idle-timer'

interface UseIdleProps{
  onIdle: () => void;
  idleTime: number | undefined;
};

export const useIdle = ({
  //ADD THE onIdle AND idleTime props
  onIdle,
  idleTime=1
}:UseIdleProps) => {
  const [isIdle, setIsIdle] = useState(false);

  const handleOnIdle = (event:any)=> {
    setIsIdle(true);
    console.log("user is idle", event)
    console.log("Last Active", getLastActiveTime())
    onIdle()
  }
  const {getRemainingTime, getLastActiveTime} = useIdleTimer({
    timeout: 1000 * 60 * idleTime,
    onIdle: handleOnIdle,
    debounce: 500
  })

  return {
    getRemainingTime,
    getLastActiveTime,
    isIdle
  }
}
