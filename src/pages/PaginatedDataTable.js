import { useState } from 'react';
import './PaginatedDataTable.css';

// https://www.greatfrontend.com/questions/user-interface/data-table/react
const PaginatedDataTable = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const onPrevClick = () => {
    setCurrentPage(prevValue => prevValue - 1);
  }

  const onNextClick = () => {
    setCurrentPage(prevValue => prevValue + 1);
  }
  
  const onPageSizeChange = e => {
    setCurrentPage(1);
    setPageSize(parseInt(e.target.value));
  }

  const pageStartIndex = (currentPage - 1) * pageSize;
  const pageEndIndex = ((currentPage - 1) * pageSize) + pageSize;
  
  return (
    <div className="paginated-data-table">
      <div className="page-size-picker">
        <label htmlFor="pageSize">Page Size</label>
        <select onChange={onPageSizeChange}>
          <option value="10">10</option>
          <option value="5">5</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            {Object.keys(users[0])
              .map((key, i) => (
                <th scope="column" key={i}>{key.slice(0, 1).toLocaleUpperCase() + key.slice(1)}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {users.slice(pageStartIndex, pageEndIndex)
            .map((user, i1) => (
              <tr key={i1}>
                {Object.keys(user)
                  .map((key, i2) => (
                    <td key={i2}>{user[key]}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={onPrevClick} disabled={currentPage === 1}>
          {'<'}
        </button>
        <p>{currentPage}</p>
        <button onClick={onNextClick} disabled={currentPage >= users.length / pageSize}>
          {'>'}
        </button>
      </div>
    </div>
  );
}

export default PaginatedDataTable;
