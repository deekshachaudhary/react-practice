import { useState, useEffect } from 'react';
import './DigitalClock.css';
import classNames from 'classnames';

const allClasses = ['top', 'top-left', 'middle', 'top-right', 'bottom-left', 'bottom', 'bottom-right'];

const valueToClasses = {
  0: ['top', 'top-left', 'bottom-left', 'bottom', 'bottom-right', 'top-right'],
  1: ['top-right', 'bottom-right'],
  2: ['top', 'top-right', 'middle', 'bottom-left', 'bottom'],
  3: ['top', 'top-right', 'middle', 'bottom-right', 'bottom'],
  4: ['top-left', 'middle', 'top-right', 'bottom-right'],
  5: ['top', 'top-left', 'middle', 'bottom-right', 'bottom'],
  6: ['top', 'top-left', 'bottom-left', 'bottom', 'bottom-right', 'middle'],
  7: ['top', 'top-right', 'bottom-right'],
  8: ['top', 'top-left', 'middle', 'top-right', 'bottom-left', 'bottom', 'bottom-right'],
  9: ['middle', 'top-left', 'top', 'top-right', 'bottom-right', 'bottom'],
}

const DigitalClock = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
  
      setHours(date.getHours().toString().padStart(2, 0));
      setMinutes(date.getMinutes().toString().padStart(2, 0));
      setSeconds(date.getSeconds().toString().padStart(2, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hours, minutes, seconds]);

  const renderSegments = val => {
    return (
      <div className="segments">
        {allClasses.map((c, i) => (
          <div
            key={i}
            className={
              classNames(
                c,
                { 'no-display': valueToClasses[val]?.findIndex(v => v === c) === -1
                }
              )
            }
            >
            </div>
        ))}
      </div>
    );
  }

  return (
    <div className="digital-clock">
      <div className="hours">
        {renderSegments(hours[0])}
        {renderSegments(hours[1])}
      </div>
      <span>:</span>
      <div className="minutes">
        {renderSegments(minutes[0])}
        {renderSegments(minutes[1])}
      </div>
      <span>:</span>
      <div className="seconds">
        {renderSegments(seconds[0])}
        {renderSegments(seconds[1])}
      </div>
    </div>
  );
}

export default DigitalClock;