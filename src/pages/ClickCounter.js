import { useState, useEffect } from 'react';
import './ClickCounter.css';

const ClickCounter = () => {
  const [numClicks, setNumClicks] = useState(0);

  useEffect(() => {
    const handleClick = () => setNumClicks(numClicks => numClicks + 1);

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  return (
    <div className='ClickCounter'>
      <header className='header'>Click Counter</header>
      <button>Increase click count</button>
      {numClicks} clicks
    </div>
  )
}

export default ClickCounter;

