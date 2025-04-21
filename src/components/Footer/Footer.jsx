import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight } from "react-icons/fa";

const Footer = () => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  // Company links with paths
  const companyLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Menu", path: "/#menu" },
    { name: "Delivery", path: "/delivery" },
    { name: "Privacy Policy", path: "/privacy" },
  ];
  
  // Social media links
  const socialMedia = [
    { icon: assets.facebook_icon, name: "Facebook", url: "https://facebook.com" },
    { icon: assets.twitter_icon, name: "Twitter", url: "https://twitter.com" },
    { icon: assets.linkedin_icon, name: "LinkedIn", url: "https://linkedin.com" },
    { icon: assets.instagram_icon || assets.facebook_icon, name: "Instagram", url: "https://instagram.com" },
  ];

  // Newsletter form submission handler
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log("Newsletter subscription for:", email);
    // Reset form field
    e.target.reset();
    // Show success message (in a real app)
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8 mt-24 relative" id="contact-us">
      {/* Decorative wave shape at the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden h-12 -translate-y-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-20 w-full text-gray-900">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/">
              <img src={assets.logo} alt="Tomato Logo" className="w-36 bg-white p-2 rounded-lg" />
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Choose from a diverse menu featuring a delectable array of dishes
              crafted with the finest ingredients and culinary expertise. Our
              mission is to satisfy your cravings and elevate your dining
              experience, one delicious meal at a time.
            </p>
            <div className="flex gap-4 pt-2">
              {socialMedia.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                  className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-all transform hover:scale-110 hover:rotate-6"
                >
                  <img src={social.icon} alt={social.name} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white border-b-2 border-orange-500 pb-2 inline-block">
              Company
            </h2>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name} className="transition-transform hover:translate-x-2">
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-orange-400 flex items-center gap-2"
                  >
                    <FaArrowRight className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" size={10} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white border-b-2 border-orange-500 pb-2 inline-block">
              Contact Us
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <FaPhoneAlt className="mt-1 text-orange-500 group-hover:scale-125 transition-transform" />
                <div>
                  <p className="text-gray-300 group-hover:text-white transition-colors">Call Us</p>
                  <a href="tel:+12122321232" className="text-white font-medium hover:text-orange-400">+1-212-232-1232</a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <FaEnvelope className="mt-1 text-orange-500 group-hover:scale-125 transition-transform" />
                <div>
                  <p className="text-gray-300 group-hover:text-white transition-colors">Email Us</p>
                  <a href="mailto:contact@tomato.com" className="text-white font-medium hover:text-orange-400">contact@tomato.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <FaMapMarkerAlt className="mt-1 text-orange-500 group-hover:scale-125 transition-transform" />
                <div>
                  <p className="text-gray-300 group-hover:text-white transition-colors">Location</p>
                  <address className="text-white font-medium not-italic">123 Food Street, NYC</address>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <FaClock className="mt-1 text-orange-500 group-hover:scale-125 transition-transform" />
                <div>
                  <p className="text-gray-300 group-hover:text-white transition-colors">Opening Hours</p>
                  <p className="text-white font-medium">Mon-Sun: 10:00 - 22:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white border-b-2 border-orange-500 pb-2 inline-block">
              Newsletter
            </h2>
            <p className="text-gray-300">
              Subscribe to our newsletter for special deals and latest updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="pt-2">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full py-3 px-4 pr-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 text-sm"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-md transition-colors"
                  aria-label="Subscribe"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </form>

            {/* App badges */}
            <div className="pt-4">
              <p className="text-gray-300 mb-3">Get our mobile app:</p>
              <div className="flex gap-3">
                <a href="#" className="transform hover:scale-105 transition-transform">
                  <img src={assets.app_store} alt="App Store" className="h-10 rounded-md" />
                </a>
                <a href="#" className="transform hover:scale-105 transition-transform">
                  <img src={assets.play_store} alt="Google Play" className="h-10 rounded-md" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-gray-400 text-sm">
              Copyright © {currentYear} <span className="text-orange-500">Tomato.com</span> — All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>

          {/* Back to top button */}
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gray-800 hover:bg-orange-600 p-3 rounded-full transition-colors"
              aria-label="Back to top"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;