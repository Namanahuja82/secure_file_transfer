'use client'
import Navbar from './components/Navbar';
import AuthRedirect from './components/AuthRedirect';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800">
      {/* This component will redirect authenticated users to dashboard */}
      <AuthRedirect />
      
      <Navbar isLandingPage={true} />
      
      {/* Hero Section */}
      <div className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Secure File Sharing
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            End-to-end encrypted file transfers. Your files remain private with password protection.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/sign-up" 
              className="px-8 py-4 bg-purple-600 text-white rounded-lg font-medium shadow-lg hover:bg-purple-700 transition-colors text-lg"
            >
              Get Started
            </a>
            <a 
              href="/sign-in" 
              className="px-8 py-4 bg-gray-700 text-white rounded-lg font-medium shadow-lg hover:bg-gray-600 transition-colors text-lg"
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Rest of the landing page content remains unchanged */}
      {/* Features Section */}
      <div className="py-16 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload</h3>
              <p className="text-gray-300">Select your file and set a strong password for encryption</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Share</h3>
              <p className="text-gray-300">Send the encrypted link and password separately to the recipient</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Download</h3>
              <p className="text-gray-300">Recipients enter the password to decrypt and download the file</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800/70 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6">Your Privacy Matters</h2>
            <p className="text-gray-300 text-lg mb-6">
              All files are encrypted in your browser before uploading. The encryption password never leaves your device, 
              ensuring that only someone with both the link and password can access your files.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>End-to-end encryption using AES-256</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Password is never stored on our servers</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Files are encrypted before leaving your browser</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} SecureShare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}