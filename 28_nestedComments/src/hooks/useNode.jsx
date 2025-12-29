const useNode = () => {
  // Recursively insert new comment
  const insertNode = (tree, commentId, item) => {
    if (tree.id === commentId) {
      // Found the parent node -> Add reply
      tree.items.push({
        id: new Date().getTime(), // Unique ID
        name: item, // Comment text
        items: [], // Replies (empty initially)
      });
      return tree;
    }

    // Otherwise, Recursively check in child nodes
    let latestNode = tree.items.map((ob) => {
      return insertNode(ob, commentId, item);
    });

    return { ...tree, items: latestNode };
  };

  // Recursively edit a comment
  const editNode = (tree, commentId, value) => {
    // If we found the node to edit
    if (tree.id === commentId) {
      tree.name = value; // Update comment text
      return tree;
    }
    // Otherwise, recursively search through the tree
    tree.items.map((ob) => {
      return editNode(ob, commentId, value);
    });

    return { ...tree };
  };

  // Recursively delete a comment
  const deleteNode = (tree, id) => {
    // Loop through items to find the node to delete
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        // Found it - remove from array
        tree.items.splice(i, 1); // Remove item
        return tree;
      } else {
        // Otherwise, recursively search
        deleteNode(currentItem, id); // Recurse deeper
      }
    }
    return tree;
  };

  return { insertNode, editNode, deleteNode };
};

export default useNode;
