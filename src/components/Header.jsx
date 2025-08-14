import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };


  
  const navLinks = ["Home", "Services", "Projects", "Why Agasa", "Events", "Blogs", "Contact Us"];

  return (
    <header className="bg-white shadow-md px-6 py-8 flex items-center justify-between sticky top-0 z-50">
      
      <div className="text-2xl font-bold text-gray-800">Logo</div>

    
      <nav className="hidden md:flex gap-6 text-gray-700  font-medium md:text-[14px] md:gap-2 lg:text-lg lg:gap-4 text-base">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="hover:text-blue-600 transition duration-200"
          >
            {link}
          </a>
        ))}
      </nav>

      
      <div className="hidden md:block">
        <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-200">
          Book Free Consulting
        </button>
      </div>

      
      <div className="md:hidden">
        <button onClick={handleToggle}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

     
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden z-40">
          <nav className="flex flex-col items-start gap-4 p-6 text-gray-800">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="w-full block border-b pb-2 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-black text-white px-4 py-2 rounded-full w-full text-center"
            >
              Book Free Consulting
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
