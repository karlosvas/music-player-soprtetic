import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import type { Category, Song } from "../types/types";
import { songs, category } from "./schema";
import { eq } from "drizzle-orm";

// Conexión a la base de datos
const sqlite = new Database("database.db");

// Crear las tablas si no existen
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    transcript TEXT NOT NULL,
    img_url TEXT NOT NULL
  );
`);

export const db = drizzle(sqlite);

// Función para insertar una canción
export function insertSong(title: string, category: string, transcript: string, img_url: string) {
  return db.insert(songs).values({ title, category, transcript, img_url }).run();
}

// Función para obtener todas las canciones
export function getAllSongs() {
  return db.select().from(songs).all();
}

export function getSongsByCategory(categoryName: string): Array<Song> {
  return db.select().from(songs).where(eq(songs.category, categoryName)).all();
}

// Función para insertar una categoría
export function insertCategory(name: string) {
  return db.insert(category).values({ name }).run();
}

// Función para obtener todas las categorías
export function getAllCategories(): Array<Category> {
  return db
    .select()
    .from(category)
    .all()
    .map((cat) => ({
      ...cat,
      id: Number(cat.id),
    }));
}

// Función para eliminar una categoría por nombre
export function deleteCategory(name: string) {
  return db.delete(category).where(eq(category.name, name)).run();
}

// Función para eliminar una canción por título
export function deleteSong(title: string) {
  return db.delete(songs).where(eq(songs.title, title)).run();
}
