
/**
 * APPROACH OVERVIEW:
 * - Use a Set to track checked item IDs (simple state management)
 * - When a checkbox is clicked:
 *   Step 1: Update all descendants (propagate down)
 *   Step 2: Update all ancestors (propagate up)
 * - Use recursion for tree traversal
 */

// STATE MANAGEMENT
// Simple approach: Set of checked IDs
const [checkedItems, setCheckedItems] = useState(new Set());

/**
 * CORE LOGIC - handleCheck function
 */
const handleCheck = (item, isChecked) => {
  setCheckedItems((prev) => {
    const newChecked = new Set(prev);

    /**
     * STEP 1: UPDATE DESCENDANTS (Propagate Down)
     * When checking/unchecking an item, apply same action to all children
     */
    const updateItem = (item, shouldCheck) => {
      // Add or remove current item
      if (shouldCheck) {
        newChecked.add(item.id);
      } else {
        newChecked.delete(item.id);
      }

      // Recursively update all children
      if (item.children) {
        item.children.forEach((child) => updateItem(child, shouldCheck));
      }
    };

    // Start the downward propagation
    updateItem(item, isChecked);

    /**
     * STEP 2: UPDATE ANCESTORS (Propagate Up)
     * After updating item and its children, update parent checkboxes
     *
     * Rule: Parent is checked if ALL children are checked
     *       Parent is unchecked if ANY child is unchecked
     */
    const updateParents = (target, data) => {
      // Helper: Find parent of target item in the tree
      const findParent = (nodes, parent = null) => {
        for (let node of nodes) {
          if (node.id === target.id) {
            return parent; // Found target, return its parent
          }
          if (node.children) {
            const found = findParent(node.children, node);
            if (found) return found;
          }
        }
        return null;
      };

      const parent = findParent(data);
      if (parent) {
        // Get all children IDs of this parent
        const childrenIds = getChildrenIds(parent);

        // Check if ALL children are checked
        const allChildrenChecked = childrenIds.every((id) =>
          newChecked.has(id)
        );

        // Update parent based on children state
        if (allChildrenChecked) {
          newChecked.add(parent.id);
        } else {
          newChecked.delete(parent.id);
        }

        // Recursively update parent's parent (grandparent, etc.)
        updateParents(parent, data);
      }
    };

    // Start the upward propagation
    updateParents(item, fileData);

    return newChecked;
  });
};

/**
 * HELPER FUNCTIONS
 */

// Get all descendant IDs (not including the item itself)
const getChildrenIds = (item) => {
  if (!item.children) return [];

  const ids = [];
  const traverse = (child) => {
    ids.push(child.id);
    if (child.children) {
      child.children.forEach(traverse);
    }
  };

  item.children.forEach(traverse);
  return ids;
};

/**
 * RENDERING LOGIC
 * Calculate visual states for each checkbox
 */
const CheckboxItem = ({ item, level = 0 }) => {
  // Basic checked state
  const isChecked = checkedItems.has(item.id);

  // Calculate indeterminate state for parents
  const childrenIds = getChildrenIds(item);
  const checkedChildren = childrenIds.filter((id) => checkedItems.has(id));

  const hasChildren = childrenIds.length > 0;
  const allChildrenChecked =
    hasChildren && checkedChildren.length === childrenIds.length;
  const someChildrenChecked = checkedChildren.length > 0;

  // Indeterminate = some but not all children checked
  const isIndeterminate =
    hasChildren && someChildrenChecked && !allChildrenChecked;

  return (
    <div>
      <input
        type='checkbox'
        checked={isChecked}
        ref={(input) => {
          if (input) input.indeterminate = isIndeterminate;
        }}
        onChange={(e) => handleCheck(item, e.target.checked)}
      />
      {/* Recursively render children */}
      {item.children?.map((child) => (
        <CheckboxItem key={child.id} item={child} level={level + 1} />
      ))}
    </div>
  );
};

/**
 * INTERVIEW TIPS:
 *
 * 1. Start with the simplest state (Set of IDs)
 * 2. Break the problem into two steps: down & up propagation
 * 3. Use clear helper functions (getChildrenIds, findParent)
 * 4. Handle the indeterminate state last (it's just UI)
 *
 * TIME BREAKDOWN (30 mins):
 * - 5 mins: Understand requirements & plan approach
 * - 10 mins: Implement core handleCheck logic
 * - 5 mins: Write helper functions
 * - 5 mins: Implement rendering & indeterminate state
 * - 5 mins: Test & debug
 *
 * COMPLEXITY:
 * - Time: O(n) for each checkbox click (traverse tree)
 * - Space: O(n) for storing checked IDs
 *
 * POSSIBLE OPTIMIZATIONS (mention if time):
 * - Cache parent relationships to avoid findParent traversal
 * - Use memoization for expensive calculations
 * - But for interview, focus on working solution first!
 */
