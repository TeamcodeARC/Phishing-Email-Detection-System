import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { EmailList } from './components/EmailList';
import { EmailDetail } from './components/EmailDetail';
import { RealTimeMonitor } from './components/RealTimeMonitor';
import { Footer } from './components/Footer';
import { mockEmails, mockMetrics } from './data/mockData';
import { Email } from './types';
import { useDarkMode } from './hooks/useDarkMode';
import { motion, AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient();

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [selectedEmail, setSelectedEmail] = React.useState<Email | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Dashboard metrics={mockMetrics} />
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Emails</h2>
                <EmailList 
                  emails={mockEmails} 
                  onSelectEmail={setSelectedEmail} 
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Analysis Details</h2>
                <AnimatePresence mode="wait">
                  {selectedEmail ? (
                    <motion.div
                      key={selectedEmail.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <EmailDetail email={selectedEmail} />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      Select an email to view its analysis
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <RealTimeMonitor />
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </div>
    </QueryClientProvider>
  );
}

export default App;