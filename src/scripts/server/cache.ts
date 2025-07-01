import * as path from "path";
import * as fs from "fs/promises";

const __dirname = path.resolve();
const CACHE_PATH = path.join(process.cwd(), "public", "lyrics", "cache.json");

// Función para cargar el archivo JSON que almacena el caché
export const loadJson = async (): Promise<Record<string, string>> => {
  try {
    const fileJSON = await fs.readFile(CACHE_PATH, "utf-8");
    return JSON.parse(fileJSON);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // Si el archivo no existe, lo creamos y retornamos un objeto vacío
      await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
      await fs.writeFile(CACHE_PATH, JSON.stringify({}), "utf-8");
      return {};
    } else {
      throw error;
    }
  }
};

// Si está cacheado lo devuelbe si no retorna false
export const isCachedValue = async (songName: string): Promise<string> => {
  // Cargamos el objeto JSON de l caché de las letras si existe lo devolvemos si no devolvemos false
  const jsonDataCache: Record<string, string> = await loadJson();
  return jsonDataCache[songName] !== undefined ? jsonDataCache[songName] : "";
};

// Guarda en el JSON los datos con el {key:value} que se le pasen
export const saveJsonCache = async (key: string, value: string): Promise<void> => {
  try {
    // Cargamos el objeto y lo agregamos
    const jsonDataCache: Record<string, string> = await loadJson();
    jsonDataCache[key] = value;
    // Lo almacenamos de vuelta en caché
    const jsonString = JSON.stringify(jsonDataCache, null, 2);
    await fs.writeFile("./public/lyrics/cache.json", jsonString, "utf-8");
  } catch (error) {
    console.log("Error saving cache ", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(String(error));
    }
  }
};
