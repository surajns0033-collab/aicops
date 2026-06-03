import React, { useState, useCallback } from 'react';
import * as Icons from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { PROJECT_DATABASE } from '../constants';
import { ProjectData } from '../types';

interface FileUploadProps {
  onUploadSuccess: (data: ProjectData) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const processFile = () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate parsing an XER/XML file locally
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setFile(null);
            // Simulate returning parsed data (using P2 data as a mock "uploaded" result)
            // In reality, this would be the output of an XER parser library
            const mockParsedData = JSON.parse(JSON.stringify(PROJECT_DATABASE['p2']));
            // Tweak it slightly to prove it's "new" data
            mockParsedData.kpis[0].value = 1.15; 
            onUploadSuccess(mockParsedData);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Upload Project Data</h2>
          <p className="text-slate-500 dark:text-slate-400">Import Primavera P6 (XER/XML) or MS Project files to generate intelligence.</p>
        </div>

        {!file ? (
          <div 
            className={`
              border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200
              ${isDragging 
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/10' 
                : 'border-slate-300 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Icons.UploadCloud className={`mx-auto h-16 w-16 mb-4 ${isDragging ? 'text-brand-500' : 'text-slate-400'}`} />
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
              Drag & drop your file here
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Supports .xer, .xml, .mpp, .xlsx, .csv
            </p>
            
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              accept=".xer,.xml,.mpp,.xlsx,.csv"
              onChange={handleFileInput}
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="pointer-events-none">
                Browse Files
              </Button>
            </label>
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-100 dark:bg-brand-900/30 rounded-xl text-brand-600 dark:text-brand-400">
                  <Icons.FileText className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{file.name}</p>
                  <p className="text-sm text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              {!isProcessing && (
                <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500">
                  <Icons.Trash2 className="h-5 w-5" />
                </Button>
              )}
            </div>

            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-brand-600 dark:text-brand-400">Parsing XER Data...</span>
                  <span className="text-slate-700 dark:text-slate-300">{progress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-brand-500 h-2.5 rounded-full transition-all duration-200 ease-out" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 text-center mt-2">Extracting WBS, Activities, Relationships, and Resources locally...</p>
              </div>
            ) : (
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setFile(null)}>Cancel</Button>
                <Button variant="primary" onClick={processFile} className="gap-2">
                  <Icons.Cpu className="h-4 w-4" />
                  Process with AI
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};