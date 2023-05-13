import React from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-5 border-b">
        <div className="container flex justify-between items-center">
          <h1>
            <Link href="/" className="text-3xl font-bold">
              Semantle
            </Link>
          </h1>
          <nav className="flex gap-4 items-center">
            <Link href="/" className="text-xl font-light">
              Game
            </Link>
            <Link
              href="/semantle/create"
              className="px-5 py-2 rounded bg-blue-600 text-white text-xl hover:bg-blue-500 transition-all font-light"
            >
              Create Game
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-10 bg-gray-900">
        <div className="container">
          <p className="text-sm text-center text-white">
            &copy; 2023 Semantle, All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
