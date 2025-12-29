// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <TodoList /> component
// TodoList.jsx → contains all todo list logic
// data.js → initial todo items array

// ============================================
// DATA STRUCTURE
// ============================================

// initialItems from data.js:
// → Array of todo objects
// → Each object has 3 properties:
//   - id: unique identifier (string)
//   - text: todo item text (string)
//   - isEditing: editing mode flag (boolean, default false)

// Example:
// → [{ id: '1', text: 'Buy groceries', isEditing: false }, ...]

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: todoItems → useState(initialItems)
// → Stores all todo items
// → Initialized with data from data.js file
// → Each item has: id, text, isEditing

// State 2: inputValue → useState('')
// → Tracks value in add todo input field
// → Starts as empty string

// ============================================
// JSX STRUCTURE
// ============================================

// Main container div with className 'container text-center'

// SECTION 1: Form (for adding new todos)
// → Form element with:
//   - id='todoForm'
//   - onSubmit={handleSubmit}

// Inside form:
// → Input field with:
//   - type='text'
//   - value={inputValue}
//   - onChange={(e) => setInputValue(e.target.value)}
//   - placeholder='Add a new item'
//   - autoComplete='off'

// SECTION 2: Todo list (ul element)
// → ul with id='listContainer' and className='list-container'
// → Map over todoItems: todoItems.map((item) => ...)

// For each todo item, render li:
// → key={item.id}

// Inside li, three parts:

// PART 1: Conditional display (edit mode vs view mode)
// → Ternary: {item.isEditing ? ... : ...}

// If isEditing is true:
// → Input field with:
//   - type='text'
//   - value={item.text}
//   - onChange={(e) => handleEditChange(e, item.id)}

// If isEditing is false:
// → Span with className='text'
//   - Display: {item.text}

// PART 2: Edit/Save button
// → onClick={() => handleEdit(item.id)}
// → Dynamic icon: {item.isEditing ? '💾' : '✏️'}
// → Shows save icon (💾) when editing, pencil (✏️) otherwise

// PART 3: Delete button
// → className='delete'
// → onClick={() => handleDelete(item.id)}
// → Display: 🗑️ (trash icon)

// SECTION 3: Empty state message
// → Conditional: {todoItems.length === 0 && ...}
// → Shows: "Ooops! List is empty" when no todos

// ============================================
// addTodoItem FUNCTION
// ============================================

// Purpose: Add new todo to list

// Accepts: item (the text for new todo)

// Logic:
// → setTodoItems((prevItems) => [...prevItems, newTodoObject])
// → Spread existing items, add new one at end

// New todo object structure:
// → { id: `${item}-${Date.now()}`, text: item, isEditing: false }

// Why this id format?
// → Combines item text with timestamp
// → Ensures uniqueness (Date.now() gives unique milliseconds)
// → Example: 'Buy milk-1634567890123'

// isEditing defaults to false → new items not in edit mode

// ============================================
// handleDelete FUNCTION
// ============================================

// Purpose: Remove todo from list

// Accepts: id (id of todo to delete)

// Logic:
// → setTodoItems((prevItems) => prevItems.filter((item) => item.id !== id))
// → Keep all todos where id doesn't match
// → Filter out the matching todo

// Example:
// → handleDelete('1')
// → Removes todo with id: '1'
// → All other todos remain

// ============================================
// handleEdit FUNCTION
// ============================================

// Purpose: Toggle edit mode for specific todo

// Accepts: id (id of todo to edit)

// Logic:
// → setTodoItems((prevItems) => prevItems.map(...))
// → Map over all items

// For each item:
// → Check: item.id === id
// → If match: { ...item, isEditing: !item.isEditing }
//   - Spread item properties
//   - Toggle isEditing (true → false, false → true)
// → If no match: return item unchanged

// Example:
// → Todo has isEditing: false
// → Click edit button → handleEdit('1')
// → isEditing becomes true
// → Input field appears for editing
// → Click save button → handleEdit('1')
// → isEditing becomes false
// → Span with text appears

// ============================================
// handleEditChange FUNCTION
// ============================================

// Purpose: Update todo text while editing

// Accepts: (e, id)
// → e: event object
// → id: id of todo being edited

// STEP 1: Get new value from input
// → const newValue = e.target.value
// → User's typed text

