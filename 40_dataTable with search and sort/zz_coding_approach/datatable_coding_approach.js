// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <DataTable />
// DataTable.jsx → main component with search, sort, pagination
// constants.js → initialData array

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: data → useState(initialData)
// → Current dataset (filtered/sorted)
// → Modified by search and sort operations

// State 2: searchTerm → useState('')
// → Current search input value
// → Controlled input for search box

// State 3: sortConfig → useState(null)
// → { key: 'firstName', direction: 'ascending' } or null
// → Tracks current sort column and direction

// State 4: currentPage → useState(1)
// → Current page number (1-indexed)
// → Changes with prev/next buttons

// State 5: rowsPerPage → useState(5)
// → Number of rows to display per page
// → Default 5, options: 5, 10, 15, 20

// ============================================
// MATCHESSEARCHTERM HELPER FUNCTION
// ============================================

// Purpose: Check if item matches search term in any field

// Parameters: (item, term)
// → item: data object with fields
// → term: search string

// Logic:
// → searchFields array defines searchable columns
// → Convert term to lowercase: term.toLowerCase()
// → Use .some() to check if ANY field matches
// → item[field].toLowerCase().includes(lowerCaseTerm)
// → Returns true if match found in any field

// ============================================
// HANDLESEARCH FUNCTION
// ============================================

// Purpose: Filter data based on search term

// STEP 1: Update search term state
// → setSearchTerm(term)

// STEP 2: Reset to first page
// → setCurrentPage(1)
// → Prevents showing empty page after filtering

// STEP 3: Check if term is empty
// → if (!term) reset to initialData and return

// STEP 4: Filter data
// → data.filter((item) => matchesSearchTerm(item, term))
// → Keep only matching items
// → setData(filteredData)

// ============================================
// HANDLESORT FUNCTION
// ============================================

// Purpose: Sort data by column (toggle ascending/descending)

// STEP 1: Determine sort direction
// → Default: 'ascending'
// → If clicking same column already sorted ascending → 'descending'
// → Check: sortConfig.key === key && sortConfig.direction === 'ascending'

// STEP 2: Sort data
// → [...data].sort() - shallow copy to avoid mutation
// → Compare: a[key] < b[key]
// → Return -1 (ascending) or 1 (descending) for less than
// → Return 1 (ascending) or -1 (descending) for greater than
// → Return 0 for equal

// STEP 3: Update states
// → setData(sortedData)
// → setSortConfig({ key, direction })

// ============================================
// PAGINATION CALCULATIONS
// ============================================

// startIndex calculation:
// → (currentPage - 1) * rowsPerPage
// → Example: page 2, 5 per page → (2-1) * 5 = 5

// selectedData (current page data):
// → data.slice(startIndex, startIndex + rowsPerPage)
// → Example: data.slice(5, 10) → items 5-9

// totalPages calculation:
// → Math.ceil(data.length / rowsPerPage)
// → Example: 23 items, 5 per page → Math.ceil(23/5) = 5 pages

// ============================================
// PAGINATION HANDLERS
// ============================================

// handlePrevPage:
// → setCurrentPage((current) => current - 1)
// → Decrements page number
// → Disabled when currentPage === 1

// handleNextPage:
// → setCurrentPage((current) => current + 1)
// → Increments page number
// → Disabled when currentPage === totalPages

// handleRowsPerPageChange:
// → parseInt(event.target.value, 10) - convert string to number
// → setRowsPerPage(parsedValue)
// → setCurrentPage(1) - reset to first page

// ============================================
// JSX STRUCTURE
// ============================================

// SECTION 1: Search input
// → className='search-input'
// → type='text', placeholder
// → value={searchTerm} - controlled
// → onChange={(e) => handleSearch(e.target.value)}

// SECTION 2: Table
// → <table className='table'>
// → <thead> with clickable column headers
// → Each <th onClick={() => handleSort('columnKey')}>
// → <tbody> maps over selectedData (current page)

// Table body:
// → {selectedData.map((item, index) => ...)}
// → <tr key={index}> for each row
// → <td> for each column value

// SECTION 3: Pagination controls
// → Previous button (disabled={currentPage === 1})
// → Page info: "Page X of Y"
// → Rows per page dropdown
// → Next button (disabled={currentPage === totalPages})

// Dropdown options:
// → [5, 10, 15, 20].map((pageSize) => <option>)
// → value={rowsPerPage}
// → onChange={handleRowsPerPageChange}

// ============================================
// KEY CONCEPTS
// ============================================

// Controlled search input → value and onChange synced with state
// .some() method → Returns true if ANY element passes test
// .includes() method → Check if string contains substring
// Shallow copy [...data] → Avoid mutating original array
// .sort() comparator → Returns -1, 0, or 1 for sorting
// .slice(start, end) → Extract portion of array for pagination
// Math.ceil() → Round up for total pages calculation
// Functional setState → (current) => current + 1 for safe updates
// parseInt(value, 10) → Convert string to number (base 10)
// Disabled button → disabled={condition} prevents clicks
// onClick on <th> → Makes table headers clickable for sorting
// key={index} → React list key (use unique ID in production)
// Toggle sort direction → Check current state and flip
// Reset to page 1 → When search or rowsPerPage changes
// sortConfig state → Track which column and direction currently sorted