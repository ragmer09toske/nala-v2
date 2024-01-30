import React, { useEffect, useState } from 'react';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css'; // Import the default styles

const ProgressBarNala = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    // Simulate progress incrementation with a faster update interval (500 milliseconds)
    const interval = setInterval(() => {
        if (progress < 100) {
        setProgress(prevProgress => prevProgress + 90);
        }
    }, 500); // Update interval set to 500 milliseconds
    
    return () => clearInterval(interval);
  }, [progress]);
  return (
    <div>
      <ProgressBar percent={progress} spinner={false} autoIncrement={true} />
    </div>
  );
};

export default ProgressBarNala;
