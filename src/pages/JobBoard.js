import { useState, useEffect } from 'react';
import './JobBoard.css';
import { Link } from 'react-router-dom';

const PAGE_SIZE = 6;

// https://www.greatfrontend.com/questions/user-interface/job-board/react
const JobBoard = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [jobIds, setJobIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const getJobIds = async () => {
    try {
      let response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
      response = await response.json();
      setJobIds(response);
    } catch (e) {
      throw new Error('Cannot get job ids: ', e);
    }
  }

  const getJobDetailsByPage = async (pageNumber) => {
    try {
      const jobDetailsByPage = await Promise.all(
        jobIds
          .slice(pageNumber * PAGE_SIZE, PAGE_SIZE + (pageNumber * PAGE_SIZE))
          .map(jobId => (
            fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
              .then(resp => resp.json())
          ))
      );
      setJobDetails(prev => ([...prev, ...jobDetailsByPage]));
    } catch (e) {
      throw new Error('Cannot get job details for this page: ', e); 
    }
  }
  
  useEffect(() => {
    getJobIds();
  }, []);

  useEffect(() => {
    if (jobIds.length > 0) {
      getJobDetailsByPage(currentPage);
    }
  }, [jobIds, currentPage]);

  const onLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  }

  return (
    <div className="job-board">
      <header className="job-board__header">Job Board</header>
      <main className="job-board__postings">
        {jobDetails.map(d => (
          <div key={d.id} className="job-board__postings__posting">
            <h4 className="job-board__posting__title">
              {d.url ?
                <Link
                  to={d.url}
                  target='blank'
                  className="job-board__posting__title__link"
                >
                  {d.title}
                </Link> :
                d.title
              }
            </h4>
            <div className="job-board__posting__by">
              {`By ${d.by}`}
            </div>
            <div className="job-board__posting__date-time">
              {new Date(d.time * 1000).toLocaleString()}
            </div>
          </div>
        ))}
      </main>
      {PAGE_SIZE + (currentPage * PAGE_SIZE) <= jobDetails.length && (
        <button
          className="job-board__load-more-btn"
          onClick={onLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default JobBoard;