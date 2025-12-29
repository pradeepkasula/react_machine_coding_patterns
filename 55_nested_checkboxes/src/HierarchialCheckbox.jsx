import React, { useState } from 'react';

const fileData = [
  {
    id: 1,
    name: 'Electronics',
    children: [
      {
        id: 2,
        name: 'Mobile phones',
        children: [
          { id: 3, name: 'iPhone' },
          { id: 4, name: 'Android' },
        ],
      },
      {
        id: 5,
        name: 'Laptops',
        children: [
          { id: 6, name: 'MacBook' },
          { id: 7, name: 'Surface Pro' },
        ],
      },
    ],
  },
  {
    id: 8,
    name: 'Books',
    children: [
      { id: 9, name: 'Fiction' },
      { id: 10, name: 'Non-fiction' },
    ],
  },
  { id: 11, name: 'Toys' },
];

const HierarchicalCheckbox = () => {
  // Simple state: Set of checked item IDs
  const [checkedItems, setCheckedItems] = useState(new Set());

  const handleCheck = (item, isChecked) => {
    setCheckedItems((prev) => {
      const newChecked = new Set(prev);

      // Step 1: Update descendants
      const updateItem = (item, shouldCheck) => {
        if (shouldCheck) {
          newChecked.add(item.id);
        } else {
          newChecked.delete(item.id);
        }
        if (item.children) {
          item.children.forEach((child) => updateItem(child, shouldCheck));
        }
      };
      updateItem(item, isChecked);

      // Step 2: Update ancestors
      const updateParents = (target, data) => {
        const findParent = (nodes, parent = null) => {
          for (let node of nodes) {
            if (node.id === target.id) {
              return parent;
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
          const childrenIds = getChildrenIds(parent);
          const allChildrenChecked = childrenIds.every((id) =>
            newChecked.has(id)
          );

          if (allChildrenChecked) {
            newChecked.add(parent.id);
          } else {
            newChecked.delete(parent.id);
          }

          // Recursively update further ancestors
          updateParents(parent, data);
        }
      };

      updateParents(item, fileData);

      return newChecked;
    });
  };

  // Helper: Get all descendant IDs
  const getChildrenIds = (item) => {
    if (!item.children) return [];
    const ids = [];
    const traverse = (child) => {
      ids.push(child.id);
      if (child.children) child.children.forEach(traverse);
    };
    item.children.forEach(traverse);
    return ids;
  };

  // Recursive component
  const CheckboxItem = ({ item, level = 0 }) => {
    const isChecked = checkedItems.has(item.id);
    const childrenIds = getChildrenIds(item);
    const checkedChildren = childrenIds.filter((id) => checkedItems.has(id));

    // Calculate indeterminate state
    const hasChildren = childrenIds.length > 0;
    const allChildrenChecked =
      hasChildren && checkedChildren.length === childrenIds.length;
    const someChildrenChecked = checkedChildren.length > 0;
    const isIndeterminate =
      hasChildren && someChildrenChecked && !allChildrenChecked;

    return (
      <div className={`checkbox-item level-${level}`}>
        <label className='checkbox-label'>
          <input
            type='checkbox'
            checked={isChecked}
            ref={(input) => {
              if (input) input.indeterminate = isIndeterminate;
            }}
            onChange={(e) => handleCheck(item, e.target.checked)}
          />
          <span className={item.children ? 'parent-name' : 'child-name'}>
            {item.name}
          </span>
        </label>
        {item.children?.map((child) => (
          <CheckboxItem key={child.id} item={child} level={level + 1} />
        ))}
      </div>
    );
  };

  return (
    <div className='container'>
      <h2>Hierarchical Checkboxes</h2>
      <div className='checkbox-tree'>
        {fileData.map((item) => (
          <CheckboxItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HierarchicalCheckbox;
