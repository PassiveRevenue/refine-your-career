
import React, { useState, useCallback } from 'react';
import { FileInfo } from '../types';
import { Upload, X, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface FileUploadAreaProps {
  onFilesSelected: (files: FileInfo[]) => void;
  onClear: () => void;
  files: FileInfo[];
  disabled?: boolean;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ 
  onFilesSelected, 
  onClear, 
  files, 
  disabled = false 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const validateFile = (file: File): boolean => {
    // Accept PDF, DOC, DOCX files under 5MB
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive"
      });
      return false;
    }
    
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const processFiles = (fileList: FileList | null) => {
    if (!fileList || disabled) return;
    
    const newFiles: FileInfo[] = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (validateFile(file)) {
        const fileType = file.name.toLowerCase().includes('cover') ? 'cover-letter' : 'resume';
        newFiles.push({ file, type: fileType });
      }
    }
    
    if (newFiles.length > 0) {
      onFilesSelected(newFiles);
      toast({
        title: "Files uploaded",
        description: `${newFiles.length} file(s) ready for analysis.`,
      });
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      
      if (!disabled) {
        processFiles(e.dataTransfer.files);
      }
    },
    [disabled, onFilesSelected]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFilesSelected(newFiles);
  };

  return (
    <div className="mt-6">
      <div 
        className={`file-drop-area ${isDragging ? 'drag-active' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {files.length === 0 ? (
          <>
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">Upload your resume or cover letter</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Drag and drop your file here, or click to browse
              <br />
              Supports PDF, DOC, DOCX (Max 5MB)
            </p>
            <input
              type="file"
              className="hidden"
              id="file-input"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              disabled={disabled}
            />
            <label htmlFor="file-input">
              <Button 
                disabled={disabled}
                className="cursor-pointer"
                variant="outline"
              >
                Browse Files
              </Button>
            </label>
          </>
        ) : (
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Uploaded Files</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClear}
                disabled={disabled}
              >
                Clear All
              </Button>
            </div>
            
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-md bg-background">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-sm font-medium">{file.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.file.size / 1024 / 1024).toFixed(2)} MB • {file.type === 'resume' ? 'Resume' : 'Cover Letter'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleRemoveFile(index)}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <div className="pt-2">
              <label htmlFor="file-input">
                <Button 
                  disabled={disabled}
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                >
                  Add Another File
                </Button>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadArea;
