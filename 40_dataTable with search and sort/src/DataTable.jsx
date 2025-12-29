import { useState } from 'react';
import './App.css'; // Make sure to create a DataTable.css file with the provided CSS
import { initialData } from './constants';

function DataTable() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Helper function to check if the term matches any user attributes
  // item: {"firstName": "", "lastName": "", "address": "", "city": "", "state": ""}

  const matchesSearchTerm = (item, term) => {
    const searchFields = ['firstName', 'lastName', 'address', 'city', 'state'];
    const lowerCaseTerm = term.toLowerCase();
    const final = searchFields.some((field) =>
      item[field].toLowerCase().includes(lowerCaseTerm)
    );
    console.log('final', final); // → Returns true if match found in any field
    return final;
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term state
    setCurrentPage(1); // Reset to the first page when search term changes

    if (!term) {
      setData(initialData);
      return;
    }

    const filteredData = data.filter((item) => matchesSearchTerm(item, term));
    console.log('filteredData', filteredData);
    setData(filteredData);
  };

  const handleSort = (key) => {
    // Default sort direction is ascending
    let direction = 'ascending';

    // Check if the current sort configuration exists and matches the key and direction
    // If the current direction is 'ascending', switch it to 'descending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    // Sort the data:
    // 1. Make a shallow copy of the data array to avoid mutating the original array.
    // 2. Use the Array.prototype.sort method to sort the data.
    const sortedData = [...data].sort((a, b) => {
      // Compare the data based on the key
      if (a[key] < b[key]) {
        // If a is less than b, return -1 for ascending, 1 for descending
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        // If a is greater than b, return 1 for ascending, -1 for descending
        return direction === 'ascending' ? 1 : -1;
      }
      // If a and b are equal, return 0 to indicate no change in order
      return 0;
    });

    // Update the state with the newly sorted data
    setData(sortedData);

    // Update the sort configuration state to reflect the current sorting
    setSortConfig({ key, direction });
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const selectedData = data.slice(startIndex, startIndex + rowsPerPage);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((current) => current - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((current) => current + 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  return (
    <div className='table-container'>
      <input
        className='search-input'
        type='text'
        placeholder='Search by name...'
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <table className='table'>
        <thead>
          <tr>
            <th onClick={() => handleSort('firstName')}>First Name</th>
            <th onClick={() => handleSort('lastName')}>Last Name</th>
            <th onClick={() => handleSort('address')}>Address</th>
            <th onClick={() => handleSort('city')}>City</th>
            <th onClick={() => handleSort('state')}>State</th>
          </tr>
        </thead>
        <tbody>
          {selectedData.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.address}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='pagination-controls'>
        <button
          className='pagination-btn'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='pagination-info'>
          Page {currentPage} of {totalPages}
        </span>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          {[5, 10, 15, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <button
          className='pagination-btn'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;
