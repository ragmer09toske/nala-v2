import React, { useState, useEffect } from 'react';

const BlinkingCaret = ({ interval = 500 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible((prevVisible) => !prevVisible);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval]);

  return <span style={{ opacity: visible ? 1 : 0 }}>|</span>;
};

export default BlinkingCaret;
