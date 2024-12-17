// import { type TranscriptionResult } from "../../types/types";
import { saveJsonCache, isCachedValue } from "./cache";
import { createClient } from "@deepgram/sdk";
import fs from "fs";

const deepgramApiKey = import.meta.env.DEEPGRAM_API_KEY || "";
console.log("Deepgram API Key:", deepgramApiKey);

// Creamos el cliente de Deepgram
export const deepgram = createClient(deepgramApiKey);

// Transformamos el audio .mp3 a texto
export const transcribeFile = async (id: string): Promise<string> => {
  try {
    // Comprobamos si teniamos previamente en caché
    const cache: string | boolean = await isCachedValue(id);

    // Si no están en caché, obtener la transcripción
    if (cache !== false) {
      // Resultado de la caché
      const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
        fs.readFileSync(`./public/music/${id}.mp3`),
        {
          model: "whisper",
          smart_format: true,
          language: "es",
        }
      );
      if (error) console.error(`Error transcribing file ${id}:`, error);
      else {
        // No ha habido errores por lo que lo guardamos en caché
        const transcribe = result.results.channels[0].alternatives[0].transcript;
        await saveJsonCache(id, transcribe);
        // Devolbemos la transcripcion
        console.log(`Transcripción para ${id}`);
        return transcribe;
      }
    } else {
      // Devolbemos el valor de la letra en caché
      return cache === false ? "" : (cache as string);
    }
  } catch (err) {
    console.error(`Error processing file ${id}:`, err);
  }
  return "";
};

// Devolbemos un objeto con todos los archivos transcritos
// export const transcribeFiles = async (mp3Files: string[]) => {
//   let results: Record<string, TranscriptionResult> = {};
//   for (let name of mp3Files) {
//     try {
//       const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
//         fs.readFileSync(`./public/music/${name}.mp3`),
//         {
//           model: "whisper",
//           smart_format: true,
//           language: "es",
//         }
//       );

//       if (error) {
//         console.error(`Error transcribing file ${name}:`, error);
//       } else {
//         console.log(`Transcription for file ${name}:`);
//         results[name] = { transcription: result.results.channels[0].alternatives[0].transcript, error: null };
//       }
//     } catch (err) {
//       console.error(`Error processing file ${name}:`, err);
//     }
//   }

//   return results;
// };
