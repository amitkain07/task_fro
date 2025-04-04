import React from 'react'
import PostListWithActions from './Showpost';

const Home = () => {
  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold">Welcome to the MERN Blog</h1>
      <p className="text-gray-600 mt-2">A simple blogging platform built with MERN stack.</p>
      <PostListWithActions/>
    </div>
  );
};

export default Home;