import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";


const Fotter = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Left Section - Brand */}
        <div>
          <h2 className="text-2xl font-bold text-purple-400">Cloudio</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Elevate your digital experience with us.
          </p>
        </div>

        {/* Center Section - Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-300 space-y-2">
            <li><a href="/" className="hover:text-purple-400 transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-purple-400 transition-colors">About</a></li>
            <li><a href="/services" className="hover:text-purple-400 transition-colors">Services</a></li>
            <li><a href="/contact" className="hover:text-purple-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Right Section - Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-purple-500 transition-all">
              <FaFacebookF className="text-white" />
            </a>
            <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-purple-500 transition-all">
              <FaTwitter className="text-white" />
            </a>
            <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-purple-500 transition-all">
              <FaInstagram className="text-white" />
            </a>
            <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-purple-500 transition-all">
              <FaLinkedinIn className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-700 pt-4">
        <p>Copyright &copy; 2024 Cloudio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Fotter;