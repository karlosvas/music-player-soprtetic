import fs from 'fs/promises';

const directoryPath = "./public/music";

export async function getNamesMP3(): Promise<string[]> {
  try {
    const files = await fs.readdir(directoryPath);
    const mp3Files = files
    .filter(file => file.endsWith('.mp3'))
    .map(file => file.slice(0, -4));
    
    console.log('Archivos MP3 encontrados:');
    return mp3Files;
  } catch (err) {
    console.error('Error al leer el directorio:', err);
    throw err;
  }
}
