
import { useState } from 'react';
import { FileInfo, AnalysisResult } from '../types';
import { useToast } from '@/hooks/use-toast';

export function useResumeAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (newFiles: FileInfo[]) => {
    setFiles(newFiles);
    setResults(null);
  };

  const clearFiles = () => {
    setFiles([]);
    setResults(null);
  };

  const analyzeResume = async () => {
    if (files.length === 0) {
      toast({
        title: "No files to analyze",
        description: "Please upload a resume or cover letter first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    setProgress(0);
    
    try {
      // Simulate progress for now - in real implementation, we'd connect to OpenAI API
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 500);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Simulate analysis result
      const mockResult: AnalysisResult = {
        overallScore: 72,
        formattingScore: {
          category: 'Formatting',
          score: 8,
          maxScore: 10,
          suggestions: [
            'Consider using a cleaner template with more white space',
            'Your resume exceeds one page - try to condense it',
            'Section headers could be more prominent'
          ]
        },
        keywordScore: {
          category: 'Keyword Optimization',
          score: 7,
          maxScore: 10,
          suggestions: [
            'Add more industry-specific terms related to your target role',
            'Include keywords from the job description like "project management"',
            'Quantify your achievements with specific metrics'
          ]
        },
        contentScore: {
          category: 'Content Quality',
          score: 8,
          maxScore: 10,
          suggestions: [
            'Use stronger action verbs to begin your bullet points',
            'Focus more on achievements rather than responsibilities',
            'Add a brief professional summary at the top'
          ]
        },
        summary: "Your resume shows solid experience, but needs optimization for ATS systems and better highlighting of key achievements. With some formatting improvements and keyword additions, it could be significantly stronger.",
        detailedFeedback: "This is a placeholder for detailed premium feedback that would include specific suggestions for each section of your resume, comparative analysis against industry standards, and tailored recommendations based on your target role and industry.",
        isPremiumContent: true
      };
      
      setResults(mockResult);
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive"
      });
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return {
    files,
    results,
    isAnalyzing,
    progress,
    handleFileUpload,
    clearFiles,
    analyzeResume
  };
}
