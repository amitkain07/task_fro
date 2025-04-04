import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostListWithActions = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://task-ba-khk7.onrender.com/api/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Blog Posts</h2>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 line-clamp-2 mb-4">{post.content}</p>

            {post.image && (
              <img
                src={`https://task-ba-khk7.onrender.com${post.image}`}
                alt="Post"
                className="rounded mb-4 max-h-60 object-cover w-full"
              />
            )}

            <div className="flex">
              <Link
                to={`/posts/${post._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostListWithActions;
