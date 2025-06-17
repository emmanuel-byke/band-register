import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../state/hooks/UseAuth';
import { useUser } from '../../../state/hooks/UseUser';


export default function RevealText() {
  const [showText, setShowText] = useState(false);
  const [text, setText] = useState("🌟 Hello there! You've just revealed this magical text.")

  const { testConnection } = useAuth();
  const { getUsers } = useUser();

  useEffect(()=>{
    async function initializeAuth() {
      const response = await testConnection();
      console.log(response.data);
      setText(`is Connected: ${response.data.connected}`)

      const resp2 = await getUsers();
      console.log(resp2.data);
    }
    initializeAuth();
  }, []);

  const handleClick = () => {
    setShowText(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300"
      >
        Click to Reveal
      </button>

      {showText && (
        <p className="mt-6 text-xl font-medium animate-fade-in">
          {text}
        </p>
      )}
    </div>
  );
}
