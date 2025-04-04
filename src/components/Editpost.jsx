import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://task-ba-khk7.onrender.com/api/posts/${id}`);
        setFormData({
          title: res.data.title,
          content: res.data.content,
          image: null, // Image will be uploaded again if changed
        });
      } catch (err) {
        console.error("Error fetching post:", err.message);
        setMessage("Failed to load post.");
      }
    };

    fetchPost();
  }, [id]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit updated post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();

    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await axios.put(`https://task-ba-khk7.onrender.com/api/posts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Post updated successfully!");

      // Redirect after short delay
      setTimeout(() => {
        navigate(`/posts/${id}`);
      }, 1000);
    } catch (err) {
      console.error("Update error:", err);
      setMessage(err.response?.data?.error || " Update failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          className="w-full p-3 border rounded h-32"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Post
        </button>

        {message && (
          <p className="text-center mt-4 text-green-600 font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default EditPost;
