export interface Email {
  id: string;
  subject: string;
  sender: string;
  receivedAt: string;
  threatLevel: 'safe' | 'suspicious' | 'dangerous';
  score: number;
  indicators: {
    suspiciousLinks: boolean;
    spoofedSender: boolean;
    urgencyTactics: boolean;
    sensitiveRequest: boolean;
  };
}

export interface ThreatMetrics {
  totalScanned: number;
  threatsDetected: number;
  avgThreatScore: number;
}