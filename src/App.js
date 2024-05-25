import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure this import is present
import LoveLetter from './LoveLetter'; // Import the LoveLetter component

function App() {
  const [caption, setCaption] = useState('Dear Baby Anu-Ujin ->');
  const [displayedCaption, setDisplayedCaption] = useState('');
  const [captionLength, setCaptionLength] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isErasing, setIsErasing] = useState(false);
  const [showLoveLetter, setShowLoveLetter] = useState(false);

  useEffect(() => {
    let typingTimeout;
    let erasingTimeout;

    if (isTyping && captionLength <= caption.length) {
      typingTimeout = setTimeout(() => {
        setDisplayedCaption(caption.substr(0, captionLength));
        setCaptionLength(captionLength + 1);
      }, 50);
    } else if (isTyping) {
      setIsTyping(false);
      setCaptionLength(0);
    }

    if (isErasing && captionLength >= 0) {
      erasingTimeout = setTimeout(() => {
        setDisplayedCaption(caption.substr(0, captionLength));
        setCaptionLength(captionLength - 1);
      }, 50);
    } else if (isErasing) {
      setIsErasing(false);
      setCaptionLength(0);
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(erasingTimeout);
    };
  }, [caption, captionLength, isTyping, isErasing]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      const cursor = document.getElementById('cursor');
      if (cursor) {
        cursor.style.opacity = cursor.style.opacity === '1' ? '0' : '1';
      }
    }, 600);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleButtonClick = () => {
    setShowLoveLetter(true); // Show LoveLetter component when button is clicked
  };

  return (
    <div className="App">
      {showLoveLetter ? (
        <LoveLetter backgroundColor='#f48fb1' />
      ) : (
        <div id="caption-container" className="console">
          <span>C:\</span>
          <span id="caption">{displayedCaption}</span>
          <span id="cursor">|</span>
          {!isTyping && ( // Render button only when typing effect is finished
            <button onClick={handleButtonClick}>Click here to find out what I got</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
