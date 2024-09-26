import { useState } from 'react';
import classnames from 'classnames';
import './HangarooPuzzle.css';
// import img1 from '../assets/img1';
// import img2 from '../assets/img2';
// import img3 from '../assets/img3';
// import img4 from '../assets/img4';
// import img5 from '../assets/img5';
// import img6 from '../assets/img6';
// import img7 from '../assets/img7';
// import img8 from '../assets/img8';

const HangarooPuzzle = () => {
  // const [pieces, setPieces] = useState([
  //   { i: 0, j: 0, image: img1 },
  //   { i: 0, j: 1, image: img2 },
  //   { i: 0, j: 2, image: img3 },
  //   { i: 1, j: 0, image: img4 },
  //   { i: 1, j: 1, image: img5 },
  //   { i: 1, j: 2, image: img6 },
  //   { i: 2, j: 0, image: '' },
  //   { i: 2, j: 1, image: img7 },
  //   { i: 2, j: 2, image: img8 },
  // ]);

  const getRandomPieces = () => {
    const randomValues = ['1', '2', '3', '4', '5', '6', '7', '8', ''];
    const pieces = [
      { i: 0, j: 0, image: '' },
      { i: 0, j: 1, image: '' },
      { i: 0, j: 2, image: '' },
      { i: 1, j: 0, image: '' },
      { i: 1, j: 1, image: '' },
      { i: 1, j: 2, image: '' },
      { i: 2, j: 0, image: '' },
      { i: 2, j: 1, image: '' },
      { i: 2, j: 2, image: '' },
    ];

    for (let i = 0; i < randomValues.length; i++) {
      const randomIndex = Math.floor(Math.random() * randomValues.length);
      const temp = randomValues[i];
      randomValues[i] = randomValues[randomIndex];
      randomValues[randomIndex] = temp;
    }

    const result = pieces.map((p, i) => ({ ...p, image: randomValues[i] }));

    return result;
  };

  const [pieces, setPieces] = useState(getRandomPieces());
  const size = Math.round(Math.sqrt(pieces.length));
  // const puzzleSolution = [
  //   { i: 0, j: 0, image: img1 },
  //   { i: 0, j: 1, image: img2 },
  //   { i: 0, j: 2, image: img3 },
  //   { i: 1, j: 0, image: img4 },
  //   { i: 1, j: 1, image: img5 },
  //   { i: 1, j: 2, image: img6 },
  //   { i: 2, j: 0, image: img7 },
  //   { i: 2, j: 1, image: img8 },
  //   { i: 2, j: 2, image: '' },
  // ];
  const puzzleSolution = [
    { i: 0, j: 0, image: '1' },
    { i: 0, j: 1, image: '2' },
    { i: 0, j: 2, image: '3' },
    { i: 1, j: 0, image: '4' },
    { i: 1, j: 1, image: '5' },
    { i: 1, j: 2, image: '6' },
    { i: 2, j: 0, image: '7' },
    { i: 2, j: 1, image: '8' },
    { i: 2, j: 2, image: '' },
  ];
  const [wonGame, setWonGame] = useState(false);

  const isNearEmptySpot = (piece, emptySpot) => {
    const {i, j} = piece;
    const {i: emptySpotI, j: emptySpotJ} = emptySpot;

    let emptySpotAbove;
    let emptySpotBelow;
    let emptySpotLeft;
    let emptySpotRight;

    if (i-1 >= 0) emptySpotAbove = i-1 === emptySpotI && j === emptySpotJ;
    if (i+1 < size) emptySpotBelow = i+1 === emptySpotI && j === emptySpotJ;
    if (j-1 >= 0) emptySpotLeft = i === emptySpotI && j-1 === emptySpotJ;
    if (j+1 < size) emptySpotRight = i === emptySpotI && j+1 === emptySpotJ;

    return emptySpotAbove || emptySpotBelow || emptySpotLeft || emptySpotRight;
  }

  const handleOnClick = (i, j) => {
    const updatedVal = [...pieces];
    const pieceIndex = pieces.findIndex(el => el.i === i && el.j === j);
    const emptySpotIndex = pieces.findIndex(el => el.image === '');

    if (isNearEmptySpot(pieces[pieceIndex], pieces[emptySpotIndex])) {
      // Ask Ru why pieces[emptySpotIndex] gets pieces[pieceIndex] value here
      // updatedVal[emptySpotIndex].image = pieces[pieceIndex].image;
      // updatedVal[pieceIndex].image = pieces[emptySpotIndex].image;

      const temp = pieces[pieceIndex].image;
      updatedVal[pieceIndex].image = pieces[emptySpotIndex].image;
      updatedVal[emptySpotIndex].image = temp;
      setPieces(updatedVal);

      if (pieces.every((el, i) => el.image === puzzleSolution[i].image)) {
        setWonGame(true);
      }
    }
  }

  const createRow = rowNum => (
    pieces
      .filter(p => p.i === rowNum)
      .map(p => (
        <button
          key={p.i+p.j}
          className={classnames('col', { 'empty': p.image === '' })}
          onClick={() => handleOnClick(p.i, p.j)}
          disabled={wonGame}
        >
          {/* <img src={p.image} alt=''></img> */}
          {p.image}
        </button>
      ))
  );

  const resetGame = () => {
    setPieces(getRandomPieces());
    setWonGame(false);
  }

  return (
    <div className="HangarooPuzzle">
      <header className="header">
        Hangaroo Puzzleee
      </header>
      <div className='puzzle-area'>
        <div className='row'>
          {createRow(0)}
        </div>
        <div className='row'>
          {createRow(1)}
        </div>
        <div className='row'>
          {createRow(2)}
        </div>
        {wonGame && <span className='win-overlay'>WON!</span>}
        <button onClick={resetGame}>Restart</button>
      </div>
    </div>
  );
}

export default HangarooPuzzle;