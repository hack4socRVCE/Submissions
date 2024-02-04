import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white shadow-2xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="#">Wisdom Wingers</Link>
        </div>
        <ul className="flex space-x-4">
        <li>
            <Link href="/" className="hover:text-blue-200 transition duration-300">Home</Link>
          </li>
          <li>
            <Link href="/kids" className="hover:text-blue-200 transition duration-300">Kids</Link>
          </li>
          <li>
            <Link href="/selfhelp" className="hover:text-blue-200 transition duration-300">Self-help</Link>
          </li>
          <li>
            <Link href="/storygenerator" className="hover:text-blue-200 transition duration-300">TaleCraft</Link>
          </li>
          <li>
            <Link href="/story2story" className="hover:text-blue-200 transition duration-300">StorySynthesis</Link>
          </li>
          <li>
           <Link href="/Chatbot" className="hover:text-blue-200 transition duration-300">Chatbot</Link>  
          </li>
          {/* ... other links ... */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;