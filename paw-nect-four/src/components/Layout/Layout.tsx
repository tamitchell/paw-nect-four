import React from "react";
import ConnectFourBoard from "../ConnectFourBoard/ConnectFourBoard";
import Title from "../Title/Title";
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Layout() { 
    return  <div data-testid="layout" className="flex flex-col h-screen">
    <main className={`flex-grow flex flex-col items-center justify-between p-4 sm:p-8 ${inter.className}`}>
      <Title text="Paw-nect Four" />
      <div className="flex-grow flex items-center justify-center w-full max-w-3xl mx-auto">
        <ConnectFourBoard />
      </div>
      <footer className="w-full py-2 text-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Next.js
        </a>
      </footer>
    </main>
  </div>
}