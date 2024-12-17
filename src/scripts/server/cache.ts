import { promises as fs } from "fs";

// Función para cargar el archivo JSON que almacena el caché
export const loadJson = async (): Promise<Record<string, string>> => {
  try {
    // Devolbemos su contenido si existe
    const fileJSON = await fs.readFile("./public/lyrics/cache.json", "utf-8");
    return JSON.parse(fileJSON);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // Si el archivo no existe, retorna un objeto vacío
      return {};
    } else {
      throw error;
    }
  }
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

// Si está cacheado lo devuelbe si no retorna false
export const isCachedValue = async (key: string): Promise<string | boolean> => {
  // Cargamos el objeto JSON de l caché de las letras si existe lo devolvemos si no devolvemos false
  const jsonDataCache: Record<string, string> = await loadJson();
  return jsonDataCache[key] !== undefined ? jsonDataCache[key] : false;
};
