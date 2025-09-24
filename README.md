# FileFlex

Free unlimited file converter supporting images, videos, audio, and PDFs with client-side processing for complete privacy.

## ✨ Features

### 🖼️ Image Conversion
Convert between 12+ image formats:
- **Formats**: JPG, PNG, GIF, BMP, WebP, ICO, TIFF, SVG, RAW, TGA
- **All-to-all conversion** between any supported image formats

### 🎥 Video Conversion  
Convert between 16+ video formats:
- **Formats**: MP4, AVI, MOV, MKV, WebM, FLV, WMV, 3GP, and more
- **Video-to-audio extraction** supported
- **Custom 3GP optimization** for mobile devices

### 🎵 Audio Conversion
Convert between 7+ audio formats:
- **Formats**: MP3, WAV, OGG, AAC, WMA, FLAC, M4A
- **High-quality audio processing**

### 📄 PDF Conversion (NEW!)
Convert PDFs to images:
- **PDF → Image**: Convert PDF pages to PNG, JPG, or WebP
- **High-quality rendering** with 2x scale for crisp output
- **Single-page conversion** (first page) with multi-page support planned
- **Client-side processing** - your PDFs never leave your browser

### 🔒 Privacy & Security
- **Client-side only processing** - no server uploads
- **Unlimited conversions** - no restrictions or quotas
- **No registration required**
- **Files never leave your browser**

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- Yarn or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/FileFlex.git
cd FileFlex
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Start the development server:
```bash
yarn dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Docker Setup

1. Using Docker Compose:
```bash
docker-compose up --build
```

2. Or build manually:
```bash
docker build -t fileflex .
docker run -p 3000:3000 fileflex
```

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS + Radix UI
- **File Processing**: 
  - FFmpeg WebAssembly for media files
  - PDF.js for PDF processing
- **TypeScript**: Full TypeScript support
- **Deployment**: Docker containerized

## 📁 Project Structure

```
FileFlex/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── dropzone.tsx       # Main file upload/conversion UI
│   ├── navbar.tsx         # Navigation
│   └── ui/               # Radix UI components
├── utils/                # Core conversion logic
│   ├── convert.ts         # Main conversion orchestrator
│   ├── convert-pdf.ts     # PDF-specific conversion
│   ├── load-ffmpeg.ts     # FFmpeg WebAssembly loader
│   └── file-to-icon.tsx   # File type icons
├── types.d.ts            # TypeScript definitions
└── WARP.md              # Development guidelines
```

## 🎯 Usage

1. **Upload Files**: Drag and drop or click to select files
2. **Choose Format**: Select your desired output format from the dropdown
3. **Convert**: Click "Convert Now" to process your files
4. **Download**: Download your converted files individually or all at once

### Supported Conversions

| From | To | Status |
|------|-----|--------|
| Images (12 formats) | Any image format | ✅ Full support |
| Videos (16 formats) | Any video/audio format | ✅ Full support |
| Audio (7 formats) | Any audio format | ✅ Full support |
| PDF | PNG, JPG, WebP | ✅ New! First page only |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Follow the existing code style and patterns
2. Test your changes thoroughly
3. Update documentation as needed
4. Ensure Docker builds work correctly

### Recent Contributions

- **PDF Conversion Feature**: Added PDF-to-image conversion with PDF.js integration
- **Enhanced UI**: Added cross buttons for file management
- **Improved Error Handling**: Better MIME type detection and fallback support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [FFmpeg](https://ffmpeg.org/) for multimedia processing
- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF rendering
- [Next.js](https://nextjs.org/) for the framework
- [Radix UI](https://www.radix-ui.com/) for accessible components