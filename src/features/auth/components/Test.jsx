import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../state/hooks/ContextUser';
import { useUser } from '../../../state/hooks/ContextUser';


export default function RevealText() {
  const [showText, setShowText] = useState(false);
  const [text, setText] = useState("🌟 Hello there! You've just revealed this magical text.")

  const { testConnection } = useAuth();
  const { getUsers, userRemoveDiv } = useUser();

  useEffect(()=>{
    async function initializeAuth() {
      const response = await testConnection();
      console.log(response.data);
      setText(`is Connected: ${response.data.connected}`)

      const resp2 = await getUsers();
      console.log(resp2.data);

      const resp3 = await userRemoveDiv(1, {division_id:1});
      console.log(resp3);
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
