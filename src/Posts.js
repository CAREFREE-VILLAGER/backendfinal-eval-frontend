import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    device: ''
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://final-eval-backend.onrender.com/posts/posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);
  

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://final-eval-backend.onrender.com/posts/posts', newPost, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const response = await axios.get('https://final-eval-backend.onrender.com/posts/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(response.data);
      
      setNewPost({ title: '', body: '', device: '' });
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://final-eval-backend.onrender.com/posts/posts/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
     
      const response = await axios.get('https://final-eval-backend.onrender.com/posts/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  return (
    <div>
      <h2>Posts</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={newPost.title} onChange={handleChange} />
        </div>
        <div>
          <label>Body:</label>
          <input type="text" name="body" value={newPost.body} onChange={handleChange} />
        </div>
        <div>
          <label>Device:</label>
          <input type="text" name="device" value={newPost.device} onChange={handleChange} />
        </div>
        <button type="submit">Add Post</button>
      </form>
      {posts.map(post => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p>Device: {post.device}</p>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Posts;
