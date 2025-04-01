import React, { useState } from 'react';
import CommentList from './CommentList';
import './style.css';

const Comment = ({ comment, onAddComment, setComments, updateComment }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.text);

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleDelete = () => {
        const deleteComment = (comments) => {
            return comments.filter(c => c.id !== comment.id)
                .map(c => ({
                    ...c,
                    replies: deleteComment(c.replies)
                }));
        };
    
        setComments(prevComments => deleteComment(prevComments));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        // Update comment text logic here
        updateComment(comment.id, editText);
        setIsEditing(false);
    };

    return (
        <div className="comment" style={{ marginLeft: '20px' }}>
            {isEditing ? (
                <form onSubmit={handleEditSubmit}>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <input type="submit" value="Save" />
                    <button type="button" onClick={handleEdit}>Cancel</button>
                </form>
            ) : (
                <>
                    <p>{comment.text}</p>
                    <button className="edit-button" onClick={handleEdit}>Edit</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    {comment.replies.length > 0 && (
                        <button className="reply-button" onClick={toggleReplies}>
                            {showReplies ? 'Hide Replies' : 'Show Replies' }
                        </button>
                    )}
                    {showReplies && (
                        <CommentList comments={comment.replies} onAddComment={onAddComment} updateComment={updateComment} />
                    )}
                </>
            )}
        </div>
    );
};

export default Comment;