import React from 'react';
import { Link, Shield, AlertTriangle, XCircle } from 'lucide-react';
import { Email } from '../types';

interface EmailDetailProps {
  email: Email;
}

export function EmailDetail({ email }: EmailDetailProps) {
  const getThreatBadge = () => {
    const classes = {
      safe: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      suspicious: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      dangerous: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes[email.threatLevel]}`}>
        {email.threatLevel.charAt(0).toUpperCase() + email.threatLevel.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{email.subject}</h2>
          {getThreatBadge()}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">From: {email.sender}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Received: {new Date(email.receivedAt).toLocaleString()}
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Threat Indicators</h3>
          <div className="space-y-2">
            {Object.entries(email.indicators).map(([key, value]) => (
              <div key={key} className="flex items-center">
                {value ? (
                  <XCircle className="w-5 h-5 text-red-500 mr-2" />
                ) : (
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Risk Score</h3>
          <div className="flex items-center">
            <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  email.score < 30
                    ? 'bg-green-500'
                    : email.score < 70
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${email.score}%` }}
              />
            </div>
            <span className="ml-4 text-sm font-medium text-gray-700 dark:text-gray-300">
              {email.score}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}