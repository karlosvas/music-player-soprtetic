import type { APIRoute } from "astro";
import { insertSong, deleteSong, getSongsByCategory } from "../../db/db";
import type { Song } from "@/types/types";

const apiKeyMusicApi = import.meta.env.MUSICAPI;

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const category: string | null = url.searchParams.get("category");

    if (!category) return new Response(JSON.stringify({ error: "Category parameter is required" }), { status: 400 });

    const songs: Array<Song> = getSongsByCategory(category);
    return new Response(JSON.stringify(songs), { status: 200 });
  } catch (error) {
    console.error("Error fetching songs:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch songs" }), { status: 500 });
  }
};

// Añadir una nueva categoría
export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, category, transcript, src } = await request.json();

    if (!name || !category || !src || !transcript)
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });

    //  createMP3Song(name, prompt, tag);
    insertSong(name, category, transcript, src);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error("Error inserting category:", error);
    return new Response(JSON.stringify({ error: "Failed to insert category" }), { status: 500 });
  }
};

// Eliminar una canción
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { title } = await request.json();

    if (!title) return new Response(JSON.stringify({ error: "Missing required field: name" }), { status: 400 });

    deleteSong(title);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting song:", error);
    return new Response(JSON.stringify({ error: "Failed to delete song" }), { status: 500 });
  }
};

// Creamois el archivo .mp3 correspondiente
// export async function createMP3Song(title: string, prompt: string, tag: string): Promise<void> {
//   try {
//     // TODO: Añadimos el .mp3
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", apiKeyMusicApi);

//     const raw = JSON.stringify({
//       custom_mode: true,
//       prompt: prompt,
//       title: title,
//       tags: tag,
//       gpt_description_prompt: "",
//       make_instrumental: false,
//       mv: "sonic-v3-5",
//     });

//     const resFetch = await fetch("https://api.musicapi.ai/api/v1/sonic/create", {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     });

//     const res = await resFetch.json();

//     const mp3Url = res.data?.url || res.url;

//     if (!mp3Url) throw new Error("No MP3 URL encontrada en la respuesta");
//   } catch (error) {
//     console.error("Error creating MP3 song:", error);
//   }
// }
