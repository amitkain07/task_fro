import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Delete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const deletePost = async () => {
      const confirmed = window.confirm("Are you sure you want to delete this post?");
      if (!confirmed) {
        navigate(`/posts/${id}`);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to delete a post.");
          return;
        }

        await axios.delete(`https://task-ba-khk7.onrender.com/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessage("Post deleted successfully!");
        setTimeout(() => navigate("/"), 1500);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Delete failed.");
      }
    };

    deletePost();
  }, [id, navigate]);

  return (
    <div className="text-center py-10">
      {message && <p className="text-green-600 text-lg font-medium">{message}</p>}
      {error && <p className="text-red-600 text-lg font-medium">{error}</p>}
    </div>
  );
};

export default Delete;
