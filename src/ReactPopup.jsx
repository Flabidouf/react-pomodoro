import { useState, useEffect } from "react";
import 'reactjs-popup/dist/index.css';

const ReactPopup = ({onPopupTimeUpdate, startBreakTimer}) => {
    const [popUpTimeRemaining, setPopUpTimeRemaining] = useState(5 * 60);
    const [timerStatus, setTimerStatus] = useState(false);

   // Create a timer that decrement by 1 each 1000ms
    useEffect(() => {
        let intervalId;
    
        if (timerStatus) {

          intervalId = setInterval(() => {
           
            setPopUpTimeRemaining((prevTime) => {
              const updatedTime = prevTime - 1;
              if (updatedTime === 0) {
                setTimerStatus(false);
                clearInterval(intervalId);         
              }
              return updatedTime;
            }) 
          }, 1000);
        }
        return () => clearInterval(intervalId);
      }, [timerStatus]);

      // To format the minutes in seconds.
    const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, `0`)}: ${seconds.toString().padStart(2, `0`)}`;
  }; 

useEffect(() => {
  setTimerStatus(true)
},[]);

useEffect(() => {
  if (startBreakTimer) {
    setTimerStatus(true); // Start the break timer when startBreakTimer is true
  }
}, [startBreakTimer]);

useEffect(() => {
  onPopupTimeUpdate(popUpTimeRemaining); // Send the updated popUpTimeRemaining to Timer.jsx
}, [popUpTimeRemaining, onPopupTimeUpdate]);


  return(
    <div className="breakTimeDiv">
      Break Time : {formatTime(popUpTimeRemaining)}
    </div>
  )
}

export default ReactPopup;