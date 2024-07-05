import React from 'react';

const Header = ({ points, level, className  }) => {
  return (
    <div className={`bg-gray-800 text-white p-4 ${className}`}>
      <div>
        <span className="text-xl">Points: {points}</span>
        <span className="ml-4 text-xl">Level: {level}</span>
      </div>
      <button className="bg-blue-500 px-4 py-2 rounded">Join Squad</button>
    </div>
  );
};

export default Header;
