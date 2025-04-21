import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { FaBars, FaTimes, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ setShowLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  
  const location = useLocation();
  const { cartItems, getTotalCartAmount } = useContext(StoreContext);
  
  const cartItemCount = Object.values(cartItems || {}).reduce((sum, quantity) => sum + quantity, 0);

  const navItems = [
    { name: "home", path: "/", icon: "🏠" },
    { name: "menu", path: "/#menu", icon: "🍔" },
    { name: "mobile-app", path: "/#mobile-app", icon: "📱" },
    { name: "contact-us", path: "/#contact-us", icon: "📞" },
  ];

  // Update active menu based on location and handle scroll events
  useEffect(() => {
    const currentPath = location.hash ? location.hash.substring(1) : location.pathname === "/" ? "home" : "";
    if (currentPath) {
      setActiveMenu(currentPath);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  // Close mobile menu when window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const handleMenuClick = (item) => {
    setActiveMenu(item.name);
    setMenuOpen(false);

    // Only need to scroll if it's a hash link
    if (item.path.includes('#')) {
      const sectionId = item.path.split('#')[1];
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
    // Reset search state
    setSearchQuery("");
    setSearchOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "py-3 bg-white shadow-lg" : "py-5 bg-white/95"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="relative z-50"
          onClick={() => setActiveMenu("home")}
        >
          <motion.img 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-[150px]" 
            src={assets.logo} 
            alt="Tomato Logo" 
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-lg">
          {navItems.map((item) => (
            <motion.li key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={item.path}
                onClick={() => handleMenuClick(item)}
                className={`capitalize font-medium transition-all duration-200 hover:text-amber-600 flex items-center gap-1 ${
                  activeMenu === item.name
                    ? "text-amber-700 border-b-2 border-amber-500"
                    : "text-gray-700"
                }`}
              >
                <span className="hidden lg:inline text-sm">{item.icon}</span>
                <span>{item.name.replace(/-/g, " ")}</span>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search Button & Form */}
          <AnimatePresence>
            {searchOpen ? (
              <motion.form 
                initial={{ width: 40, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 40, opacity: 0 }}
                className="relative"
                onSubmit={handleSearch}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600"
                >
                  <FaSearch />
                </button>
              </motion.form>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(true)} 
                className="text-gray-700 hover:text-amber-600 transition-colors"
                aria-label="Search"
              >
                <FaSearch size={18} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Cart Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
            <Link to="/cart" className="text-gray-700 hover:text-amber-600 transition-colors">
              <FaShoppingCart size={20} />
              {cartItemCount > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                >
                  {cartItemCount}
                </motion.div>
              )}
            </Link>
          </motion.div>

          {/* Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgb(254 215 170)" }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-amber-600 text-amber-700 py-2 px-6 rounded-full font-semibold transition-all flex items-center gap-2 hover:shadow-md"
            onClick={() => setShowLogin(true)}
          >
            <FaUser size={14} />
            <span>Sign In</span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)} 
          className="md:hidden text-2xl text-amber-700 z-50"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-50 shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="p-5 border-b border-gray-200">
                <img className="w-[120px]" src={assets.logo} alt="Tomato Logo" />
              </div>
              
              {/* Mobile Menu Items */}
              <div className="flex-1 overflow-y-auto p-5">
                <div className="space-y-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => handleMenuClick(item)}
                      className={`flex items-center gap-3 text-lg capitalize transition-all duration-200 ${
                        activeMenu === item.name
                          ? "text-amber-700 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="w-6 h-6 flex items-center justify-center text-lg">
                        {item.icon}
                      </span>
                      <span>{item.name.replace(/-/g, " ")}</span>
                    </Link>
                  ))}
                </div>
                
                {/* Mobile Search Form */}
                <form onSubmit={handleSearch} className="mt-8 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600"
                  >
                    <FaSearch />
                  </button>
                </form>
              </div>
              
              {/* Mobile Menu Footer */}
              <div className="p-5 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Link 
                    to="/cart" 
                    className="flex items-center gap-2 text-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="relative">
                      <FaShoppingCart size={20} />
                      {cartItemCount > 0 && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {cartItemCount}
                        </div>
                      )}
                    </div>
                    <span>Cart</span>
                  </Link>
                  
                  <span className="text-amber-700 font-semibold">
                    ${getTotalCartAmount().toFixed(2)}
                  </span>
                </div>
                
                <button
                  className="w-full border-2 border-amber-600 text-amber-700 py-2 rounded-full font-semibold hover:bg-orange-100 transition-colors"
                  onClick={() => {
                    setShowLogin(true);
                    setMenuOpen(false);
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;