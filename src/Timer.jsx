import { useState, useEffect } from "react";

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [timerStatus, setTimerStatus] = useState("stopped");
  const [timerDuration, setTimerDuration] = useState(25);

  useEffect(() => {
    let intervalId;

    if (timerStatus === "running") {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    /* The timer logic in this example uses seconds as the unit of measurement.
The initial value of timeRemaining is set to 25 minutes converted to seconds (25 * 60).
The interval is set up using setInterval, which runs a function every second.
Inside the interval function, setTimeRemaining(prevTime => prevTime - 1) is called, which decreases the timeRemaining by 1.
By calling setTimeRemaining within the interval, the Timer component's state is updated, causing a re-render.
As a result, the display of the remaining time ({timeRemaining}) in the JSX updates every second.*/

    return () => clearInterval(intervalId);
  }, [timerStatus]);

  const toggleTimer = () => {
    if (timerStatus === "running") {
      setTimerStatus("paused");
    } else {
      setTimerStatus("running");
    }
  };

  const increaseDuration = () => {
    setTimerDuration((prevDuration) => prevDuration + 1);
    setTimeRemaining((timeRemaining + 1) * 60);
    resetTimer();
  };

  const decreaseDuration = () => {
    if (timerDuration > 1) {
      setTimerDuration((prevDuration) => prevDuration - 1);
      setTimeRemaining((timeRemaining - 1) * 60);
      resetTimer();
    }
  };

  const resetTimer = () => {
    setTimeRemaining(25 * 60);
    setTimerStatus("stopped");
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, `0`)}: ${seconds
      .toString()
      .padStart(2, `0`)}`;
  };

  return (
    <div>
      <div>Time Remaining : {formatTime(timeRemaining)}</div>
      <button onClick={toggleTimer}>
        {timerStatus === "running" ? "Pause" : "Play"}
      </button>
      <button onClick={resetTimer}>Reset</button>
      <button onClick={increaseDuration}>+</button>
      <button onClick={decreaseDuration}>-</button>
      <div>Timer Duration: {timerDuration}</div>
    </div>
  );
};

export default Timer;
