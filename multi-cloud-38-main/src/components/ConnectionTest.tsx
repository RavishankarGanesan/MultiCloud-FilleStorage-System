import { useState, useEffect } from 'react';
import api from '@/api/config';

export const ConnectionTest = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await api.get('/api/health');
        if (response.status === 200) {
          setStatus('connected');
        }
      } catch (error) {
        setStatus('error');
        setErrorMessage('Failed to connect to the backend server. Please ensure the server is running.');
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="p-4 rounded-lg border bg-card shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Backend Connection Status</h2>
      <div className="flex items-center gap-3">
        <div
          className={`w-3 h-3 rounded-full ${status === 'checking' ? 'bg-yellow-500 animate-pulse' :
            status === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500 animate-ping'}`}
        />
        <span className={`font-medium ${status === 'error' ? 'text-red-500' : 
          status === 'connected' ? 'text-green-600' : 'text-yellow-600'}`}>
          {status === 'checking' ? 'Checking Connection...' : status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      {status === 'error' && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
};