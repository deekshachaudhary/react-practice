// Task 1: Given api.findOffices() returns all offices. Render the list of all offices in the result table
// Task 2: Render list of regions in filter dynamically with data from api
// Task 3: Render the list of capacity dynamicly following the rule: first option is smallest capacity. Next options are an increment of 10 from the previous one. The last option is not bigger than the largest capacity. E.g [5, 15, 25, 35]
// Task 4: Send selected filters to api.findOffices()
// Task 5: Implement api.findOffices to filter offices result. Write test cases for the implementation
// Task 6: CSS styles for the table and filter

import { useEffect, useState } from "react";
import { officesData } from "../assets/data";
import "./OfficeManagement.css";

export const api = {
  /**
   * find offices that match the search criteria
   * @param search - a simple string. Default ''
   * @param region - the region of the matching offices. Default all regions
   * @param capacity - the minimum capacity requirements for the matching office. Default 0
   * @returns {Promise<Office>}
   */
  findOffices: filter => {
    const { searchTerm, region, capacity } = filter || {};
    
    const _filteredOffices = officesData.filter(d => (
      (region ? d.region === region : true) &&
      (capacity ? d.capacity >= capacity : true) &&
      (searchTerm ? d.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    ));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(_filteredOffices)
      }, 500);
    })
  }
};

const Title = () => {
  return (
    <h3>Office Management</h3>
  );
}

const Filters = ({ setFilter, data }) => {
  const [region, setRegion] = useState('');
  const [capacity, setCapacity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const uniqueRegions = [...new Set(data.map(d => d.region))];

  const allCapacities = data.map(d => d.capacity)
    .sort((a, b) => a - b);
  const minCapacity = Math.min(...allCapacities);
  const maxCapacity = Math.max(...allCapacities);
  
  const createCapacityValues = () => {
    const result = [minCapacity];

    while (result.slice(-1)[0] + 10 <= maxCapacity) {
      result.push(result.slice(-1)[0] + 10);
    }

    return result;
  }

  const capacities = createCapacityValues();

  const onFilterSubmit = e => {
    e.preventDefault();
    setFilter({ searchTerm, region, capacity });
    api.findOffices({ searchTerm, region, capacity });
  }

  return (
    <form onSubmit={onFilterSubmit}>
      <select
        name='regions'
        value={region}
        onChange={e => setRegion(e.target.value)}
      >
        <option value=''>Select Region</option>
        {uniqueRegions.map((r, i) => (
          <option key={i} value={r}>{r}</option>
        ))}
      </select>
      <select
        name='capacity'
        value={capacity}
        onChange={e => setCapacity(e.target.value)}
      >
        <option value=''>Select minimum capacity</option>
        {capacities.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}
      </select>
      <label htmlFor="searchTerm">Search</label>
      <input
        type="search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      >
      </input>
      <button type="submit">Filter</button>
    </form>
  );
}

const Result = ({ data }) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <table className="offices-table">
      <thead>
        <tr>
          {columns.map((key, i) => (
            <th key={i}>{key[0].toUpperCase() + key.slice(1)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(d => (
          <tr key={d.id}>
            {columns.map((key, i) => (
              <td key={i}>
                {Array.isArray(d[key]) ?
                  d[key].join(', ') :
                  d[key]
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const OfficeManagement = () => {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState({ region: '', capacity: '', searchTerm: '' });

  useEffect(() => {
    const getOfficesData = async () => {
      try {
        const response = await api.findOffices(filter);
        setData(response);
      } catch (e) {
        throw new Error('Cannot get Offices data: ', e);
      }
    }

    getOfficesData();
  }, [filter]);

  if (data == null) {
    return <div>Loading...</div>;
  }

  return (
    <div id="office-list">
      <Title>Office List</Title>
      <Filters setFilter={setFilter} data={data} />
      <Result data={data} />
    </div>
  );
}

export default OfficeManagement;
