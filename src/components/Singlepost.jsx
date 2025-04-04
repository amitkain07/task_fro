import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  const fetchPost = async () => {
    try {
      const res = await axios.get(`https://task-ba-khk7.onrender.com/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      setError("Failed to load post.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://task-ba-khk7.onrender.com/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Delete failed.");
    }
  };

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="text-center py-10 text-gray-600">
        {error || "Loading..."}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.content}</p>

      {post.image && (
        <img
          src={`https://task-ba-khk7.onrender.com${post.image}`}
          alt="Post"
          className="rounded mb-6 max-h-96 object-cover w-full"
        />
      )}

      <div className="flex gap-4">
        <Link
          to={`/edit/${post._id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default SinglePost;
