import React from 'react';
import Comment from './Comment';
import './style.css';

const CommentList = ({ comments, onAddComment, setComments, updateComment }) => {
    return (
        <div className="nested">
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} onAddComment={onAddComment} setComments={setComments} updateComment={updateComment} />
            ))}
        </div>
    );
};

export default CommentList;