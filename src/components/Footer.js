import React from 'react';

const Footer = () => {
  return (
    <div className="w-full p-4 bg-gray-800 text-white flex justify-around">
      <button className="bg-green-500 px-4 py-2 rounded">Boosters</button>
      <button className="bg-green-500 px-4 py-2 rounded">Upgrades</button>
    </div>
  );
};

export default Footer;
