import React, { useState } from 'react';

const AddCommentForm = ({ parentId, onAddComment }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAddComment(text, parentId);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddCommentForm;