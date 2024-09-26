import { useState, useEffect } from 'react';
import './Spinner.css';

const Spinner = () => {
  const [rotationDegree, setRotationDegree] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationDegree((rotationDegree + 3) % 360);
    }, 10);
    
    return () => clearInterval(interval);
  }, [rotationDegree]);

  const styledCircle = () => ({
    position: 'relative',
    width: '50px',
    height: '50px',
    border: 'solid 10px grey',
    borderRadius: '50%',
    transform: `rotate3d(0, 0, 1, ${rotationDegree}deg)`,
    margin: '20px',
    left: '30%',
  });

  return (
    <div className="Spinner">
      <header className="header">
        Spinner
      </header>
      <div className='dynamic-rotate-spinner'>
        Dynamic rotate degree spinner
        <div style={styledCircle()}>
          <div className="notch">
          </div>
        </div>
      </div>
      <div className='animated-spinner'>
        Animated keyframes spinner
        <div className="animated-circle">
        </div>
      </div>
    </div>
  );
}

export default Spinner;