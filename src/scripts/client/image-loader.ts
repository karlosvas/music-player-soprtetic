import { AzureOpenAI } from "openai";
import { AzureKeyCredential } from "@azure/ai-form-recognizer";
import { loadJson } from "../server/cache";
import { TextAnalyticsClient } from "@azure/ai-text-analytics";

// Función para preguntar si la imagen está cargada, si no lo está devuelve false y si lo está devuelve el src de la imagen
export async function isImageLoad(source: string): Promise<string | boolean> {
  try {
    const response = await fetch(`public/photo/${source}`);
    if (response.ok) return source.toString();
    else return false;
  } catch (error) {
    return false;
  }
}

/*
Utilizamos un servicio de Azure para generar imagen mendainte un texto, esta funcion fue saacada de otro de mis proyectos, de un curso de Microsoft
Su nomnbre es "analyze-and-generate-images-with-Azure-AI" y la referencia al rero es "https://github.com/karlosvas/analyze-and-generate-images-with-Azure-AI"
*/
async function generateImage(id: string): Promise<any> {
  const jsonLyrics: Record<string, string> = await loadJson();
  const prompt = jsonLyrics[id];

  // You will need to set these environment variables or edit the following values
  const endpoint = import.meta.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = import.meta.env.AZURE_OPENAI_KEY;

  // The size of the generated image
  const size = "1024x1024";
  // The number of images to generate
  const n = 1;
  const deployment = "dall-e-3";
  const apiVersion = "2024-04-01-preview";

  const summarizedPrompt = await prompt;

  const client = new AzureOpenAI({
    apiKey,
    endpoint,
    deployment,
    apiVersion,
    dangerouslyAllowBrowser: true,
  });
  try {
    return await client.images.generate({
      prompt: summarizedPrompt,
      model: "",
      n,
      size,
    });
  } catch (error: unknown) {
    console.error("Error generating image:", error);
    throw new Error("Error generating image");
  }
}

// async function summarizePrompt(prompt: string): Promise<string> {
//   const endpoint = import.meta.env.VISION_ENDPOINT;
//   const key = import.meta.env.VISION_KEY;

//   const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));

//   const message = "Resume este texto para que se entiendan las ideas principales, de que habla: " + prompt;
//   try {
//     const [result] = await client.extractSummary([{ id: "1", language: "es", text: message }]);

//     if (result.error) {
//       throw new Error(`Error at summarizePrompt: ${result.error.message}`);
//     }

//     return result.sentences.map((sentence) => sentence.text).join(" ");
//   } catch (error) {
//     throw new Error(`Error at summarizePrompt: ${error.message}`);
//   }
// }

export { generateImage };
