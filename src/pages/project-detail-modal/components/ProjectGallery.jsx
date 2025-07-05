import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProjectGallery = ({ images = [], currentIndex = 0, onImageChange }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onImageChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onImageChange(newIndex);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!images.length) return null;

  return (
    <>
      <div className="relative bg-slate-800 rounded-lg overflow-hidden">
        {/* Main Image */}
        <div className="relative aspect-video">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex]?.url || '/assets/images/no_image.png'}
                alt={images[currentIndex]?.alt || 'Project screenshot'}
                className="w-full h-full object-cover cursor-pointer"
                onClick={toggleFullscreen}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-slate-900/80 hover:bg-slate-900 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Previous image"
              >
                <Icon name="ChevronLeft" size={20} color="white" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-slate-900/80 hover:bg-slate-900 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Next image"
              >
                <Icon name="ChevronRight" size={20} color="white" />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 w-10 h-10 bg-slate-900/80 hover:bg-slate-900 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="View fullscreen"
          >
            <Icon name="Maximize2" size={16} color="white" />
          </button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-slate-900/80 rounded-full text-white text-sm font-mono">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="p-4 bg-slate-700">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => onImageChange(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                    index === currentIndex
                      ? 'border-blue-500 scale-105' :'border-transparent hover:border-slate-400'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-300 bg-black/95 flex items-center justify-center p-4"
            onClick={toggleFullscreen}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex]?.url || '/assets/images/no_image.png'}
                alt={images[currentIndex]?.alt || 'Project screenshot'}
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Close fullscreen"
              >
                <Icon name="X" size={24} color="white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectGallery;