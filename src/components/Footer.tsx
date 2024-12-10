import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-sm mt-8 py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Made with ❤️ by Team codeARC</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 PhishGuard. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}