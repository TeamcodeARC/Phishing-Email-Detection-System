import { Email, ThreatMetrics } from '../types';

export const mockEmails: Email[] = [
  {
    id: '1',
    subject: 'Urgent: Your Account Security',
    sender: 'security@bankofamerica.com.suspicious.com',
    receivedAt: '2024-03-15T10:30:00Z',
    threatLevel: 'dangerous',
    score: 85,
    indicators: {
      suspiciousLinks: true,
      spoofedSender: true,
      urgencyTactics: true,
      sensitiveRequest: true
    }
  },
  {
    id: '2',
    subject: 'Your Order Confirmation #123456',
    sender: 'orders@amazon.com',
    receivedAt: '2024-03-15T09:15:00Z',
    threatLevel: 'safe',
    score: 15,
    indicators: {
      suspiciousLinks: false,
      spoofedSender: false,
      urgencyTactics: false,
      sensitiveRequest: false
    }
  },
  {
    id: '3',
    subject: 'Document Shared: Q1 Report',
    sender: 'docs@googledrive.com.malicious.net',
    receivedAt: '2024-03-15T08:45:00Z',
    threatLevel: 'suspicious',
    score: 65,
    indicators: {
      suspiciousLinks: true,
      spoofedSender: true,
      urgencyTactics: false,
      sensitiveRequest: false
    }
  }
];

export const mockMetrics: ThreatMetrics = {
  totalScanned: 1247,
  threatsDetected: 23,
  avgThreatScore: 42
};