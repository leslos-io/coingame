import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Footer from './components/Footer';

function App() {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);

  return (
    <div className="flex flex-col h-screen">
      <Header points={points} level={level} />
      <GameBoard points={points} setPoints={setPoints} />
      <Footer />
    </div>
  );
}

export default App;
