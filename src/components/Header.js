import React from 'react';

const Header = ({ points, level }) => {
  return (
    <div className="w-full p-4 bg-gray-800 text-white flex justify-between items-center">
      <div>
        <span className="text-xl">Points: {points}</span>
        <span className="ml-4 text-xl">Level: {level}</span>
      </div>
      <button className="bg-blue-500 px-4 py-2 rounded">Join Squad</button>
    </div>
  );
};

export default Header;
