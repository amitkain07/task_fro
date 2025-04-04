import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 Add this

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://task-ba-khk7.onrender.com/api/login", formData);
      console.log("Login response:", res); // 👈 This shows the full structure
  
      // Optional: log specific fields to debug
      console.log("Token:", res.data.token);
      console.log("User:", res.data.user);
  
      // Check if response includes token and user ID
      if (res.data.token && res.data.user && res.data.user._id) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        setMessage("Login successful!");
        navigate("/");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

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

        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 cursor-pointer">
          Sign In
        </button>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
