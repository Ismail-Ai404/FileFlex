# Changelog

All notable changes to FileFlex will be documented in this file.

## [0.2.0] - 2024-09-24

### 🆕 Added
- **PDF Conversion Support**: Added comprehensive PDF-to-image conversion functionality
  - Convert PDF files to PNG, JPG, or WebP formats
  - High-quality rendering with 2x scale for crisp output
  - Client-side processing using PDF.js WebAssembly
  - Support for single-page conversion (first page)
  - Fallback system for compatibility issues

### 🔧 Enhanced
- **File Type Support**: Extended dropzone to accept PDF files
  - Added `application/pdf` and alternative MIME types for better browser compatibility
  - Updated file validation and error messages to include PDFs
  - Enhanced file icon system with PDF icon support

- **User Interface Improvements**:
  - Added cross (×) buttons for better file management on converted files
  - Improved file removal functionality for both pending and completed conversions
  - Updated error messages to reflect PDF support
  - Enhanced user feedback for PDF conversion process

- **Developer Experience**:
  - Added comprehensive TypeScript definitions for PDF conversion
  - Created modular PDF conversion utilities (`utils/convert-pdf.ts`)
  - Implemented robust error handling and fallback mechanisms
  - Added WARP.md development guidelines for future contributors
  - Updated Next.js configuration for better PDF.js webpack handling

### 🛠️ Technical Improvements
- **Dependencies**: Added `pdfjs-dist` for PDF processing capabilities
- **Architecture**: Implemented clean separation between FFmpeg and PDF.js conversion pipelines
- **Performance**: Optimized PDF.js loading with CDN-based dynamic imports
- **Compatibility**: Enhanced MIME type detection for better file format recognition

### 📚 Documentation
- **README.md**: Comprehensive documentation update with PDF conversion features
- **CHANGELOG.md**: Added this changelog to track project evolution
- **Development Guidelines**: Created WARP.md for development best practices

### 🐛 Fixed
- Resolved SSR (Server-Side Rendering) issues with PDF.js imports
- Fixed webpack configuration conflicts with PDF.js WebAssembly
- Improved error handling for unsupported PDF conversion formats
- Enhanced file type detection for edge cases

### 📦 Build & Deployment
- Updated package.json version to 0.2.0
- Enhanced Docker configuration for PDF.js compatibility
- Maintained existing build processes and deployment strategies

## [0.1.0] - Initial Release

### Features
- Image conversion (12+ formats)
- Video conversion (16+ formats)  
- Audio conversion (7+ formats)
- Client-side processing with FFmpeg WebAssembly
- Docker containerization
- Next.js 14 with App Router
- TailwindCSS + Radix UI design system