"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CryptoJS from "crypto-js";

export default function Download() {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [filename, setFilename] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [decrypting, setDecrypting] = useState(false);

  useEffect(() => {
    async function fetchFile() {
      try {
        const res = await fetch(`/api/download?id=${id}`);
        const data = await res.json();
        if (data.success) {
          setFilename(data.filename);
          setEncryptedData(data.content);
        } else {
          setError("File not found");
        }
      } catch (err) {
        setError("Error fetching file");
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchFile();
    }
  }, [id]);

  const handleDecrypt = () => {
    if (!password) return;
    
    setDecrypting(true);
    setError("");
    
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, password).toString(CryptoJS.enc.Utf8);
      if (!decrypted) throw new Error("Decryption failed");
      setDecryptedData(decrypted);
    } catch (err) {
      setError("Invalid password or corrupted file");
    } finally {
      setDecrypting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-8 border border-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Download Secure File</h1>
          {loading ? (
            <p className="mt-2 text-gray-400">Loading file details...</p>
          ) : error && !filename ? (
            <p className="mt-2 text-red-400">{error}</p>
          ) : (
            <p className="mt-2 text-gray-400 break-all">
              <span className="font-medium">File: </span>
              {filename || "Unknown file"}
            </p>
          )}
        </div>
        
        {!loading && filename && (
          <div className="space-y-6">
            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <p className="text-sm text-purple-300">
                This file is protected with password encryption. Enter the password provided by the sender to decrypt and download it.
              </p>
            </div>
            
            <div>
              <label htmlFor="decrypt-password" className="block text-sm font-medium text-gray-300 mb-1">
                Decryption Password
              </label>
              <input
                id="decrypt-password"
                type="password"
                placeholder="Enter the password"
                className="block w-full px-4 py-3 rounded-lg border border-gray-600 shadow-sm bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
            </div>
            
            <button 
              onClick={handleDecrypt} 
              disabled={decrypting || !password}
              className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-medium shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {decrypting ? "Decrypting..." : "Decrypt File"}
            </button>
            
            {decryptedData && (
              <div className="text-center mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                <p className="text-green-400 mb-3">File successfully decrypted!</p>
                <a 
                  href={decryptedData} 
                  download={filename}
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download {filename}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}