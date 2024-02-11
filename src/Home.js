import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to our store!</p>
      <div>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/posts">
          <button>Posts</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
