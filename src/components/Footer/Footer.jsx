import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white px-6 py-12 mt-[100px]" id="contact-us">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <img src={assets.logo} alt="Logo" className="w-32" />
          <p className="text-sm leading-relaxed">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <div className="flex gap-4 mt-4">
            <img
              src={assets.facebook_icon}
              alt="Facebook"
              className="w-6 hover:scale-110 transition-transform "
            />
            <img
              src={assets.twitter_icon}
              alt="Twitter"
              className="w-6 hover:scale-110 transition-transform"
            />
            <img
              src={assets.linkedin_icon}
              alt="LinkedIn"
              className="w-6 hover:scale-110 transition-transform"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">COMPANY</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-500 cursor-pointer">Home</li>
            <li className="hover:text-orange-500 cursor-pointer">About Us</li>
            <li className="hover:text-orange-500 cursor-pointer">Delivery</li>
            <li className="hover:text-orange-500 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">GET IN TOUCH</h2>
          <ul className="space-y-2 text-sm">
            <li>📞 +1-212-232-1232</li>
            <li>📧 contact@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      <p className="text-center text-sm text-white">
        Copyright © 2025 Tomato.com — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
