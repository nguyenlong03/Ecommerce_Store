import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Custom hook to scroll to top when route changes
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
};

// Utility function for manual scroll to top
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export default useScrollToTop;
