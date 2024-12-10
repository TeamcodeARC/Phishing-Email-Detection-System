import * as tf from '@tensorflow/tfjs';
import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const tfidf = new natural.TfIdf();

export class PhishingDetector {
  private model: tf.LayersModel | null = null;
  private readonly vocabSize = 5000;
  
  async loadModel() {
    try {
      this.model = await tf.loadLayersModel('/models/phishing-detection-model.json');
    } catch (error) {
      console.error('Error loading model:', error);
      throw new Error('Failed to load ML model');
    }
  }

  async analyzeEmail(emailContent: string) {
    if (!this.model) {
      await this.loadModel();
    }

    const features = this.extractFeatures(emailContent);
    const prediction = await this.predict(features);
    
    return {
      score: prediction.score,
      indicators: this.analyzeIndicators(emailContent),
      threatLevel: this.getThreatLevel(prediction.score)
    };
  }

  private extractFeatures(text: string) {
    const tokens = tokenizer.tokenize(text.toLowerCase());
    // Feature extraction logic
    return tf.tensor2d([Array(this.vocabSize).fill(0)]);
  }

  private async predict(features: tf.Tensor2D) {
    if (!this.model) throw new Error('Model not loaded');
    
    const prediction = this.model.predict(features) as tf.Tensor;
    const score = (await prediction.data())[0];
    
    return { score: Math.round(score * 100) };
  }

  private analyzeIndicators(text: string) {
    return {
      suspiciousLinks: this.checkSuspiciousLinks(text),
      spoofedSender: this.checkSpoofedSender(text),
      urgencyTactics: this.checkUrgencyTactics(text),
      sensitiveRequest: this.checkSensitiveRequest(text)
    };
  }

  private getThreatLevel(score: number): 'safe' | 'suspicious' | 'dangerous' {
    if (score < 30) return 'safe';
    if (score < 70) return 'suspicious';
    return 'dangerous';
  }

  // Indicator analysis methods
  private checkSuspiciousLinks(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex) || [];
    return urls.some(url => this.isSuspiciousUrl(url));
  }

  private isSuspiciousUrl(url: string) {
    // URL analysis logic
    return false;
  }

  private checkSpoofedSender(text: string) {
    // Sender analysis logic
    return false;
  }

  private checkUrgencyTactics(text: string) {
    const urgencyWords = ['urgent', 'immediate', 'action required', 'account suspended'];
    return urgencyWords.some(word => text.toLowerCase().includes(word));
  }

  private checkSensitiveRequest(text: string) {
    const sensitiveWords = ['password', 'credit card', 'social security', 'bank account'];
    return sensitiveWords.some(word => text.toLowerCase().includes(word));
  }
}