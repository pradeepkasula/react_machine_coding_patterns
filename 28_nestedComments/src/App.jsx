import { useState } from 'react';
import Comment from './components/Comment';
import useNode from './hooks/useNode';
import './App.css';

// Initial structure: 1 root node, no items (replies) yet
const comments = {
  id: 1,
  items: [],
};

const App = () => {
  // State to store the entire comment tree
  const [commentsData, setCommentsData] = useState(comments);

  // Hook providing utility methods to manipulate the tree
  const { insertNode, editNode, deleteNode } = useNode();

  // Add a new comment/reply
  const handleInsertNode = (commentId, item) => {
    const finalStructure = insertNode(commentsData, commentId, item);
    setCommentsData(finalStructure); // Update state
  };

  // Edit an existing comment
  const handleEditNode = (commentId, value) => {
    const finalStructure = editNode(commentsData, commentId, value);
    setCommentsData(finalStructure);
  };

  // Delete a comment
  const handleDeleteNode = (commentId) => {
    const finalStructure = deleteNode(commentsData, commentId);
    setCommentsData({ ...finalStructure }); // Spread to trigger re-render
  };

  return (
    <div className='App'>
      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData} // Pass the root comment node
      />
    </div>
  );
};

export default App;
