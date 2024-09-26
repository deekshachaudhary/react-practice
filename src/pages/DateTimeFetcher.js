import { useState, useEffect } from 'react';

const DateTimeFetcher = () => {
  const [dateTimeData, setDateTimeData] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(null);

  const dateTimeApi = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() < 0.5 ? resolve('June 20, 2024, 21:05:00') : reject('Fetching date time failed');
      }, 2000);
    });
  }

  useEffect(() => {
    setLoadingData(true);
    dateTimeApi()
      .then(response => setDateTimeData(response))
      .catch(error => {
        console.log('Error: ', error);
        setError(error);
      })
      .finally(() => setLoadingData(false));
  }, []);

  return (
    <>
      Welcome to the date time fetcher
      {loadingData ? (
        <div>
          Fetching date time...
        </div>
      ) : error ? (
        <div>
          {error}
        </div>
      ) : (
        <div>
          Hey look at the date time!! It is {dateTimeData}
        </div>
      )}
    </>
  );
}

export default DateTimeFetcher;

































// import { useState, useEffect } from 'react';

// const Test = () => {
//   const [data, setData] = useState([]);

//   const fetchData = () => {
//     return new Promise(resolve => resolve({
//       data: ['Title 1', 'Title 2']
//     }));
//   }

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         let response = await fetchData();
//         setData(response.data);
//       } catch (e) {
//         console.log('Error: ', e);
//       }
//     }

//     getData();
//   }, []);

//   return (
//     <div>
//       {data.map((movieTitle, i) => (
//         <div key={i}>{movieTitle}</div>
//       ))}
//     </div>
//   );
// }

// export default Test;

