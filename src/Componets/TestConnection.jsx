import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, CloudCog, AlarmClock, DatabaseZap } from 'lucide-react';
import api from '../Services/api';

export default function TestConnection({ isConnected, setIsConnected }) {
    
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing connection...');
  const [startTime] = useState(Date.now());

  // Status messages for different progress ranges
  const statusMessages = [
    { threshold: 0, message: 'Waking up database services...' },
    { threshold: 20, message: 'Initializing cloud infrastructure...' },
    { threshold: 40, message: 'Loading database modules...' },
    { threshold: 60, message: 'Establishing secure connection...' },
    { threshold: 80, message: 'Finalizing startup sequence...' },
  ];

  useEffect(() => {
    let intervalId;
    let timeoutId;
    let progressInterval;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / 120000) * 100, 100);
      setProgress(newProgress);
      
      // Update status message based on progress
      const currentStatus = statusMessages.reduce((acc, cur) => 
        newProgress >= cur.threshold ? cur : acc
      );
      setStatusMessage(currentStatus.message);
    };

    const checkConnection = async () => {
      try {
        const response = await api.test_connection();
        const connected = response?.data?.connected ?? false;
        setIsConnected(connected);

        if (connected) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          clearInterval(progressInterval);
          setStatusMessage('Database connection established!');
        }
      } catch (error) {
        setIsConnected(false);
        setStatusMessage('Database waking up...');
      }
    };

    checkConnection();
    intervalId = setInterval(checkConnection, 5000);
    progressInterval = setInterval(updateProgress, 1000);

    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      clearInterval(progressInterval);
      setStatusMessage('Database connection timeout');
    }, 120000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
    };
  }, [startTime]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 font-montserrat-alt">
      <div className="bg-white/90 backdrop-blur-lg p-12 rounded-2xl shadow-2xl min-w-[480px] text-center space-y-8 transition-all duration-300 hover:shadow-3xl">
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center gap-4">
            {isConnected ? (
              <CheckCircle2 className="w-16 h-16 text-emerald-600 animate-pop-in" />
            ) : (
              <div className="relative">
                <CloudCog className="w-20 h-20 text-blue-600 animate-pulse" />
                <DatabaseZap className="absolute -bottom-2 -right-2 w-8 h-8 text-blue-300 animate-bounce" />
              </div>
            )}
            
            <h2 className="text-3xl font-bold text-gray-800 font-poppins">
              {isConnected ? 'Database Online' : 'Database Booting'}
            </h2>
          </div>

          {!isConnected && (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  >
                    <span className="text-sm font-semibold text-blue-100 flex items-center justify-center h-full">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3 text-lg text-gray-600">
                  <AlarmClock className="w-6 h-6 animate-pulse" />
                  <span>{statusMessage}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-700 leading-relaxed">
                  <strong>Note:</strong> Cold databases typically wake within 50-90 seconds. 
                  Thank you for your patience while we initialize services.
                </p>
              </div>
            </div>
          )}
        </div>

        {!isConnected && progress >= 95 && (
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200 animate-pulse">
            <div className="flex items-center justify-center gap-2 text-amber-700">
              <XCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Taking longer than usual? Contact support</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};