// STEP 2: Update todos array
// → setTodoItems((prevItems) => prevItems.map(...))
// → Map over all items

// For each item:
// → Check: item.id === id
// → If match: { ...item, text: newValue }
//   - Spread item properties
//   - Replace text with newValue
// → If no match: return item unchanged

// Example:
// → User types in edit input
// → Every keystroke triggers onChange
// → handleEditChange updates text in state
// → Input reflects new text immediately (controlled component)

// ============================================
// handleSubmit FUNCTION (ADD TODO)
// ============================================

// Purpose: Handle form submission to add new todo

// Accepts: e (event object)

// STEP 1: Prevent default form behavior
// → e.preventDefault()
// → Stops page refresh on submit

// STEP 2: Check if input has value
// → if (inputValue)
// → Only proceed if not empty string

// STEP 3: Add new todo
// → addTodoItem(inputValue)
// → Passes current input value

// STEP 4: Clear input field
// → setInputValue('')
// → Resets to empty string
// → Ready for next todo

// Trigger: User presses Enter key or submits form

// ============================================
// TODO LIST FLOW
// ============================================

// Initial state:
// → todoItems = initialItems from data.js
// → inputValue = ''
// → List displays all initial todos
// → All todos in view mode (not editing)

// User types in add input:
// → inputValue updates with each keystroke
// → Controlled input reflects state

// User presses Enter (submit form):
// → handleSubmit called
// → e.preventDefault() stops page refresh
// → Check: inputValue not empty
// → addTodoItem(inputValue) adds new todo
// → New todo object: { id: 'text-timestamp', text: inputValue, isEditing: false }
// → Added to todoItems array
// → setInputValue('') clears input
// → New todo appears in list

// User clicks edit button (✏️):
// → handleEdit(item.id) called
// → Maps through todos, finds matching id
// → Toggles isEditing from false to true
// → Conditional rendering switches to input field
// → User can now edit text
// → Button changes to save icon (💾)

// User edits text in edit input:
// → handleEditChange(e, item.id) called on each keystroke
// → newValue = e.target.value
// → Maps through todos, finds matching id
// → Updates text property with newValue
// → Input reflects changes immediately

// User clicks save button (💾):
// → handleEdit(item.id) called again
// → Toggles isEditing from true to false
// → Conditional rendering switches to span
// → Updated text displayed
// → Button changes back to edit icon (✏️)

// User clicks delete button (🗑️):
// → handleDelete(item.id) called
// → Filters out todo with matching id
// → Todo removed from list
// → Remaining todos displayed

// All todos deleted:
// → todoItems.length === 0
// → Conditional message appears: "Ooops! List is empty"

// ============================================
// CSS APPROACH
// ============================================

// .container:
// → Center content on page
// → display: flex, flex-direction: column
// → align-items: center

// #todoForm:
// → Margin bottom for spacing
// → Width for form size

// Input fields:
// → Padding, border, border-radius for appearance
// → Focus styles for better UX

// .list-container:
// → list-style: none (no bullet points)
// → padding: 0

// li (todo item):
// → display: flex
// → justify-content: space-between
// → align-items: center
// → padding, margin for spacing
// → border or background for visibility

// .text (todo text span):
// → flex: 1 (takes available space)
// → text-align: left

// Buttons (.edit, .delete):
// → Padding, margin for spacing
// → cursor: pointer
// → background, border styling
// → Hover effects for better UX
// → Font size for emoji visibility

// .no-elements (empty state):
// → Font styling, color
// → Center alignment
// → Padding for spacing

// ============================================
// KEY CONCEPTS
// ============================================

// Why isEditing property? → Track which todos are in edit mode
// Why controlled inputs? → React controls value, enables validation
// Why e.preventDefault()? → Prevent page refresh on form submit
// Why Date.now() in id? → Create unique timestamps for ids
// Why map for updates? → Immutability, create new array with changes
// Why filter for delete? → Create new array without deleted item
// Why spread operator? → Preserve other properties when updating
// Why conditional rendering? → Show input or span based on mode
// Why dynamic button icon? → Visual feedback for current state
// Why clear input after submit? → Better UX, ready for next input
// Why check inputValue in submit? → Prevent adding empty todos
// Template literal for id → Combine text and timestamp
// Ternary operator → Concise conditional rendering
// Map returns new array → Immutability principle in React
