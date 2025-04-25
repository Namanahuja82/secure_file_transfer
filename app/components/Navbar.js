'use client'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Navbar({ isLandingPage = false }) {
  return (
    <nav className="w-full py-4 px-6 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-white flex items-center">
            <span className="mr-2">🔐</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              SecureShare
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <SignedOut>
            <Link 
              href="/sign-in" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/sign-up" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </SignedOut>
          
          <SignedIn>
            <Link 
              href="/dashboard" 
              className="text-gray-300 hover:text-white transition-colors mr-4"
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}