import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Footer from './components/Footer';

function App() {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Header points={points} level={level} className="fixed top-0 w-full h-16" />
      <GameBoard points={points} setPoints={setPoints} className="absolute top-16 bottom-16 w-full" />
      <Footer className="fixed bottom-0 w-full h-16" />
    </div>
  );
}

export default App;
