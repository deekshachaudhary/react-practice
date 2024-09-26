import { useState } from 'react';
import './DiceRoller.css';

const DiceRoller = () => {
  const [numDices, setNumDices] = useState(0);
  const [numbersRolled, setNumbersRolled] = useState([]);

  const onRoll = () => {
    setNumbersRolled([]);

    const updatedNumbers = [];

    for(let i = 1; i <= numDices; i++) {
      updatedNumbers.push(Math.floor((Math.random() * 6) + 1));
    }

    setNumbersRolled(updatedNumbers);
  }

  return (
    <div className="dice-roller">
      <header>Dice Roller</header>
      <div className="input-and-button">
        <div className="num-dices-input">
          <label htmlFor="numDices">Number of Dices</label>
          <input
            name="numDices"
            type="number"
            value={numDices}
            onChange={e => setNumDices(e.target.value)}
            min={1}
            max={12}
          />
        </div>
        <button className="roll-dice-button" onClick={onRoll}>
          Roll
        </button>
      </div>
      <div className="result">
        {/* All items under the same parent, layout using css grid */}
        {numbersRolled.map((n, i1) => (
          <div key={i1} className="dice">
            {Array(n).fill(0)
              .map((_, i2) => (
                <div key={i2} className="dice-value"></div>
              ))
            }
          </div>
        ))}

        {/* Items arranged in rows and columns, floated left using css */}
        {/* {numbersRolled.length > 0 && Array(Math.ceil(numDices / 3)).fill(0)
          .map((_, r) => (
            <div className="row" key={r}>
              {Array(3).fill(0).map((_, c) => (
                <div className="dice" key={r + c}>
                  {Array(numbersRolled[(3 * r) + c]).fill(0)
                    .map((_, i) => (
                      <div key={i} className="dice-value">·</div>
                    ))
                  }
                </div>
              ))}
            </div>
          ))
        } */}
      </div>
    </div>
  )
}

export default DiceRoller;