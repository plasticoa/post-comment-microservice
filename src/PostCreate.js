import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const PostCreate = () => {
    const [tittle, setTitle] = useState('');

    const onSubmit = async (event) => {
        // prevent the browser from refreshing
        event.preventDefault();
        // send a post request to the posts service
        await axios.post('http://localhost:4000/posts', { tittle });
        // clear the input field after the post request
        setTitle('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={tittle} onChange={e => setTitle(e.target.value)} className="form-control" />
                </div>
                <Button variant="primary" type="submit">Submit</Button>
            </form>
        </div>
    );
}
export default PostCreate;