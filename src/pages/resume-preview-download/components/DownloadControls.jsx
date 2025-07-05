import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DownloadControls = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    // Animate controls on mount
    gsap.fromTo('.download-controls', 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3
      }
    );
  }, []);

  useEffect(() => {
    if (downloadSuccess) {
      // Success animation
      gsap.fromTo('.success-indicator',
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }
      );

      // Auto hide success message
      const timer = setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [downloadSuccess]);

  const handleDownload = async (format) => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    try {
      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create download link
      const link = document.createElement('a');
      const fileName = `alex-johnson-resume.${format}`;
      
      if (format === 'pdf') {
        link.href = '/assets/resume/alex-johnson-resume.pdf';
      } else if (format === 'docx') {
        link.href = '/assets/resume/alex-johnson-resume.docx';
      }
      
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloadSuccess(true);
      
      // Animate download button
      gsap.to('.download-btn', {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
      
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const formatOptions = [
    { value: 'pdf', label: 'PDF', icon: 'FileText', description: 'Portable Document Format' },
    { value: 'docx', label: 'DOCX', icon: 'File', description: 'Microsoft Word Document' }
  ];

  return (
    <div className="download-controls bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Download Resume</h3>
          <p className="text-gray-600 text-sm">Choose your preferred format</p>
        </div>

        {/* Format Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">File Format</label>
          <div className="grid grid-cols-1 gap-3">
            {formatOptions.map((format) => (
              <button
                key={format.value}
                onClick={() => setSelectedFormat(format.value)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedFormat === format.value
                    ? 'border-blue-500 bg-blue-50' :'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedFormat === format.value ? 'bg-blue-500' : 'bg-gray-100'
                  }`}>
                    <Icon 
                      name={format.icon} 
                      size={20} 
                      color={selectedFormat === format.value ? 'white' : '#6B7280'} 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{format.label}</div>
                    <div className="text-sm text-gray-500">{format.description}</div>
                  </div>
                  {selectedFormat === format.value && (
                    <Icon name="Check" size={20} className="text-blue-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Download Progress */}
        {isDownloading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Preparing download...</span>
              <span className="text-gray-600">{downloadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Success Indicator */}
        {downloadSuccess && (
          <div className="success-indicator bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Icon name="Check" size={16} color="white" />
              </div>
              <div>
                <p className="text-green-800 font-medium">Download Complete!</p>
                <p className="text-green-600 text-sm">Resume downloaded successfully</p>
              </div>
            </div>
          </div>
        )}

        {/* Download Button */}
        <Button
          variant="primary"
          onClick={() => handleDownload(selectedFormat)}
          loading={isDownloading}
          disabled={isDownloading}
          iconName="Download"
          iconPosition="left"
          className="download-btn w-full"
        >
          {isDownloading ? 'Downloading...' : `Download ${selectedFormat.toUpperCase()}`}
        </Button>

        {/* Additional Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => window.print()}
            iconName="Printer"
            iconPosition="left"
            className="text-sm"
          >
            Print
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Alex Johnson - Resume',
                  text: 'Check out my professional resume',
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            iconName="Share"
            iconPosition="left"
            className="text-sm"
          >
            Share
          </Button>
        </div>

        {/* File Info */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>File size: ~150KB (PDF) | ~85KB (DOCX)</p>
        </div>
      </div>
    </div>
  );
};

export default DownloadControls;