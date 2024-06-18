import { promises as fs } from 'fs';

// Función para cargar el archivo JSON que almacena el caché
const loadJson = async (): Promise<Record<string, string>> => {
  try {
    // Devolbemos su contenido si existe
    const fileJSON = await fs.readFile('./public/lyrics/cache.json', 'utf-8');
    return JSON.parse(fileJSON);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code  === 'ENOENT') {
      // Si el archivo no existe, retorna un objeto vacío
      return {};
    } else {
      throw error;
    }
  }
};

// Guarda en el JSON los datos con el {key:value} que se le pasen
export const saveJson = async (key: string, value: string): Promise<void> => {
    // Cargamos el objeto y lo agregamos
    const jsonData = await loadJson();
    jsonData[key] = value;
    // Lo almacenamos de vuelta en caché
    const jsonString = JSON.stringify(jsonData, null, 2);
    await fs.writeFile('./public/lyrics/cache.json', jsonString, 'utf-8');
};

// Si está cacheado lo devuelbe si no retorna false
export const isCachedValue = async (key: string) => {
    const data = await loadJson();
    return data[key] !== undefined ? data[key] : false;
};