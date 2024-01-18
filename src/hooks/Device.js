import { useState, useEffect } from 'react';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768); // Adjust the threshold as needed
  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768); // Adjust the threshold as needed
    }
    window.addEventListener('resize', handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return isDesktop;
}

export default useIsDesktop;
