import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../utils/Firebase";

const SignUP = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8030/api/signup", formData);
      
      setMessage(res.data.message || "User registered successfully! ✅");
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.dispatchEvent(new Event("storage"));
      }

      setFormData({ name: "", email: "", password: "" }); 
      
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message); 
      } else {
        setMessage("Something went wrong. Try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;

      const res = await axios.post("http://localhost:8030/api/google-signup", {
        name: user.displayName,
        email: user.email,
      });

      setMessage(res.data.message || "Signup/Login successful ✅");

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.dispatchEvent(new Event("storage"));
      }

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      setMessage("Google signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      {/* CARD */}
      <div className="w-full max-w-md bg-[#111111] p-8 rounded-2xl shadow-2xl border border-[#C19A6B]/40">

        <h2 className="text-2xl font-bold text-center mb-2 text-[#C19A6B]">
          Registration Page
        </h2>

        <p className="text-center text-gray-400 mb-6">
          Welcome to Trylo, Place your order
        </p>

        {/* Google Signup */}
        <button
          onClick={googleSignup}
          className="w-full flex items-center justify-center gap-2 bg-black hover:bg-[#C19A6B]/20 text-white font-medium py-2 px-4 rounded-lg border border-[#C19A6B]/50 transition duration-200"
        >
          <FcGoogle size={20} />
          Registration with Google
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-[#C19A6B]/40"></div>
          <span className="mx-3 text-[#C19A6B]">OR</span>
          <div className="flex-grow border-t border-[#C19A6B]/40"></div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <input
              name="name"
              type="text"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black border border-[#C19A6B]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C19A6B] text-white"
            />
          </div>

          <div className="mb-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black border border-[#C19A6B]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C19A6B] text-white"
            />
          </div>

          <div className="mb-6">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black border border-[#C19A6B]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C19A6B] text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C19A6B] hover:bg-[#a87f53] text-black font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* MESSAGE */}
        {message && (
          <p className="mt-4 text-center text-sm text-[#C19A6B] font-medium">
            {message}
          </p>
        )}

        {/* LOGIN */}
        <p className="mt-6 text-center text-sm text-gray-400">
          You have any account?{" "}
          <Link to="/login" className="text-[#C19A6B] hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUP;