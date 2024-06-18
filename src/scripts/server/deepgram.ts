import { createClient } from "@deepgram/sdk";
import { type TranscriptionResult } from '../../types/types'
import { saveJson, isCachedValue } from './cache'
import fs from "fs";

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

// Transformamos el audio .mp3 a texto
export const transcribeFile = async (id: string) => {
  try {

    // Comprobamos si teniamos previamente en caché
    const cache = await isCachedValue(id);
    if(cache !== false) {
      console.log(`Transcripción encontrada en caché para ${id}`);
      return cache;
    }

    // Si no están en caché, obtener la transcripción
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      fs.readFileSync(`./public/music/${id}.mp3`),
      {
        model: "whisper",
        smart_format: true,
        language: 'es',
      }
    );

    if (error) {
      console.error(`Error transcribing file ${id}:`, error);
    } else {
      const transcribe = result.results.channels[0].alternatives[0].transcript;
      
      // Gardamos en caché
      saveJson(id, transcribe);

      // Devolbemos la transcripcion : String
      console.log(`Transcripción para ${id}`);
      return transcribe;
    }
  } catch (err) {
    console.error(`Error processing file ${id}:`, err);
  }
};

// Devolbemos un objeto con todos los archivos transcritos
export const transcribeFiles = async (mp3Files: string[]) => {
  let results: Record<string, TranscriptionResult> = {};
  for (let name of mp3Files) {
    try {
      const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
        fs.readFileSync(`./public/music/${name}.mp3`),
        {
          model: "whisper",
          smart_format: true,
          language: 'es',
        }
      );

      if (error) {
        console.error(`Error transcribing file ${name}:`, error);
      } else {
        console.log(`Transcription for file ${name}:`);
        results[name] = { transcription: result.results.channels[0].alternatives[0].transcript, error: null };
      }
    } catch (err) {
      console.error(`Error processing file ${name}:`, err);
    }
  }

  return results;
};