import React from 'react';

const CommentList = ({ comments }) => {
    const renderComment = comments.map((comment) => {
        let content;
        if (comment.status === 'approved') {
            content = comment.content;
        }
        if (comment.status === 'rejected') {
            content = 'This comment has been rejected';
        }
        if (comment.status === 'pending') {
            content = 'This comment is awaiting moderation';
        }
        return <li key={comment.id}>{content}</li>
    });

    return (
        <div>
            <ul>{renderComment}</ul>
        </div>
    );
}
export default CommentList;