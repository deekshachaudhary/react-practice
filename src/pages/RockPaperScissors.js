import { useState, useEffect } from 'react';
import './RockPaperScissors.css';

// Parts:
// 1. Generate computer choice
// 2. Give user the option to make a choice
// 3. Implement winning criteria
const options = ['Rock', 'Paper', 'Scissors'];
const winningChoice = {
  'Rock': 'Paper',
  'Paper': 'Scissors',
  'Scissors': 'Rock',
};

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(null);
  const [winningMsg, setWinningMsg] = useState('');
  const [msgVisible, setMsgVisible] = useState(false);

  useEffect(() => {
    if (userChoice && computerChoice) {
      if (userChoice !== computerChoice) {
        if (userWon()) {
          setUserScore(val => val + 1);
          setWinner('User');
          setWinningMsg('User wins this round!');
        } else {
          setComputerScore(val => val + 1);
          setWinner('Computer');
          setWinningMsg('Computer wins this round!');
        }
      } else {
        setWinningMsg('No one wins, try again');
      }

      setMsgVisible(true);

      const timeoutId = setTimeout(() => {
        setMsgVisible(false);
      }, 1500);
  
      return () => clearTimeout(timeoutId);
    }
  }, [userChoice, computerChoice]);

  useEffect(() => {
    if (userScore === 3 || computerScore === 3) {
      setUserScore(0);
      setComputerScore(0);
      setWinningMsg(`${winner} wins the game!`);
    }
  }, [userScore, computerScore]);

  const userWon = () => {
    return winningChoice[computerChoice] === userChoice;
  }
  
  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    
    return options[randomIndex];
  }
  
  const onChoiceSelect = choice => {
    setUserChoice(choice);
    setComputerChoice(generateComputerChoice());
  }
  
  return (
    <div className="rock-paper-scissors">
      <header>Rock Paper Scissors</header>
      <div className="rock-paper-scissors__scores">
        <span className="user-score">User Score: {userScore}</span>
        <span className="computer-score">Computer Score: {computerScore}</span>
      </div>
      <div className="rock-paper-scissors__options">
        {options.map((o, i) => (
          <button
            key={i}
            onClick={() => onChoiceSelect(o)}
          >
            {o}
          </button>
        ))}
      </div>
      <div className="rock-paper-scissors__choices">
        <span className="user-choice">{userChoice}</span>
        <span className="computer-choice">{computerChoice}</span>
      </div>
      {msgVisible && winner &&
        <div className="rock-paper-scissors__winner">
          {winningMsg}
        </div>
      }
    </div>
  );
}

export default RockPaperScissors;