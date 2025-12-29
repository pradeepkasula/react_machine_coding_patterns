import { useState, useRef, useEffect } from 'react';
import Action from './Action';
import DownArrow from '../assets/DownArrow.jsx';
import UpArrow from '../assets/UpArrow.jsx';

const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}) => {
  const [input, setInput] = useState(''); // New comment input
  const [editMode, setEditMode] = useState(false); // Is this comment being edited?
  const [showInput, setShowInput] = useState(false); // Show/hide input for reply
  const [expand, setExpand] = useState(false); // Expand replies
  const inputRef = useRef(null);

  // Autofocus on edit mode
  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand); // Toggle expansion
    setShowInput(true); // Show reply input
  };

  const onAddComment = () => {
    if (editMode) {
      // Edit mode validation
      const editedText = inputRef?.current?.innerText?.trim();

      if (!editedText) {
        alert('Please write something before saving!');
        return; // Exit function, don't proceed
      }

      handleEditNode(comment.id, editedText);
    } else {
      // Reply mode validation
      if (!input.trim()) {
        alert('Please write something to reply!');
        return; // Exit function, don't proceed
      }

      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput('');
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id); // Delete comment
  };

  return (
    <div>
      <div className={comment.id === 1 ? 'inputContainer' : 'commentContainer'}>
        {comment.id === 1 ? (
          <>
            {/* Initial input for root comment */}
            <input
              type='text'
              className='inputContainer__input first_input'
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='type...'
            />
            <Action
              className='reply comment'
              type='COMMENT'
              handleClick={onAddComment}
            />
          </>
        ) : (
          <>
            {/* Display comment text (editable if in edit mode) */}
            {/* Nested comments */}
            <span
              contentEditable={editMode} // Makes span editable when editMode is true
              suppressContentEditableWarning={editMode} // Suppresses React warning when editable
              ref={inputRef} // Reference to access the edited text
              style={{ wordWrap: 'break-word' }}
            >
              {comment.name}
            </span>

            <div style={{ display: 'flex', marginTop: '5px' }}>
              {editMode ? (
                <>
                  {/* Save or Cancel edit */}
                  <Action
                    className='reply'
                    type='SAVE'
                    handleClick={onAddComment}
                  />
                  <Action
                    className='reply'
                    type='CANCEL'
                    handleClick={() => {
                      // inputRef points to the <span> element where you edit the text.
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name; // Reset text
                      setEditMode(false); // Exit edit mode
                    }}
                  />
                </>
              ) : (
                <>
                  {/* Reply, Edit, Delete Actions */}
                  <Action
                    className='reply'
                    type={
                      <>
                        {expand ? (
                          <UpArrow width='10px' height='10px' />
                        ) : (
                          <DownArrow width='10px' height='10px' />
                        )}{' '}
                        REPLY
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <Action
                    className='reply'
                    type='EDIT'
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action
                    className='reply'
                    type='DELETE'
                    handleClick={handleDelete}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Show replies if expanded */}
      <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
        {showInput && (
          <div className='inputContainer'>
            {/* Input for reply */}
            <input
              type='text'
              className='inputContainer__input'
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action className='reply' type='REPLY' handleClick={onAddComment} />
            <Action
              className='reply'
              type='CANCEL'
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {/* Recursive rendering of replies */}
        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
