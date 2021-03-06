import React, { FunctionComponent, useState, useRef } from 'react';
import './timerStyle.scss';

interface RefObject<T> {
  current: T | null;
}

const Timer: FunctionComponent = () => {
  const [timer, setTimer] = useState(false);
  const paused: RefObject<boolean> = useRef(false);
  const [origTime, setOrigTime] = useState();
  const [tapToRestart, setTapToRestart] = useState(false);
  const startOrResumeTimer = (wasPaused: boolean = false) => {
    setTimer(true);
    let prevPausedTime: number|undefined = 0;
    if (wasPaused) {
      paused.current = false;
      prevPausedTime = origTime;
    }
    const T: number = Date.now() / 1000;
    const interval: number | undefined = setInterval(() => {
      const elapsedTime: string = (
        Date.now() / 1000 -
        T +
        prevPausedTime
      ).toFixed(1);
      setOrigTime(Number(elapsedTime));
      if (elapsedTime >= 5.0 || paused.current) {
        setTimer(false);
        if (!paused.current) {
          setOrigTime(false);
          setTapToRestart(true);
        }
        clearInterval(interval);
      }
    }, 100);
  };
  const pauseTimer = () => {
    paused.current = true;
  };
  const resetTimer = () => {
    setTapToRestart(false);
    paused.current = false;
  };
  const toggleTimerStates = () => {
    if (tapToRestart) return resetTimer();
    if (timer && !paused.current) {
      return pauseTimer();
    }
    if (!timer && paused.current) return startOrResumeTimer(true);
    return startOrResumeTimer();
  };
  return (
    <div className="timerContainer" onClick={toggleTimerStates}>
      <svg height="310" width="310">
        <circle
          className={`circle ${
            tapToRestart === false ? '' : 'animateCircle'
          } ${paused.current && 'pauseAnimateCircle'} ${(timer ||
            paused.current) &&
            'animateCircle'}`}
          cx="150"
          cy="150"
          r="150"
          stroke="#0000"
          strokeWidth="10"
          fillOpacity="0"
        />
      </svg>
      <div className="timer pulse">
        {!timer && !paused.current && !tapToRestart && 'Tap to Start'}
        {tapToRestart && (
          <div>
            5.0 <br /> tap to restart
          </div>
        )}
        {(timer !== false || paused.current) && origTime}
      </div>
    </div>
  );
};

export default Timer;
