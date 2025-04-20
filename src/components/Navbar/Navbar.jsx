import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

function Navbar({ setShowLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");

  const { getTotalCartAmount } = useContext(StoreContext);

  const navItems = [
    { name: "home", path: "/" },
    { name: "menu", path: "/#menu" },
    { name: "mobile-app", path: "/#mobile-app" },
    { name: "contact-us", path: "/#contact-us" },
  ];

  const handleMenuClick = (item) => {
    setActiveMenu(item.name);
    setMenuOpen(false);

    const section = document.getElementById(item.name);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky top-0 p-5 flex justify-between items-center bg-white shadow-md z-50">
      <Link to="/">
        <img className="w-[150px]" src={assets.logo} alt="Tomato Logo" />
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-5 text-lg text-amber-600">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              onClick={() => handleMenuClick(item)}
              className={`capitalize cursor-pointer ${
                activeMenu === item.name
                  ? "border-b-2 border-amber-700"
                  : "hover:border-b-2 hover:border-amber-500"
              }`}
            >
              {item.name.replace("-", " ")}
            </Link>
          </li>
        ))}
      </ul>


      <div className="hidden md:flex items-center gap-6">
        <img className="w-5 h-5" src={assets.search_icon} alt="Search" />
        <div className="relative">
          <Link to="/cart">
            <img className="w-6 h-6" src={assets.basket_icon} alt="Cart" />
          </Link>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
        </div>
        <button
          className="border border-amber-700 py-2 px-6 rounded-full hover:bg-orange-200 font-semibold"
          onClick={() => setShowLogin(true)}
        >
          Sign In
        </button>
      </div>

      <div className="md:hidden flex items-center z-50">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>


      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center justify-center gap-6 text-lg text-amber-700 transition-all duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => handleMenuClick(item)}
            className={`capitalize cursor-pointer transition-all duration-200 ${
              activeMenu === item.name
                ? "font-bold border-b-2 border-amber-700"
                : "hover:text-amber-800"
            }`}
          >
            {item.name.replace("-", " ")}
          </Link>
        ))}

        <div className="flex gap-4 items-center mt-4">
          <img className="w-5 h-5" src={assets.search_icon} alt="Search" />
          <div className="relative">
            <Link to="/cart">
              <img className="w-6 h-6" src={assets.basket_icon} alt="Cart" />
            </Link>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full">{getTotalCartAmount()===0?"":"dot"}</div>
          </div>
        </div>

        <button
          className="mt-4 border border-amber-700 py-2 px-6 rounded-full hover:bg-orange-200 font-semibold"
          onClick={() => setShowLogin(true)}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Navbar;
