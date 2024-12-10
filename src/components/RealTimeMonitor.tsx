import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, WifiOff } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';

interface ThreatData {
  timestamp: Date;
  threatScore: number;
}

export function RealTimeMonitor() {
  const { socket, isConnected } = useSocket();
  const [data, setData] = useState<ThreatData[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('threatUpdate', (newThreat: { threatScore: number }) => {
      setData(prev => [...prev, { 
        ...newThreat, 
        timestamp: new Date() 
      }].slice(-20));
    });

    return () => {
      socket.off('threatUpdate');
    };
  }, [socket]);

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
      >
        <div className="flex flex-col items-center justify-center py-8">
          <WifiOff className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Connecting to real-time monitoring...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
    >
      <div className="flex items-center mb-6">
        <Shield className="w-6 h-6 text-indigo-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Real-Time Threat Monitor</h2>
      </div>

      <div className="h-64">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(time) => new Date(time).toLocaleTimeString()} 
              />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                labelFormatter={(label) => new Date(label).toLocaleString()}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="threatScore" 
                stroke="#4f46e5" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Waiting for threat data...
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}