import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

import API from "../api/axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post(
        "/auth/login",
        formData
      );

      login(data);

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-gray-300 mt-2">
            Login to manage your tasks
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <div className="flex items-center bg-white/20 border border-white/20 rounded-xl px-4">
             
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none px-3 py-4 text-white placeholder-gray-300"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <div className="flex items-center bg-white/20 border border-white/20 rounded-xl px-4">
             
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none px-3 py-4 text-white placeholder-gray-300"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:scale-[1.02] transition duration-300"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        
        <p className="text-center text-gray-300 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-white font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

