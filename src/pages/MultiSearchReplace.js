import './MultiSearchReplace.css';
import { useState } from 'react';

const MultiSearchReplace = () => {
  // const sentence = 'There was once upon a time a bear who was traveling to bearland where fifty thousand bears were getting surpassed by a crocodile';
  // const searchTerm = 'bear';
  // const replaceTerm = 'sheep';

  const [searchReplaceTerms, setSearchReplaceTerms] = useState([{ searchTerm: '', replaceTerm: '' }]);
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [error, setError] = useState('');

  const searchAndReplace = (inputText, searchTerm, replaceTerm) => {
    if (searchTerm.length === 0 || replaceTerm.length === 0 || inputText.length === 0) {
      setError('Invalid inputs');
      return;
    }
    const regex = new RegExp(searchTerm, 'g');
    let foundIndex = 0;
    let result = '';
    let searchFrom = 0;
    
    // T h e r e   w a s    a     b  e  a  r     e  a  t  i  n  g     w  i  t  h     
    // 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28
    //                                        0  1  2  3  4  5  6  7  8  9 10 11 12
    //  a  n  o  t  h  e  r     f  i  v  e     b  e  a  r  s     i  n     t  h  e     w  o  o  d  s
    // 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59
    // 13 14 15 16 17 18 19 20 21 22 23 24 25 26           0  1  2  3  4  5  6  7  8  9 10 11 12 13

    while (searchFrom < inputText.length) {
      if (inputText.slice(searchFrom).search(regex) === -1) {
        break;
      } else {
        foundIndex = inputText.slice(searchFrom).search(regex) + searchFrom;
        result += inputText.slice(searchFrom, foundIndex) + replaceTerm;
        searchFrom = foundIndex + searchTerm.length;
      }
    }
    result += inputText.slice(foundIndex + searchTerm.length);
    return result;
  }

  const addNewFieldsPair = () => {
    setSearchReplaceTerms([...searchReplaceTerms, { searchTerm: '', replaceTerm: '' }]);
  }

  const removeFieldsPair = i => {
    const updatedVal = [...searchReplaceTerms];
    updatedVal.splice(i, 1);
    setSearchReplaceTerms(updatedVal);
  }

  const onSearchReplaceChange = (e, i) => {
    setError('');
    const updatedVal = [...searchReplaceTerms];
    updatedVal[i][e.target.name] = e.target.value;
    setSearchReplaceTerms(updatedVal);
  };

  const searchAndReplaceAll = () => {
    let result = searchAndReplace(inputText, searchReplaceTerms[0].searchTerm, searchReplaceTerms[0].replaceTerm);
    for (let i = 1; i < searchReplaceTerms.length; i++) {
      result = searchAndReplace(result, searchReplaceTerms[i].searchTerm, searchReplaceTerms[i].replaceTerm);
    }
    setResultText(result);
  }

  return (
    <div className="MultiSearchReplace">
      <header className="header">
        Multi search and replace
      </header>
      <div>
        <textarea type="text" placeholder='Enter text' rows={5} cols={50} value={inputText} onChange={e => setInputText(e.target.value)}></textarea>
        {searchReplaceTerms.map((obj, i) => (
          <div key={i}>
            <input
              name='searchTerm'
              type='text'
              placeholder='Enter search term'
              value={obj.searchTerm}
              onChange={e => onSearchReplaceChange(e, i)}>
            </input>
            <input
              name='replaceTerm'
              type='text'
              placeholder='Enter replace term'
              value={obj.replaceTerms}
              onChange={e => onSearchReplaceChange(e, i)}>
            </input>
            <button onClick={() => addNewFieldsPair()}>+</button>
            <button onClick={() => removeFieldsPair(i)}>-</button>
          </div>
        ))}
        <p className='error'>{error}</p>
        <button onClick={() => searchAndReplaceAll()}>Submit</button>
        <p>
          {resultText}
        </p>
      </div>
    </div>
  );
}

export default MultiSearchReplace;
