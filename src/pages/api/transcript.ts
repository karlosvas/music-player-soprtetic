import { transcribeFile } from "@/scripts/server/deepgram";
import type { APIRoute } from "astro";

// Añadir una nueva transcripción
// Esta ruta recibe el nombre del archivo de audio y devuelve la transcripción
export const POST: APIRoute = async ({ request }) => {
  const { name } = await request.json();

  try {
    if (!name) return new Response(JSON.stringify({ error: "Missing required field: name" }), { status: 400 });

    const transcription: string = await transcribeFile(name);
    return new Response(JSON.stringify(transcription), { status: 201 });
  } catch (error) {
    console.error("Error transcribing file:", error);
    return new Response(JSON.stringify({ error: "Failed to transcribe file" }), { status: 500 });
  }
};
