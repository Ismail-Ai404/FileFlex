// imports
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

export default async function loadFfmpeg(): Promise<FFmpeg> {
  // Only load FFmpeg on the client side
  if (typeof window === 'undefined') {
    throw new Error('FFmpeg can only be loaded on the client side');
  }
  
  const ffmpeg = new FFmpeg();
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd';
  
  try {
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    return ffmpeg;
  } catch (error) {
    console.error('Failed to load FFmpeg:', error);
    throw error;
  }
}
