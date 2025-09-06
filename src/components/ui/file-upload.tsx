import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File;
  error?: string;
  className?: string;
}

export const FileUpload = ({ onFileSelect, selectedFile, error, className }: FileUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
      setIsDragActive(false);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
    noClick: true,
  });

  const removeFile = () => {
    onFileSelect(null as any);
  };

  return (
    <div className={cn("w-full", className)}>
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-smooth cursor-pointer transform hover:scale-[1.01]",
            isDragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50",
            error && "border-danger"
          )}
        >
          <input {...getInputProps()} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Upload your resume</h3>
              <p className="text-muted-foreground mb-4">
                Drag & drop your PDF file here, or click to browse
              </p>
              <Button 
                variant="outline" 
                onClick={open}
                className="mx-auto"
              >
                Choose File
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Only PDF files are supported
            </p>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border rounded-lg p-4 bg-card-gradient"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-success/10">
                <FileText className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-muted-foreground hover:text-danger"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
      
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-danger mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};