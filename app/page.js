'use client'
import { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !password) return alert("File and password required");
    
    setLoading(true);
    
    const reader = new FileReader();
    reader.onload = async function (e) {
      try {
        const encrypted = CryptoJS.AES.encrypt(e.target.result, password).toString();
        const res = await axios.post('/api/upload', {
          filename: file.name,
          content: encrypted,
        });
        
        if (res.data.success) {
          setLink(`${window.location.origin}/download/${res.data.id}`);
        }
      } catch (error) {
        alert("Upload failed: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">🔐 Secure File Upload</h1>
          <p className="text-gray-600">Encrypt and share your files securely</p>
        </div>
        
        <div className="space-y-6">
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            />
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-1 text-sm text-gray-600">
                {file ? file.name : "Drag & drop a file or click to select"}
              </p>
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Encryption Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter a secure password"
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            onClick={handleUpload} 
            disabled={loading || !file || !password}
            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Encrypting & Uploading..." : "Secure Upload"}
          </button>
        </div>
        
        {link && (
          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-700 font-medium mb-2">Secure link generated:</p>
            <div className="bg-white p-3 rounded border border-gray-200 break-all">
              <a href={link} className="text-indigo-600 hover:text-indigo-800 font-medium" target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </div>
            <p className="mt-3 text-xs text-gray-500">Share this link and password with the recipient</p>
          </div>
        )}
      </div>
    </div>
  );
}