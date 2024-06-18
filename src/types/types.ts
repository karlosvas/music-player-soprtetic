declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEEPGRAM_API_KEY: string;
    }
  }
  interface Window {
    playPause: () => void;
  }
}

// Tipo específico para el error de Deepgram
interface DeepgramError {
    code: number;
    message: string;
  }
  
  // Interfaz para el resultado de la transcripción
export interface TranscriptionResult {
  transcription: string | null;
  error: DeepgramError | null;
}

export interface Mp3Files {
  [key: string]: string;
}