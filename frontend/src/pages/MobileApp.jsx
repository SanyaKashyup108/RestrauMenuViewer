import React from 'react';
import AppDownload from '../components/AppDownload/AppDownload';

const Mobileapp = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-white">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#0D1321] mb-6">
        Experience the Best on Your Mobile
      </h1>

      {/* Subtext */}
      <p className="text-center text-gray-600 text-base sm:text-lg md:text-xl mb-12 max-w-2xl">
        Download our Tomato app and enjoy smooth ordering, exclusive deals, faster delivery tracking,
        and much more — all in your pocket.
      </p>

      {/* App Download Component */}
      <AppDownload />
    </div>
  );
};

export default Mobileapp;
