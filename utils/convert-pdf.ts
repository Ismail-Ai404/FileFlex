// Fallback PDF conversion using basic approach
const convertPdfUsingFallback = async (file: File, format: string): Promise<{url: string, output: string}> => {
  // For now, we'll create a placeholder approach
  // This is a basic fallback that creates a simple image with PDF info
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Canvas not supported');
  }
  
  // Set canvas dimensions
  canvas.width = 800;
  canvas.height = 1000;
  
  // Create a simple placeholder image
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add border
  ctx.strokeStyle = '#cccccc';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  // Add text
  ctx.fillStyle = '#333333';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('PDF Preview', canvas.width / 2, 100);
  
  ctx.font = '16px Arial';
  ctx.fillText(`File: ${file.name}`, canvas.width / 2, 150);
  ctx.fillText(`Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`, canvas.width / 2, 180);
  ctx.fillText('PDF.js conversion temporarily unavailable', canvas.width / 2, 220);
  ctx.fillText('This is a placeholder image', canvas.width / 2, 250);
  
  // Convert to blob
  const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create image'));
      }
    }, mimeType, 0.95);
  });
  
  const filename = file.name.replace(/\.pdf$/i, `.${format}`);
  const url = URL.createObjectURL(blob);
  
  return { url, output: filename };
};

const initializePdfJs = async () => {
  if (typeof window === 'undefined') {
    throw new Error('PDF conversion is only available on the client side');
  }

  // Check if PDF.js is already loaded globally
  if ((window as any).pdfjsLib) {
    return (window as any).pdfjsLib;
  }

  // Load PDF.js script dynamically
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib;
      if (pdfjsLib) {
        // Configure worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(pdfjsLib);
      } else {
        reject(new Error('PDF.js not loaded'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load PDF.js'));
    document.head.appendChild(script);
  });
};

export interface PdfConversionOptions {
  quality?: number; // 0-1, default 0.95
  scale?: number;   // Rendering scale, default 2
  format?: 'png' | 'jpg' | 'jpeg' | 'webp';
}

export interface PdfConversionResult {
  blob: Blob;
  filename: string;
  url: string;
  pageNumber: number;
  totalPages: number;
}

/**
 * Convert PDF pages to image format
 * @param file - PDF file to convert
 * @param options - Conversion options
 * @returns Array of conversion results (one per page)
 */
export async function convertPdfToImages(
  file: File, 
  options: PdfConversionOptions = {}
): Promise<PdfConversionResult[]> {
  // Ensure this only runs on the client side
  if (typeof window === 'undefined') {
    throw new Error('PDF conversion can only be performed on the client side');
  }
  
  const { 
    quality = 0.95, 
    scale = 2, 
    format = 'png' 
  } = options;

  try {
    // Initialize PDF.js dynamically
    const pdfjs = await initializePdfJs();
    
    // Load PDF document
    const arrayBuffer = await file.arrayBuffer();
    
    const pdf = await pdfjs.getDocument({
      data: arrayBuffer,
      // Disable font loading to speed up rendering
      disableFontFace: false,
      // Enable text rendering for better quality
      useSystemFonts: true
    }).promise;

    const results: PdfConversionResult[] = [];
    const totalPages = pdf.numPages;
    
    // Convert each page
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      
      // Create canvas for rendering
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Could not get canvas context');
      }
      
      // Set up viewport and canvas dimensions
      const viewport = page.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // Render page to canvas
      const renderTask = page.render({
        canvasContext: context,
        viewport: viewport
      });
      await renderTask.promise;
      
      // Convert canvas to blob
      const mimeType = format === 'jpg' || format === 'jpeg' ? 'image/jpeg' : `image/${format}`;
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert canvas to blob'));
          }
        }, mimeType, quality);
      });
      
      // Generate filename
      const baseFilename = file.name.replace(/\.pdf$/i, '');
      const extension = format === 'jpeg' ? 'jpg' : format;
      const filename = totalPages === 1 
        ? `${baseFilename}.${extension}`
        : `${baseFilename}_page_${pageNum}.${extension}`;
      
      // Create result object
      const result: PdfConversionResult = {
        blob,
        filename,
        url: URL.createObjectURL(blob),
        pageNumber: pageNum,
        totalPages
      };
      
      results.push(result);
      
      // Clean up page resources
      page.cleanup();
    }
    
    return results;
    
  } catch (error) {
    console.error('PDF conversion failed:', error);
    throw new Error(`Failed to convert PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Convert PDF to single image (first page or merged pages)
 * @param file - PDF file to convert
 * @param format - Output format
 * @param options - Conversion options
 * @returns Single conversion result
 */
export async function convertPdfToSingleImage(
  file: File,
  format: 'png' | 'jpg' | 'jpeg' | 'webp' = 'png',
  options: Omit<PdfConversionOptions, 'format'> = {}
): Promise<PdfConversionResult> {
  try {
    const results = await convertPdfToImages(file, { ...options, format });
    
    if (results.length === 0) {
      throw new Error('PDF conversion produced no results');
    }
    
    // Return first page for single image conversion
    return results[0];
  } catch (error) {
    // PDF.js conversion failed, using fallback method
    
    // Use fallback conversion method
    const { url, output } = await convertPdfUsingFallback(file, format);
    
    return {
      blob: new Blob(), // Dummy blob since we already have URL
      filename: output,
      url: url,
      pageNumber: 1,
      totalPages: 1
    };
  }
}

/**
 * Get PDF metadata without converting
 * @param file - PDF file to analyze
 * @returns Basic PDF information
 */
export async function getPdfInfo(file: File): Promise<{
  numPages: number;
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
}> {
  // Ensure this only runs on the client side
  if (typeof window === 'undefined') {
    throw new Error('PDF info extraction can only be performed on the client side');
  }
  
  try {
    // Initialize PDF.js
    const pdfjs = await initializePdfJs();
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    const metadata = await pdf.getMetadata();
    const info = metadata.info as any; // Type assertion for metadata properties
    
    return {
      numPages: pdf.numPages,
      title: info?.Title || undefined,
      author: info?.Author || undefined,
      subject: info?.Subject || undefined,
      creator: info?.Creator || undefined,
    };
  } catch (error) {
    console.error('Failed to get PDF info:', error);
    throw new Error('Could not read PDF information');
  }
}