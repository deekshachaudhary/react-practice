import { useState } from 'react';
import './FuzzySearch.css';

const searchData = ['risk', 'rise', 'health', 'ice', 'rice', 'lime', 'spark', 'question', 'earth', 'triangle'];

const FuzzySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultData, setResultData] = useState([]);

  const deltaDist = (a, b) => {
    const longerString = a.length > b.length ? a : b;
    const shorterString = a === longerString ? b : a;
    let distance = longerString.length - shorterString.length;

    for (let i = 0; i < shorterString.length; i++) {
      if (shorterString[i] !== longerString[i]) {
        distance++;
      }
    }
    // rice bricer
    // rice ffffff
    // rice lotr
    // rice loto

    return distance;
  }

  const onSearch = () => {
    let result = [];
    let subStringMatches = [];
    let partialSubStringMatches = [];
    let deltaDistMatches = [];

    subStringMatches = searchData.filter(val => {
      const containsSubstring = val.includes(searchTerm) || searchTerm.includes(val);

      if (containsSubstring) {
        return true;
      }
      return false;
    });

    subStringMatches.sort((a, b) => b.length - a.length);
    subStringMatches.sort((a, b) => deltaDist(a, searchTerm) - deltaDist(b, searchTerm));

    if (subStringMatches.length === 0) {
      const regex = new RegExp(searchTerm, 'g');

      partialSubStringMatches = searchData.filter(val => {
        const foundIndex = val.search(regex);
        console.log(`searching ${searchTerm} in val, found at ${foundIndex} `);

        if (foundIndex > -1) {
          return true;
        }
        return false;
      });
    }

    if (partialSubStringMatches.length === 0) {
      deltaDistMatches = searchData.filter(val => deltaDist(val, searchTerm) <= 4);
      deltaDistMatches.sort((a, b) => deltaDist(a, searchTerm) - deltaDist(b, searchTerm));
    }

    if (subStringMatches.length > 0) {
      result = subStringMatches;
    } else if (partialSubStringMatches.length > 0) {
      result = partialSubStringMatches;
    } else {
      result = deltaDistMatches;
    }

    setResultData(result);
  }

  return (
    <div className="FuzzySearch">
      <header className="header">
        Fuzzy Search
      </header>
      <div>
        <input
          name='searchTerm'
          type='text'
          placeholder='Enter search term'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        >
        </input>
        <button onClick={() => onSearch()}>Submit</button>
      </div>
      <div className='results'>
        <p>Search results:</p>
        <ul>
          {resultData.map((val, i) => (
            <li key={i}>
              {val}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FuzzySearch;