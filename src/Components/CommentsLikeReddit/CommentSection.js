import React, { useState } from 'react';
import CommentList from './CommentList';
import commentsData from './CommentsData.json'; // Assuming you have a commentsData.js file
import AddCommentForm from './AddCommentForm';

const CommentSection = () => {
    const [comments, setComments] = useState(commentsData);

    const addComment = (text, parentId) => {
        const newComment = {
            id: Date.now(), // Simple unique ID generation
            text,
            replies: []
        };

        if (parentId) {
            const addReply = (comments) => {
                return comments.map(comment => {
                    if (comment.id === parentId) {
                        return { ...comment, replies: [...comment.replies, newComment] };
                    }
                    if (comment.replies.length > 0) {
                        return { ...comment, replies: addReply(comment.replies) };
                    }
                    return comment;
                });
            };
            setComments(addReply(comments));
        } else {
            setComments([...comments, newComment]);
        }
    };

    const updateComment = (id, newText) => {
        const updateCommentText = (comments) => {
            return comments.map(comment => {
                if (comment.id === id) {
                    return { ...comment, text: newText };
                }
                if (comment.replies.length > 0) {
                    return { ...comment, replies: updateCommentText(comment.replies) };
                }
                return comment;
            });
        };

        setComments(updateCommentText(comments));
    };

    return (
        <div>
            <h2>Comments</h2>
            <AddCommentForm onAddComment={addComment} />
            <CommentList comments={comments} onAddComment={addComment} setComments={setComments} updateComment={updateComment} />
        </div>
    );
};

export default CommentSection;