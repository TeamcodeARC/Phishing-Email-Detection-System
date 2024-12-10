import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Email } from '../types';

interface EmailListProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
}

export function EmailList({ emails, onSelectEmail }: EmailListProps) {
  const getThreatIcon = (threatLevel: Email['threatLevel']) => {
    switch (threatLevel) {
      case 'safe':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'suspicious':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'dangerous':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => onSelectEmail(email)}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getThreatIcon(email.threatLevel)}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{email.subject}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{email.sender}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(email.receivedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}