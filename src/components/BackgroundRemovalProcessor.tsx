import { useEffect, useState } from 'react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

interface BackgroundRemovalProcessorProps {
  imageUrl: string;
  onProcessed: (processedImageUrl: string) => void;
}

const BackgroundRemovalProcessor = ({ imageUrl, onProcessed }: BackgroundRemovalProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processImage = async () => {
      setIsProcessing(true);
      try {
        // Fetch the image as blob
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        
        // Load image
        const imageElement = await loadImage(blob);
        
        // Remove background
        const processedBlob = await removeBackground(imageElement);
        
        // Create URL for processed image
        const processedUrl = URL.createObjectURL(processedBlob);
        onProcessed(processedUrl);
      } catch (error) {
        console.error('Error processing image:', error);
        // Fallback to original image
        onProcessed(imageUrl);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, [imageUrl, onProcessed]);

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span className="ml-2 text-sm text-gray-600">Processing image...</span>
      </div>
    );
  }

  return null;
};

export default BackgroundRemovalProcessor;