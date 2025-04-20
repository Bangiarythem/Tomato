import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-md z-50">
      <form className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 w-[90%] max-w-md relative space-y-6 transition-all duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-amber-700">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="password"
            placeholder="Password..."
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start text-sm text-gray-600 gap-2">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the{" "}
            <span className="text-amber-700 underline cursor-pointer">
              Terms of Use & Privacy Policy
            </span>.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition duration-200 font-semibold"
        >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle */}
        <p className="text-sm text-center text-gray-600">
          {currState === "Sign Up" ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setCurrState(currState === "Sign Up" ? "Login" : "Sign Up")}
            className="ml-2 text-amber-600 font-medium cursor-pointer hover:underline"
          >
            {currState === "Sign Up" ? "Login here" : "Sign up here"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
