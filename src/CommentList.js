import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ comments }) => {
    const renderComment = comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>
    });

    return (
        <div>
            <ul>{renderComment}</ul>
        </div>
    );
}
export default CommentList;