import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import BlinkingCaret from './blinking-caret';
import emblem from "../../assets/images/amblem.png"
import typo from "../../assets/images/typo.png"

const TypingAnimation = ({ onComplete }) => {
  const [typedText, setTypedText] = useState('');
  const [resultCompleted, setResultCompleted] = useState(false); // Track if the typing animation is completed
  const result = "Hey, I'm Nucleus, and I'm here to assist you in getting started with Nala. Firstly, Nala only exists as an app, but you can also access it via web browsers. However, please make sure to use a phone, not a desktop. Our team of developers is working diligently to make Nala available on desktops too. Additionally, the app adjacent to me simulates the real Nala app, allowing you to use it as if you are using the real app on your mobile.";
  const loading = false;

  useEffect(() => {
    let charIndex = 0;
    let typingTimer;

    function typeText() {
      if (charIndex <= result.length) {
        setTypedText(result.slice(0, charIndex));
        charIndex++;
        typingTimer = setTimeout(typeText, typingSpeed);
      } else {
        if (!resultCompleted) {
          setResultCompleted(true); // Mark typing animation as completed
          if (onComplete) {
            onComplete();
          }
        }
      }
    }

    if (!loading && !resultCompleted) {
      charIndex = 0;
      setTypedText('');
      typingTimer = setTimeout(typeText, 0);
    } else {
      clearTimeout(typingTimer);
    }

    return () => {
      clearTimeout(typingTimer);
    };
  }, [loading, onComplete, resultCompleted]);

  const typingSpeed = 50;

  return (
    <Box>
        <Box sx={{
            mt: -4,
            pb:5
        }}>
        <img
            src={typo}
            alt="ionman"
            width={150}
        />
        </Box>
        <Box sx={{
            display: "flex",
            gap: 2
        }}>
        <Box>
            <div className="nu-avatar-small">
                <img
                src={emblem}
                alt="ionman"
                className="avatar-image"
                />
            </div>
        </Box>
        <Box sx={{
            background: "white",
            p:2,
            borderRadius: 5
        }}>
            <h4 className='Handjet' >
                <span style={{fontSize: 17, lineHeight:-10}}>{typedText} </span><span><BlinkingCaret /></span>
            </h4>
        </Box>
        </Box>
    </Box>
  );
};

export default TypingAnimation;