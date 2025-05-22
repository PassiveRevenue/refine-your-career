
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileUploadArea from '@/components/FileUploadArea';
import AnalysisResults from '@/components/AnalysisResults';
import PremiumFeatures from '@/components/PremiumFeatures';
import AdOverlay from '@/components/AdOverlay';
import { useResumeAnalysis } from '@/hooks/useResumeAnalysis';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Check, SearchCheck, Star, Ad } from 'lucide-react';

const Index = () => {
  const {
    files,
    results,
    isAnalyzing,
    progress,
    adState,
    handleFileUpload,
    clearFiles,
    analyzeResume,
    startAd,
    completeAd,
    closeAd
  } = useResumeAnalysis();
  
  const [activeTab, setActiveTab] = useState<string>("analyze");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-b from-brand-50 to-background">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Perfect Your Resume with <span className="text-brand-600">AI-Powered</span> Feedback
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get instant, professional feedback on your resume and cover letter. 
              Optimize for ATS systems and stand out to hiring managers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-600 hover:bg-brand-700"
                onClick={() => document.getElementById('analyze-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Analyze My Resume
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  setActiveTab("pricing");
                  document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Pricing
              </Button>
            </div>
            
            <div className="mt-8 inline-flex items-center gap-2 text-muted-foreground text-sm bg-muted/50 px-3 py-1 rounded-full">
              <Ad className="h-4 w-4 text-yellow-500" />
              <span>Free tier now available with ad-supported analysis!</span>
            </div>
          </div>
        </section>
        
        <section className="py-8">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="h-12 w-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchCheck className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your resume against industry standards and job requirements
                </p>
              </div>
              <div className="p-6">
                <div className="h-12 w-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Actionable Feedback</h3>
                <p className="text-muted-foreground">
                  Get specific suggestions to improve formatting, keywords, and content
                </p>
              </div>
              <div className="p-6">
                <div className="h-12 w-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ATS Optimization</h3>
                <p className="text-muted-foreground">
                  Ensure your resume passes through Applicant Tracking Systems
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-muted/30" id="features-section">
          <div className="container px-4 mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="analyze" id="analyze-section">Analyze Resume</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing Plans</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="analyze" className="max-w-4xl mx-auto">
                {!results ? (
                  <div className="bg-background rounded-xl shadow-sm border p-6">
                    <h2 className="text-2xl font-bold mb-4">Upload Your Resume</h2>
                    <p className="text-muted-foreground mb-4">
                      Our AI will analyze your resume and provide instant feedback on formatting, keywords, and content.
                    </p>
                    
                    <FileUploadArea 
                      onFilesSelected={handleFileUpload}
                      onClear={clearFiles}
                      files={files}
                      disabled={isAnalyzing}
                    />
                    
                    {files.length > 0 && (
                      <div className="mt-6 text-center">
                        <Button 
                          onClick={analyzeResume}
                          disabled={isAnalyzing || files.length === 0}
                          className="bg-brand-600 hover:bg-brand-700"
                          size="lg"
                        >
                          {isAnalyzing ? 'Analyzing...' : 'Analyze My Resume'}
                        </Button>
                        
                        {isAnalyzing && (
                          <div className="mt-6">
                            <p className="text-sm text-muted-foreground mb-2">
                              {progress < 100 ? 'Analyzing your resume...' : 'Analysis complete!'}
                            </p>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div 
                                className="progress-bar" 
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4 text-xs text-muted-foreground">
                          <div className="flex items-center justify-center gap-2">
                            <Ad className="h-3 w-3 text-yellow-500" />
                            <span>Free tier users must watch a brief advertisement before analysis</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <AnalysisResults result={results} />
                )}
                
                {/* Ad Overlay Component */}
                <AdOverlay 
                  adState={adState} 
                  onAdComplete={completeAd}
                  onClose={closeAd}
                />
              </TabsContent>
              
              <TabsContent value="pricing">
                <PremiumFeatures />
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-b from-background to-brand-50">
          <div className="container px-4 mx-auto text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-100 mb-6">
              <Star className="h-8 w-8 text-brand-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Start Improving Your Resume Today</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Try our free, ad-supported analysis or upgrade for premium features.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-600 hover:bg-brand-700"
                onClick={() => document.getElementById('analyze-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Try Free Analysis
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  setActiveTab("pricing");
                  document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Premium Plans
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
