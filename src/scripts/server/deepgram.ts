import { isCachedValue, saveJsonCache } from "../server/cache.ts";
import * as fs from "fs";
import type { TranscriptionResult } from "@/types/types.ts";
import { createClient } from "@deepgram/sdk";

const deepgramApiKey = import.meta.env.DEEPGRAM_API_KEY;

// Creamos el cliente de Deepgram
export const deepgram = createClient(deepgramApiKey);

// Transformamos el audio .mp3 a texto
export const transcribeFile = async (name: string): Promise<string> => {
  try {
    const normalizedName = name.toLowerCase().replace(/\s+/g, "-");

    // Comprobamos si teniamos previamente en caché
    const cache: string = await isCachedValue(normalizedName);

    // Si no están en caché, obtener la transcripción
    if (cache !== "") return cache;

    // Si no hay caché, procedemos a transcribir el archivo
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      fs.readFileSync(`./public/music/${normalizedName}.mp3`),
      {
        model: "whisper",
        smart_format: true,
        language: "es",
      }
    );

    if (error) {
      console.error(`Error transcribing file ${normalizedName}:`, error);
      return "";
    }

    // No ha habnameo errores por lo que lo guardamos en caché
    const transcribe: string = result.results.channels[0].alternatives[0].transcript;
    await saveJsonCache(normalizedName, transcribe);
    return transcribe;
  } catch (err) {
    console.error(`Error processing file ${name}:`, err);
    return "";
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
          language: "es",
        }
      );

      if (error) {
        console.error(`Error transcribing file ${name}:`, error);
      } else {
        results[name] = { transcription: result.results.channels[0].alternatives[0].transcript, error: null };
      }
    } catch (err) {
      console.error(`Error processing file ${name}:`, err);
    }
  }

  return results;
};
