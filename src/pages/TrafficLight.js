import { useEffect, useState } from 'react';
import './TrafficLight.css';
import classNames from 'classnames';

const config = {
  red: { duration: 4000, nextLight: 'green' },
  yellow: { duration: 1000, nextLight: 'red' },
  green: { duration: 3000, nextLight: 'yellow' },
};

const TrafficLight = () => {
  const [activeLight, setActiveLight] = useState('green');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setActiveLight(config[activeLight].nextLight);
    }, config[activeLight].duration);

    return () => clearTimeout(timerId);
  }, [activeLight]);

  return (
    <div className="traffic-light">
      <header>Traffic Light</header>
      <div className="body">
        <div className={classNames('red', { 'active': activeLight === 'red' })}></div>
        <div className={classNames('yellow', { 'active': activeLight === 'yellow' })}></div>
        <div className={classNames('green', { 'active': activeLight === 'green' })}></div>
      </div>
    </div>
  );
}

export default TrafficLight;
