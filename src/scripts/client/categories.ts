import type { Song } from "@/types/types";

// LLamada a la api para las categorias
export async function createCategory(name: string) {
  const res = await fetch("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return await res.json();
}

// LLamada a la api para eliminar una categoria
export async function deleteCategory(name: string) {
  await fetch("/api/categories", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

// Eliminar todas las canciones de una categoría
export async function deleteAllSongsCategory(category: string): Promise<void> {
  const res = await fetch(`/api/music?category=${encodeURIComponent(category)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Error al obtener las categorías");

  const songs: Array<Song> = await res.json();
  await Promise.all(songs.map((song) => deleteSong(song.title)));
}

// Llamada a la api para crear una canción
export async function createSong(
  name: string,
  category: string,
  transcript: string,
  src: string,
  prompt: string,
  tag: string
): Promise<Song> {
  const res = await fetch("/api/music", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, category, transcript, src, prompt, tag }),
  });
  return await res.json();
}

// Eliminar una canción
export async function deleteSong(title: string) {
  await fetch("/api/music", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
}

// Llamada a la api para crear un transcript
export async function createTranscript(name: string): Promise<string> {
  const res = await fetch("/api/transcript", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const transcript = await res.json();

  console.log("Transcript created:", transcript);
  return transcript;
}
