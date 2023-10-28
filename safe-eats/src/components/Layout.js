// src/components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-600 p-4 text-white text-center">
        <h1 className="text-2xl font-semibold">Safe Eats NYC</h1>
      </header>
      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-green-600 p-4 text-white text-center">
        <p>© 2023 Safe Eats NYC</p>
      </footer>
    </div>
  );
};

export default Layout;
