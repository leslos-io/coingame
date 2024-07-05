import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const tokenImage = '/token.png'; // Path to the token image
const coinSound = '/smw_coin.wav'; // Path to the coin sound


const GameBoard = ({ points, setPoints }) => {
  const [coins, setCoins] = useState([]);
  const [tokenValue, setTokenValue] = useState(100); // Value of each token [1, 5, 10, 20, 50
  const [gameMode, setGameMode] = useState('swiping'); // 'swiping' or 'waterfall'
  const gameBoardRef = useRef(null);
  const audioRef = useRef(null); // Reference for the audio element

  const tokenSize = 100; // Token size in pixels
  const maxTokens = 50; // Maximum number of tokens on the screen at once
  const tokenInterval = 100; // Interval in milliseconds to add new tokens

  // Function to add a coin at a random position
  const addCoin = () => {
    if (coins.length >= maxTokens) return;

    const gameBoard = gameBoardRef.current;
    const x = Math.random() * (gameBoard.offsetWidth - tokenSize);
    const y = gameMode === 'swiping'
      ? 0.10 * gameBoard.offsetHeight + Math.random() * (0.7 * gameBoard.offsetHeight - tokenSize)
      : -tokenSize;

    const id = Date.now();
    const speed = gameMode === 'waterfall' ? Math.random() * 2 + 2 : null; // Random speed for waterfall mode

    setCoins((prevCoins) => [...prevCoins, { id, x, y, speed }]);
    console.log(`Added coin: ${id}, mode: ${gameMode}, x: ${x}, y: ${y}, speed: ${speed}`);
  };

  // Function to handle swipe on a coin
  const handleSwipe = (id) => {
    setPoints((prevPoints) => prevPoints + tokenValue);
    setCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== id));
    // Play the coin sound
    // Play the coin sound
    if (audioRef.current) {
      const audioClone = audioRef.current.cloneNode();
      audioClone.play();
    }
  };

  // Check if the mouse is over a coin
  const checkMouseOverCoins = (event) => {
    const { clientX, clientY } = event;
    coins.forEach((coin) => {
      const coinElement = document.getElementById(`coin-${coin.id}`);
      const rect = coinElement.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        handleSwipe(coin.id);
      }
    });
  };

  // Add a new coin at a set interval
  useEffect(() => {
    const interval = setInterval(addCoin, tokenInterval);
    return () => clearInterval(interval);
  }, [coins, gameMode]);

  // Add event listener for mousemove
  useEffect(() => {
    const gameBoard = gameBoardRef.current;
    if (gameMode === 'swiping') {
      gameBoard.addEventListener('mousemove', checkMouseOverCoins);
    } else {
      gameBoard.removeEventListener('mousemove', checkMouseOverCoins);
    }
    return () => {
      gameBoard.removeEventListener('mousemove', checkMouseOverCoins);
    };
  }, [coins, gameMode]);

  // Update coin positions in waterfall mode
  useEffect(() => {
    if (gameMode === 'waterfall') {
      const updatePositions = () => {
        setCoins((prevCoins) =>
          prevCoins.map((coin) => ({
            ...coin,
            y: coin.y + coin.speed,
          })).filter(coin => coin.y < gameBoardRef.current.offsetHeight + tokenSize)
        );
      };

      const interval = setInterval(updatePositions, 50);
      return () => clearInterval(interval);
    }
  }, [coins, gameMode]);

  // Clear the board when switching game modes
  const toggleGameMode = () => {
    setCoins([]);
    setGameMode(gameMode === 'swiping' ? 'waterfall' : 'swiping');
  };

  return (
    <div className="relative w-full flex-grow" ref={gameBoardRef}>
      {coins.map((coin) => (
        <motion.img
          key={coin.id}
          id={`coin-${coin.id}`}
          src={tokenImage}
          alt="Coin"
          className="absolute"
          style={{
            top: `${coin.y}px`,
            left: `${coin.x}px`,
            width: `${tokenSize}px`,
            height: `${tokenSize}px`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      ))}
      <button
        className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={toggleGameMode}
      >
        Toggle Game Mode
      </button>
      <audio ref={audioRef} src={coinSound} />
    </div>
  );
};

export default GameBoard;
