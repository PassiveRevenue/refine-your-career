
import React from 'react';
import { AnalysisResult } from '../types';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const ScoreBar = ({ score, maxScore }: { score: number, maxScore: number }) => {
  const percentage = (score / maxScore) * 100;
  
  let bgColor = 'bg-red-500';
  if (percentage >= 80) bgColor = 'bg-green-500';
  else if (percentage >= 60) bgColor = 'bg-yellow-500';
  
  return (
    <div className="score-indicator mt-1 mb-3">
      <div className={`score-bar ${bgColor}`} style={{ width: `${percentage}%` }} />
    </div>
  );
};

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  return (
    <div className="mt-8 space-y-8">
      <div className="text-center">
        <div className="inline-block rounded-full bg-muted p-4 mb-4">
          <Star className="h-8 w-8 text-brand-500" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Your Resume Score: {result.overallScore}%</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          {result.summary}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>Formatting</span> 
              <span>{result.formattingScore.score}/{result.formattingScore.maxScore}</span>
            </CardTitle>
            <ScoreBar score={result.formattingScore.score} maxScore={result.formattingScore.maxScore} />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.formattingScore.suggestions.map((suggestion, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-muted flex items-center justify-center">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>Keywords</span> 
              <span>{result.keywordScore.score}/{result.keywordScore.maxScore}</span>
            </CardTitle>
            <ScoreBar score={result.keywordScore.score} maxScore={result.keywordScore.maxScore} />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.keywordScore.suggestions.map((suggestion, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-muted flex items-center justify-center">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>Content</span> 
              <span>{result.contentScore.score}/{result.contentScore.maxScore}</span>
            </CardTitle>
            <ScoreBar score={result.contentScore.score} maxScore={result.contentScore.maxScore} />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.contentScore.suggestions.map((suggestion, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-muted flex items-center justify-center">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-100">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-brand-600" />
              <CardTitle>Premium Insights Available</CardTitle>
            </div>
            <CardDescription>
              Unlock detailed, personalized feedback to make your resume stand out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-brand-100">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {result.detailedFeedback}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-white rounded-full border">Industry Benchmarking</span>
                  <span className="px-2 py-1 bg-white rounded-full border">ATS Simulation</span>
                  <span className="px-2 py-1 bg-white rounded-full border">Section Rewriting</span>
                </div>
                <Button variant="default" className="whitespace-nowrap bg-brand-600 hover:bg-brand-700">
                  Upgrade to Premium
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mt-8">
        <Button variant="outline" className="mr-2">Download Report</Button>
        <Button variant="default">Analyze Another Resume</Button>
      </div>
    </div>
  );
};

export default AnalysisResults;
