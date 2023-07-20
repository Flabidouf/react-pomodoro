import { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ReactPopup from "./ReactPopup";
import alertTimer from "./assets/cow_sound.wav"




const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [timerStatus, setTimerStatus] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [popUpTimeRemaining, setPopUpTimeRemaining] = useState(5 * 60);
  // See it as ... = useState(initialValue = ...)

  useEffect(() => {
    let intervalId;

    if (timerStatus && timeRemaining > 0) {
      // Si pas d'était précisé -> = à true, pas besoin de le préciser, standard.
      // > 0 pour que cela ne descende pas en dessous de 0.
      intervalId = setInterval(() => {
        // setInterval is called with a callback function that decrements the timeRemaining state by 1 every second.
        // The setInterval function returns a unique identifier, which is stored in the intervalId variable.
        setTimeRemaining((prevTime) => {
          const updatedTime = prevTime - 1;
          if (updatedTime === 0) {
            setTimerStatus(false);
            clearInterval(intervalId);
            setShowPopup(true);
            setTimerExpired(true);
          }
          return updatedTime;
        }) 
      }, 1000);
    }

    /* The timer logic in this example uses seconds as the unit of measurement.
    The initial value of timeRemaining is set to 25 minutes converted to seconds (25 * 60).
    The interval is set up using setInterval, which runs a function every second.
    Inside the interval function, setTimeRemaining(prevTime => prevTime - 1) is called, which decreases the timeRemaining by 1.
    By calling setTimeRemaining within the interval, the Timer component's state is updated, causing a re-render.
    As a result, the display of the remaining time ({timeRemaining}) in the JSX updates every second.*/

    return () => clearInterval(intervalId);
  }, [timerStatus, timeRemaining]);

  useEffect(() => {
    if(showPopup) {
      setTimerStatus(false);
    }
  }, []);

// Display timer in tab + breaktime
  useEffect(() => {
    const title = showPopup ? `${formatTime(popUpTimeRemaining)}` : `${formatTime(timeRemaining)}`;
    document.title = title;
  }, [timeRemaining, showPopup, popUpTimeRemaining]);

  const handlePopupTimeUpdate = (time) => {
    setPopUpTimeRemaining(time);
    setShowPopup(true); // Show the popup
    setTimerStatus(false); // Pause the main timer
  };


  // Add an audio when timer reaches 0
  const audio = new Audio(alertTimer);
  useEffect(() => {
    if(timerExpired) {
      audio.play();
    }
  }, [timerExpired]);

// Toggle between play and pause. Linked to the return 
  const toggleTimer = () => {
    if (timerStatus) {
      setTimerStatus(false);
    } else {
      setTimerStatus(true);
    }
  };
  // If (timerStatus) is true, which is by default, setTimerStatus to false.
  // If (timerStatus) is not true, as in false, setTimerStatus to true.

  const incOrDecDuration = (increase) => {
    if (!timerStatus) {
      // !timerStatus = timerStatus inversé, dans le contexte, si timerStatus est false, le code est exécuté.
      increase ? setTimeRemaining((prevTime) => prevTime + 60) : setTimeRemaining((prevTime) => prevTime - 60);
      // Ternary operator.
    }
  };
  /* Inside the if block, there is a ternary operator increase ? ... : ... that checks the value of the increase parameter.
  If increase is true, the setTimeRemaining function is called with a callback that increases the prevTime (previous time) by 60 seconds.
  If increase is false, the setTimeRemaining function is called with a callback that decreases the prevTime by 60 seconds.
  The prevTime represents the previous value of the timeRemaining state.*/


  const resetTimer = () => {
    setTimeRemaining(25 * 60);
    setTimerStatus(false);
  };


  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, `0`)}: ${seconds.toString().padStart(2, `0`)}`;
  };

   const handleClosePopup = () => {
    setShowPopup(false);
  }; 

  

  return (
    <div className="timerDiv">
      <div className="remainingTime">
        <h1>Pomodoro Timer</h1>
        <h2 className="h-title"> Time Remaining :</h2>
        <h2 className="h-title"> {formatTime(timeRemaining)} </h2>
      </div>
       {showPopup && (
        <Popup open={true} closeOnDocumentClick={false}>
          <div className="popUp-div">
            <h3>You did just great</h3>
            <h2> Now take a break !</h2>
            <ReactPopup onPopupTimeUpdate={handlePopupTimeUpdate} />
            <div className="break-btns">
              <button className="start-btn" onClick={() => {
                handleClosePopup()
                resetTimer()
                setTimerStatus(true)
                }}>Start again</button>
                {/* Mettre une fonction dans des brackets comme en dessous */}
              <button className="close-btn" onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        </Popup>
      )} 
      <div className="div-btn">
        <div>
          <button className="btn" onClick={toggleTimer}>{timerStatus ? "Pause" : "Play"}</button>
          <button className="btn" onClick={resetTimer}>Reset</button>
        </div>
        <div>
          <button className="btn" onClick={() => incOrDecDuration(true) }>+</button>
          <button className="btn" onClick={() => incOrDecDuration(false) }>-</button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
