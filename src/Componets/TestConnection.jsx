import { AlarmClock, CheckCircle2, CloudCog, DatabaseZap, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../state/hooks/ContextUser';

const STATUS_MESSAGES = [
  { threshold: 10, message: 'Your talent will be recognized here...' },
  { threshold: 25, message: 'We thank almighty for this opportunity...' },
  { threshold: 39, message: 'Never be ashamed of your talents...' },
  { threshold: 60, message: 'God is with you...' },
  { threshold: 80, message: 'Team Jesus...' },
];

let SUCCESS_DISPLAY_DURATION = 5;

const TestConnection = ({ isConnected, setIsConnected }) => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Welcome to Victory Celebration Band...');
  const [showSuccess, setShowSuccess] = useState(false);
  const [startTime] = useState(Date.now());
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  const { testConnection } = useAuth();

  const updateProgress = () => {
    const elapsed = Date.now() - startTime;
    const newProgress = Math.min((elapsed / 120000) * 100, 100);
    setProgress(newProgress);

    const currentStatus = STATUS_MESSAGES.reduce((acc, cur) => 
      newProgress >= cur.threshold ? cur : acc
    );
    setStatusMessage(currentStatus.message);
  };

  const clearTimers = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    clearInterval(progressRef.current);
  };

  const checkConnection = async () => {
    try {
      const response = await testConnection();
      const connected = response && response.data && response.data.connected ? response.data.connected : false;

      if (connected) {
        clearTimers();
        setShowSuccess(true);
        setStatusMessage('VICTORY CELEBRATION BAND');

        timeoutRef.current = setTimeout(() => {
          setIsConnected(true);
          setShowSuccess(false);
        }, SUCCESS_DISPLAY_DURATION);
      }
    } catch (error) {
      setIsConnected(false);
      setStatusMessage('Database waking up...');
      SUCCESS_DISPLAY_DURATION = 2000;
    }
  };

  useEffect(() => {
    checkConnection();
    intervalRef.current = setInterval(checkConnection, 5000);
    progressRef.current = setInterval(updateProgress, 1000);

    timeoutRef.current = setTimeout(() => {
      clearTimers();
      setStatusMessage('Database connection timeout');
    }, 120000);

    return () => {
      clearTimers();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderConnectionStatus = () => (
    <div className="bg-white/90 backdrop-blur-lg p-12 rounded-2xl shadow-2xl min-w-[480px] text-center space-y-8 transition-all duration-300 hover:shadow-3xl">
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <CloudCog className="w-20 h-20 text-blue-600 animate-pulse" />
            <DatabaseZap className="absolute -bottom-2 -right-2 w-8 h-8 text-blue-300 animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 font-poppins">
            Victory Celebration Band
          </h2>
        </div>

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
      </div>

      {progress >= 95 && (
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200 animate-pulse">
          <div className="flex items-center justify-center gap-2 text-amber-700">
            <span className="text-sm font-medium">Taking longer than usual? Contact support</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderSuccessStatus = () => (
    <div className="bg-white/90 backdrop-blur-lg p-12 rounded-2xl shadow-2xl min-w-[480px] text-center space-y-8 animate-fade-in">
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <CheckCircle2 className="w-20 h-20 text-emerald-600 animate-pop-in" />
          <h2 className="text-3xl font-bold text-gray-800 font-poppins">
            Victory Celebration Band
          </h2>
        </div>
        <p className="text-lg text-gray-600 animate-slide-up">
          Database Online|Connection stabilized and ready for queries
        </p>
      </div>
    </div>
  );

  const renderLoader = () => (
    <div className="flex flex-col items-center justify-center gap-6">
      <Loader2 
        className="w-20 h-20 text-blue-600 animate-spin [animation-duration:2s]"
        aria-hidden="true"
      />
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-300 tracking-wide">
          Initializing Database
        </h3>
        <p className="text-sm text-gray-100 max-w-[260px]">
          Preparing cloud infrastructure and services
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 font-montserrat-alt">
      {isConnected === null ? (
        renderLoader()
      ) : showSuccess || isConnected ? (
        renderSuccessStatus()
      ) : (
        renderConnectionStatus()
      )}
    </div>
  );
};

export default TestConnection;
