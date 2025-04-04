import { useState } from "react";
import axios from "axios";

const PostForm = ({ onSuccess, post = {} }) => {
  const [formData, setFormData] = useState({
    title: post.title || "",
    content: post.content || "",
    image: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.image) data.append("image", formData.image);

    try {
      const token = localStorage.getItem("token");

      await axios.post("https://task-ba-khk7.onrender.com/api/posts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Post created successfully! ✅");
      setFormData({ title: "", content: "", image: null }); // Clear fields
      onSuccess && onSuccess();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong ");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto space-y-4"
    >
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleChange}
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
        Submit
      </button>

      {/* ✅ Message below the form */}
      {message && (
        <p className="text-center mt-4 font-medium text-green-600">{message}</p>
      )}
    </form>
  );
};

export default PostForm;
