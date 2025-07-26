import { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-blue-900/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/classement" className="cursor-pointer">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 animate-pulse">
                � D'oh! Studios 🍺
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {['Donuts', 'Duff', 'Nuclear', 'Kwik-E-Mart'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-yellow-300 hover:text-yellow-400 transition-colors duration-200 text-sm uppercase tracking-wider font-medium transform hover:rotate-3"
              >
                {item} �
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <button className="
              px-4 py-2 
              text-sm font-bold
              text-blue-900
              bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300
              rounded-full 
              hover:shadow-lg hover:shadow-yellow-500/50 
              transition-all duration-300
              transform hover:scale-105 hover:rotate-3
              animate-bounce
            ">
              � Mmm... Donuts! 🍺
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
