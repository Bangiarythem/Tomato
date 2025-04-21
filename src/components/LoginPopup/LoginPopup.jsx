import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    remember: false,
    termsAccepted: false
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Validate name for signup
    if (currState === "Sign Up" && !formData.name) {
      newErrors.name = 'Name is required';
    }
    
    // Validate terms for signup
    if (currState === "Sign Up" && !formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the Terms of Use & Privacy Policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowLogin(false);
        // Here you would typically handle the authentication logic
      }, 1500);
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowLogin(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setShowLogin]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={(e) => e.target === e.currentTarget && setShowLogin(false)}
      >
        <motion.div
          className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 w-[90%] max-w-md relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <motion.button
            className="absolute top-6 right-6 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowLogin(false)}
          >
            <img src={assets.cross_icon} alt="Close" className="w-5 h-5" />
          </motion.button>
          
          {/* Header with logo */}
          <div className="flex flex-col items-center mb-6 pt-2">
            <img src={assets.logo} alt="Tomato Logo" className="w-28 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">{currState}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {currState === "Sign Up" ? "Create an account to continue" : "Welcome back!"}
            </p>
          </div>
          
          {/* Social login buttons */}
          <div className="flex gap-3 mb-6">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-sm">Google</span>
            </motion.button>
            
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
              </svg>
              <span className="text-sm">Facebook</span>
            </motion.button>
          </div>
          
          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (only for signup) */}
            <AnimatePresence mode="wait">
              {currState === "Sign Up" && (
                <motion.div
                  key="name-field"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Email field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            
            {/* Password field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            
            {/* Remember me (only for login) */}
            <AnimatePresence mode="wait">
              {currState === "Login" && (
                <motion.div
                  key="remember-me"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        checked={formData.remember}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-500 rounded focus:ring-orange-500"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
                    </div>
                    <a href="#" className="text-sm text-orange-600 hover:text-orange-500">Forgot password?</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Terms checkbox (only for signup) */}
            <AnimatePresence mode="wait">
              {currState === "Sign Up" && (
                <motion.div
                  key="terms"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      id="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className={`h-4 w-4 mt-1 ${errors.termsAccepted ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500`}
                    />
                    <div>
                      <label htmlFor="termsAccepted" className="text-sm text-gray-600">
                        By continuing, I agree to the{" "}
                        <span className="text-orange-600 underline cursor-pointer hover:text-orange-500">
                          Terms of Use & Privacy Policy
                        </span>.
                      </label>
                      {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted}</p>}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition duration-200 font-medium shadow-md flex justify-center items-center"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : currState === "Sign Up" ? "Create Account" : "Login"}
            </motion.button>
          </form>
          
          {/* Toggle between Login and Signup */}
          <p className="text-sm text-center text-gray-600 mt-6">
            {currState === "Sign Up" ? "Already have an account?" : "Don't have an account?"}
            <motion.span
              onClick={() => {
                setCurrState(currState === "Sign Up" ? "Login" : "Sign Up");
                setErrors({});
              }}
              className="ml-1 text-orange-600 font-medium cursor-pointer hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currState === "Sign Up" ? "Login here" : "Sign up here"}
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginPopup;