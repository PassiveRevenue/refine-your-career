
export interface FileInfo {
  file: File;
  preview?: string;
  type: 'resume' | 'cover-letter';
}

export interface AnalysisScore {
  category: string;
  score: number;
  maxScore: number;
  suggestions: string[];
}

export interface AnalysisResult {
  overallScore: number;
  formattingScore: AnalysisScore;
  keywordScore: AnalysisScore;
  contentScore: AnalysisScore;
  summary: string;
  detailedFeedback: string;
  isPremiumContent: boolean;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  type: 'free' | 'subscription' | 'one-time';
  adSupported?: boolean;
  duration?: string;
}

export interface AdState {
  required: boolean;
  watched: boolean;
  isPlaying: boolean;
}
