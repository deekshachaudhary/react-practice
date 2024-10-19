// Drum Machine: https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-drum-machine
import { useEffect, useState } from 'react';
import './DrumMachine.css';

const drumPadsData = [
  { key: 'Q', name: 'Heater 1', src: '/assets/Heater-1.mp3' },
  { key: 'W', name: 'Heater 2', src: '/assets/Heater-2.mp3' },
  { key: 'E', name: 'Heater 3', src: '/assets/Heater-3.mp3' },
  { key: 'A', name: 'Heater 4', src: '/assets/Heater-4.mp3' },
  { key: 'S', name: 'Clap', src: '/assets/Clap.mp3' },
  { key: 'D', name: 'Open HH', src: '/assets/Open-HH.mp3' },
  { key: 'Z', name: 'Kick & Hat', src: '/assets/Kick_n_Hat.mp3' },
  { key: 'X', name: 'Kick', src: '/assets/Kick.mp3' },
  { key: 'C', name: 'Closed HH', src: '/assets/Closed-HH.mp3' },
];

const DrumMachine = () => {
  const [currentAudioName, setCurrentAudioName] = useState(null);

  useEffect(() => {
    const onKeyDown = e => {
      if (drumPadsData.map(obj => obj.key).includes(e.key.toUpperCase())) {
        const matchingAudioClip = drumPadsData.find(obj => obj.key === e.key.toUpperCase());
        playAudio(matchingAudioClip.src);
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const playAudio = src => {
    const audio = new Audio(src);
    audio.play();

    setCurrentAudioName(drumPadsData.find(obj => obj.src === src).name);
  }

  return (
    <>
      <div className="drum-machine">
        <h3 className="drum-machine__header">
          Drum Machine
        </h3>
        <div className="drum-machine__body">
          <div className="drum-pads">
            {drumPadsData.map((obj, i) => (
              <button key={i} className="drum-pad" onClick={() => playAudio(obj.src)}>
                <audio src={obj.src} className="audio-clip" id={obj.key}></audio>
                {obj.key}
              </button>
            ))}
          </div>
          <div className="current-audio-clip-name">
            {currentAudioName}
          </div>
        </div>
      </div>
    </>
  );
}

export default DrumMachine;