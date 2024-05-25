import React, { useState, useEffect } from 'react';
import './LoveLetter.css'; // Ensure this import is present

function LoveLetter() {
    const [isChecked, setIsChecked] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // New state to track mounting

    useEffect(() => {
        // Prevent running the effect on initial render
        if (!isMounted) {
            setIsMounted(true); // Set to true after the first render
            return;
        }

        if (isChecked) {
            document.querySelector('.message').classList.remove('closed', 'no-anim');
            document.querySelector('.message').classList.add('openNor');
            document.querySelector('.heart').classList.remove('closeHer', 'openedHer');
            document.querySelector('.heart').classList.add('openHer');
            document.querySelector('.container').style.backgroundColor = '#f48fb1';
        } else {
            document.querySelector('.message').classList.remove('no-anim');
            document.querySelector('.message').classList.add('closeNor');
            document.querySelector('.heart').classList.remove('openHer', 'openedHer');
            document.querySelector('.heart').classList.add('closeHer');
            document.querySelector('.container').style.backgroundColor = '#fce4ec';
        }
    }, [isChecked, isMounted]); // Include isMounted in the dependency array

    useEffect(() => {
        const handleAnimationEnd = (event) => {
            if (event.target.classList.contains('message')) {
                if (event.target.classList.contains('closeNor')) {
                    event.target.classList.add('closed');
                }
                event.target.classList.remove('openNor', 'closeNor');
                event.target.classList.add('no-anim');
            }

            if (event.target.classList.contains('heart')) {
                if (!event.target.classList.contains('closeHer')) {
                    event.target.classList.add('openedHer', 'beating');
                } else {
                    event.target.classList.add('no-anim');
                    event.target.classList.remove('beating');
                }
                event.target.classList.remove('openHer', 'closeHer');
            }
        };

        const messageElement = document.querySelector('.message');
        const heartElement = document.querySelector('.heart');

        messageElement.addEventListener('animationend', handleAnimationEnd);
        heartElement.addEventListener('animationend', handleAnimationEnd);

        return () => {
            messageElement.removeEventListener('animationend', handleAnimationEnd);
            heartElement.removeEventListener('animationend', handleAnimationEnd);
        };
    }, []);

    return (
        <div className="container">
            <label>
                <div className="heart">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Love_Heart_SVG.svg" alt="Heart" />
                </div>
                <input
                    id="messageState"
                    type="checkbox"
                    style={{ display: 'none' }}
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                />
            </label>
            <div className="message">
                <h1 style={{ padding: '20px' }}>To One and only</h1>
                <p className="paragraph" style={{ padding: '20px' }}>
                    The past fortnight has truly been among the most memorable of my life. As you've noted, each day brought its own distinctive charm and significance. I cherished every moment, even amidst our occasional disagreements. I firmly believe that sustaining an ideal relationship requires continuous effort. So, let's seize this moment and strive to make it everlasting.
                    <br />
                    <br />
                    I want to express my love for you sincerely and deeply.
                    <br />
                    <br />
                    🎵🎵You are my sunshine
                    <br />
                    My only sunshine
                    <br />
                    You make me happy
                    <br />
                    When skies are gray
                    <br />
                    You'll never know, dear
                    <br />
                    How much I love you
                    <br />
                    Please don't take
                    <br />
                    My sunshine away🎵🎵
                    <br />
                    <br />
                    <span style={{ marginTop: '10px', color: 'pink' }}>💗😎😎💗</span>
                </p>
            </div>
        </div>
    );
}

export default LoveLetter;
