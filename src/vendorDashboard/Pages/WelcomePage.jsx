import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const WelcomePage = ({ username }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  // Show confetti animation when component mounts
  useEffect(() => {
    setShowConfetti(true);
    // Hide confetti after 5 seconds
    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);

    // Clean up timeout
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="welcome-page">
      <h3>Welcome, {username}!</h3>
      {showConfetti && <Confetti  gravity={0.1}
          numberOfPieces={900}
          
          recycle={false} width='1200px' />}
      {/* You can add more animations or celebrations here */}
    </div>
  );
};

export default WelcomePage;


