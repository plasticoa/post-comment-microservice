import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
    const [post, setPost] = useState({});
    const fetchPosts = async () => {
        // send a get request to the posts service
        const res = await axios.get('http://localhost:4000/posts');
        // set the posts state with the response data
        setPost(res.data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);
    console.log(post);
    // render the posts as a list of li elements 
    const renderPosts = Object.values(post).map(post => {
        return (
            <div className='card' key={post.id}>
                <div className='card-body'>
                    <h3>{post.tittle}</h3>
                    <CommentList postId={post.id}></CommentList>
                    <CommentCreate postId={post.id}></CommentCreate>
                </div>
            </div>
        )
    });

    return (
        <div>
            Post List
            {renderPosts}
        </div>
    );
}
export default PostList;