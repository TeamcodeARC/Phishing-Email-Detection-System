import React from 'react';
import { Shield, AlertTriangle, XCircle } from 'lucide-react';
import { ThreatMetrics } from '../types';

interface DashboardProps {
  metrics: ThreatMetrics;
}

export function Dashboard({ metrics }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Emails Scanned</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{metrics.totalScanned}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Threats Detected</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{metrics.threatsDetected}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center">
          <XCircle className="w-8 h-8 text-red-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Threat Score</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{metrics.avgThreatScore}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}