// Lightweight background removal utility - permanent fix for crashes
// This replaces the heavy HuggingFace transformers model with a simpler approach

export const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    console.log('Starting lightweight background removal...');
    
    // Create canvas for processing
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Set canvas size to image size
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    
    // Draw image to canvas
    ctx.drawImage(imageElement, 0, 0);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Simple background removal based on color similarity to edges
    // This is a lightweight alternative to ML models
    const edgeColor = getEdgeColor(data, canvas.width, canvas.height);
    const threshold = 30; // Color similarity threshold
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Calculate color distance from edge color
      const distance = Math.sqrt(
        Math.pow(r - edgeColor.r, 2) +
        Math.pow(g - edgeColor.g, 2) +
        Math.pow(b - edgeColor.b, 2)
      );
      
      // If color is similar to edge color, make it transparent
      if (distance < threshold) {
        data[i + 3] = 0; // Set alpha to 0 (transparent)
      }
    }
    
    // Put processed image data back to canvas
    ctx.putImageData(imageData, 0, 0);
    
    // Convert canvas to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            console.log('Successfully created processed image');
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        0.9
      );
    });
  } catch (error) {
    console.error('Error in lightweight background removal:', error);
    // Fallback: return original image
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      canvas.width = imageElement.naturalWidth;
      canvas.height = imageElement.naturalHeight;
      ctx.drawImage(imageElement, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        },
        'image/png',
        0.9
      );
    });
  }
};

// Helper function to get the dominant color from image edges
function getEdgeColor(data: Uint8ClampedArray, width: number, height: number) {
  let r = 0, g = 0, b = 0, count = 0;
  
  // Sample pixels from the edges
  for (let x = 0; x < width; x++) {
    // Top edge
    const topIndex = (x + 0 * width) * 4;
    r += data[topIndex];
    g += data[topIndex + 1];
    b += data[topIndex + 2];
    count++;
    
    // Bottom edge
    const bottomIndex = (x + (height - 1) * width) * 4;
    r += data[bottomIndex];
    g += data[bottomIndex + 1];
    b += data[bottomIndex + 2];
    count++;
  }
  
  for (let y = 0; y < height; y++) {
    // Left edge
    const leftIndex = (0 + y * width) * 4;
    r += data[leftIndex];
    g += data[leftIndex + 1];
    b += data[leftIndex + 2];
    count++;
    
    // Right edge
    const rightIndex = ((width - 1) + y * width) * 4;
    r += data[rightIndex];
    g += data[rightIndex + 1];
    b += data[rightIndex + 2];
    count++;
  }
  
  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count)
  };
}

export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
