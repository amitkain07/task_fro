import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://task-ba-khk7.onrender.com/api/register", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-md"
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 cursor-pointer">
          Sign Up
        </button>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

      <Link className="cursor-pointer text-green-600 border-b-2 " to='/login'>Login Here</Link>
      </form>
    </div>
  );
};

export default Register;
