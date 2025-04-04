import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link to="/" className="text-lg font-bold">
        MERN Blog
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <Link to="/create" className="mr-4">
              Create Post
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                window.location.href = "/login";
              }}
              className=" cursor-pointer bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register" className="bg-blue-500 px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
