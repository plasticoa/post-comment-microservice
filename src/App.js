import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
    return (
        <div className='container'>
            <h2>Blog APP</h2>
            <h1>Create Post</h1>
            <PostCreate />
            <hr />
            <h1>Posts</h1>
            <PostList />
        </div>
    );
}
export default App;