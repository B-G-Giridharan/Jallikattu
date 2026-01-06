import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, X, AlertTriangle, CheckCircle, Loader2, Image as ImageIcon, Video, FileText } from "lucide-react";

interface AnalysisResult {
  status: 'foul_play' | 'no_foul_play';
  confidence: number;
  details: string;
  timestamp: Date;
}

interface UploadedMedia {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
  analysis?: AnalysisResult;
  analyzing: boolean;
}

export function MediaUpload() {
  const [uploads, setUploads] = useState<UploadedMedia[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const analyzeMedia = (id: string) => {
    // Simulate AI analysis
    setTimeout(() => {
      const isFoulPlay = Math.random() > 0.5;
      const confidence = Math.floor(Math.random() * 20) + 80; // 80-100%
      
      const foulPlayDetails = [
        'Excessive force detected on bull',
        'Multiple participants engaging single bull',
        'Unauthorized tools detected in frame',
        'Tail twisting behavior identified',
        'Restricted zone violation observed'
      ];

      const safeDetails = [
        'Normal activity within regulations',
        'Fair play standards maintained',
        'No rule violations detected',
        'Participant behavior within guidelines',
        'Safe handling practices observed'
      ];

      const result: AnalysisResult = {
        status: isFoulPlay ? 'foul_play' : 'no_foul_play',
        confidence,
        details: isFoulPlay 
          ? foulPlayDetails[Math.floor(Math.random() * foulPlayDetails.length)]
          : safeDetails[Math.floor(Math.random() * safeDetails.length)],
        timestamp: new Date()
      };

      setUploads(prev => prev.map(upload => 
        upload.id === id 
          ? { ...upload, analyzing: false, analysis: result }
          : upload
      ));
    }, 3000); // 3 second analysis simulation
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const id = `${Date.now()}-${Math.random()}`;
        const newUpload: UploadedMedia = {
          id,
          file,
          preview: e.target?.result as string,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          analyzing: true
        };

        setUploads(prev => [newUpload, ...prev]);
        analyzeMedia(id);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeUpload = (id: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Upload className="w-5 h-5 text-zinc-400 dark:text-zinc-400" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">AI Media Analysis</h3>
      </div>

      <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
        Upload images or videos from Jallikattu events for automated AI analysis and foul play detection.
      </p>

      {/* Upload Area */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragging 
            ? 'border-cyan-500 bg-cyan-500/10' 
            : 'border-zinc-700 bg-zinc-800/30 hover:border-zinc-600 hover:bg-zinc-800/50'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div className="bg-zinc-800 rounded-full p-4">
            <Upload className="w-8 h-8 text-zinc-400" />
          </div>
          <div>
            <p className="text-white font-medium mb-1">
              Drop files here or click to upload
            </p>
            <p className="text-zinc-500 text-sm">
              Supports images (JPG, PNG) and videos (MP4, MOV)
            </p>
          </div>
        </div>
      </motion.div>

      {/* Uploaded Media */}
      {uploads.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="text-white font-medium text-sm">Recent Uploads</h4>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {uploads.map((upload) => (
                <motion.div
                  key={upload.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-zinc-800/50 rounded-lg border border-zinc-700 overflow-hidden"
                >
                  <div className="flex gap-4 p-4">
                    {/* Media Preview */}
                    <div className="flex-shrink-0 w-32 h-32 bg-zinc-900 rounded-lg overflow-hidden">
                      {upload.type === 'image' ? (
                        <img 
                          src={upload.preview} 
                          alt="Upload preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="w-12 h-12 text-zinc-600" />
                        </div>
                      )}
                    </div>

                    {/* Analysis Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {upload.type === 'image' ? (
                            <ImageIcon className="w-4 h-4 text-zinc-400" />
                          ) : (
                            <Video className="w-4 h-4 text-zinc-400" />
                          )}
                          <span className="text-white text-sm font-medium truncate">
                            {upload.file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeUpload(upload.id)}
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-zinc-500 text-xs mb-3">
                        {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>

                      {/* Analysis Status */}
                      {upload.analyzing ? (
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                            <div>
                              <p className="text-blue-400 font-medium text-sm">
                                Analyzing with AI...
                              </p>
                              <p className="text-blue-400/70 text-xs">
                                Processing media content
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : upload.analysis ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`rounded-lg p-3 border ${
                            upload.analysis.status === 'foul_play'
                              ? 'bg-red-500/10 border-red-500/30'
                              : 'bg-green-500/10 border-green-500/30'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {upload.analysis.status === 'foul_play' ? (
                              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            ) : (
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className={`font-semibold text-sm ${
                                  upload.analysis.status === 'foul_play'
                                    ? 'text-red-400'
                                    : 'text-green-400'
                                }`}>
                                  {upload.analysis.status === 'foul_play' 
                                    ? 'Foul Play Detected' 
                                    : 'No Foul Play'}
                                </p>
                                <span className="text-xs font-medium text-zinc-400">
                                  {upload.analysis.confidence}% confidence
                                </span>
                              </div>
                              <p className="text-zinc-300 text-xs mb-2">
                                {upload.analysis.details}
                              </p>
                              <p className="text-zinc-500 text-xs">
                                Analyzed at {upload.analysis.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(39, 39, 42, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(82, 82, 91, 0.8);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(113, 113, 122, 0.8);
        }
      `}</style>
    </div>
  );
}