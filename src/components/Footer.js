import React from 'react';

const Footer = ({ className }) => (
  
    <div className={`bg-gray-800 text-white p-4 ${className}`}>
      <button className="bg-green-500 px-4 py-2 rounded">Boosters</button>
      <button className="bg-green-500 px-4 py-2 rounded">Upgrades</button>
    </div>

);

export default Footer;
