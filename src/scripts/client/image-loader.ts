// import { AzureOpenAI } from "openai";
// import { loadJson } from "../server/cache";

// // Función para preguntar si la imagen está cargada, si no lo está devuelve false y si lo está devuelve el src de la imagen
// export async function loadImg(source: string): Promise<string | boolean> {
//   try {
//     const response = await fetch(`public/photo/photo${source}`);
//     if (response.ok) return source.toString();
//     else return false;
//   } catch (error) {
//     return false;
//   }
// }

// // Utilizamos un servicio de Azure para generar imagen mendainte un texto, esta funcion fue saacada de otro de mis proyectos, de un curso de Microsoft
// // Su nomnbre es "analyze-and-generate-images-with-Azure-AI" y la referencia al rero es "https://github.com/karlosvas/analyze-and-generate-images-with-Azure-AI"
// async function generateImage(id: string): Promise<any> {
//   const jsonLyrics: Record<string, string> = await loadJson();
//   const prompt = jsonLyrics[id];

//   // You will need to set these environment variables or edit the following values
//   const endpoint = import.meta.env.AZURE_OPENAI_ENDPOINT;
//   const apiKey = import.meta.env.AZURE_OPENAI_KEY;

//   // The size of the generated image
//   const size = "1024x1024";
//   // The number of images to generate
//   const n = 1;
//   const deployment = "dall-e-3";
//   const apiVersion = "2024-04-01-preview";

//   const summarizedPrompt = await prompt;

//   const client = new AzureOpenAI({
//     apiKey,
//     endpoint,
//     deployment,
//     apiVersion,
//     dangerouslyAllowBrowser: true,
//   });
//   try {
//     return await client.images.generate({
//       prompt: summarizedPrompt,
//       model: "",
//       n,
//       size,
//     });
//   } catch (error: unknown) {
//     console.error("Error generating image:", error);
//     throw new Error("Error generating image");
//   }
// }

// export { generateImage };
