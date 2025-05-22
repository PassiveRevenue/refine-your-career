import React, { useState, useEffect } from 'react';
import { AdState } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Megaphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
interface AdOverlayProps {
  adState: AdState;
  onAdComplete: () => void;
  onClose: () => void;
}
const AdOverlay: React.FC<AdOverlayProps> = ({
  adState,
  onAdComplete,
  onClose
}) => {
  const [adProgress, setAdProgress] = useState<number>(0);
  const [adDuration] = useState<number>(10); // Ad duration in seconds
  const {
    toast
  } = useToast();
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (adState.isPlaying && adProgress < 100) {
      interval = setInterval(() => {
        setAdProgress(prev => {
          const newProgress = prev + 100 / adDuration;
          if (newProgress >= 100) {
            // Ad completed
            clearInterval(interval);
            toast({
              title: "Ad completed",
              description: "Thank you for watching. Your free analysis is now available."
            });
            onAdComplete();
            return 100;
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [adState.isPlaying, adProgress, adDuration, onAdComplete, toast]);
  return <Dialog open={adState.required && !adState.watched} onOpenChange={open => {
    if (!open) onClose();
  }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-brand-600" />
            Watch Ad to Continue
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center p-4">
          <div className="bg-muted w-full h-48 mb-4 flex items-center justify-center rounded-md overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center bg-brand-50/50">
              <div className="text-center">
                <Megaphone className="h-16 w-16 text-brand-600/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {adState.isPlaying ? `Watching advertisement (${Math.round(adDuration - adDuration * adProgress / 100)}s)` : "Click play to watch advertisement"}
                </p>
              </div>
            </div>
          </div>
          
          {adState.isPlaying ? <div className="w-full">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="bg-brand-600 h-2 transition-all duration-300 ease-linear rounded-full" style={{
              width: `${adProgress}%`
            }} />
              </div>
              <p className="text-xs text-center mt-1 text-muted-foreground">
                {adProgress < 100 ? `Please wait ${Math.round(adDuration - adDuration * adProgress / 100)} seconds...` : "Ad completed!"}
              </p>
            </div> : <Button onClick={() => {
          toast({
            title: "Advertisement started",
            description: "Please watch the entire ad to continue."
          });
          setAdProgress(0);
          onAdComplete(); // For demo purposes, allow skipping in real implementation
        }} className="bg-brand-600 hover:bg-brand-700">
              Play Advertisement
            </Button>}
          
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Watch this advertisement to unlock your free monthly resume analysis.
          </p>
          
          <p className="text-sm text-muted-foreground mt-4 text-center">
            <span className="font-medium text-brand-600">Upgrade to Premium for ad-free experience.</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>;
};
export default AdOverlay;