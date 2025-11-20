import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={scrollToTop}
        className="relative w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer group"
        aria-label="Scroll to top"
      >
        {/* Animated ring */}
        <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-75"></span>
        <span className="absolute inset-0 rounded-full border-2 border-white/20"></span>
        
        {/* Icon */}
        <ArrowUp className="w-5 h-5 relative z-10 group-hover:translate-y-[-2px] transition-transform" />
      </button>
    </div>
  );
}
