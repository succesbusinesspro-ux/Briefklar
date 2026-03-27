import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Camera, FileText } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { translations, Language } from '../lib/translations';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
  privacyMode?: boolean;
  language: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isAnalyzing, privacyMode, language }) => {
  const t = translations[language as Language] || translations.Français;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isAnalyzing
  } as any);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer flex flex-col items-center justify-center text-center",
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50",
          isAnalyzing && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{t.dashboard.dropzoneTitle}</h3>
        <p className="text-gray-500 mb-6">{t.dashboard.dropzoneSubtitle}</p>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <Camera className="w-4 h-4" />
            {t.dashboard.takePhoto}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
            <FileText className="w-4 h-4" />
            {t.dashboard.chooseFile}
          </button>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-400">
        {privacyMode 
          ? t.dashboard.privacyModeActive 
          : t.dashboard.secureAnalysis}
      </p>
    </div>
  );
};
