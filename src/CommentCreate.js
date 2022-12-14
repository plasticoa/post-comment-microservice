import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content })

        setContent('');
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)}
                        className='form-control'></input>
                </div>
                <Button variant="primary" type="submit">Submit</Button>
            </form>
        </div>
    )
}
export default CommentCreate;