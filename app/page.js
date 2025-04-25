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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-8 border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">🔐 Secure File Upload</h1>
          <p className="text-gray-400">Encrypt and share your files securely</p>
        </div>
       
        <div className="space-y-6">
          <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 bg-gray-700/50 hover:bg-gray-700 transition-colors cursor-pointer">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-1 text-sm text-gray-300">
                {file ? file.name : "Drag & drop a file or click to select"}
              </p>
            </div>
          </div>
         
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Encryption Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter a secure password"
              className="block w-full px-4 py-3 rounded-lg border border-gray-600 shadow-sm bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
         
          <button
            onClick={handleUpload}
            disabled={loading || !file || !password}
            className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-medium shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Encrypting & Uploading..." : "Secure Upload"}
          </button>
        </div>
       
        {link && (
          <div className="mt-8 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-purple-400 font-medium mb-2">Secure link generated:</p>
            <div className="bg-gray-800 p-3 rounded border border-gray-700 break-all">
              <a href={link} className="text-purple-400 hover:text-purple-300 font-medium" target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </div>
            <p className="mt-3 text-xs text-gray-400">Share this link and password with the recipient</p>
          </div>
        )}
      </div>
    </div>
  );
}