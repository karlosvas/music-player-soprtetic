# SoporteTIC Music Player

Un reproductor de música web desarrollado con Astro, TypeScript y SQLite.
Crea canciones unicas con IA de uso privado y disfruta de una experiencia musical personalizada.

## Características ⚡

- Reproducción de archivos `.mp3` locales
- Visualización dinámica de letras de canciones
- Gestión de categorías musicales
- Imágenes asociadas a cada canción
- Transcripción automática de letras con Deepgram

## Estructura del Proyecto 📁

- `src/` — Código fuente (componentes, scripts, páginas, tipos)
- `public/music/` — Archivos de música `.mp3`
- `public/photo/` — Imágenes de canciones
- `database.db` — Base de datos SQLite

## Primeros Pasos

1. Instala las dependencias:
   ```sh
   pnpm install
   ```
2. Configura las variables de entorno en un archivo `.env` (puedes usar `.env.demo` como ejemplo).
3. Inicia el servidor de desarrollo:
   ```sh
   pnpm dev // Inicia el servidor de desarrollo
   pnpm build // Genera la versión de producción
   pnpm preview // Previsualiza la versión de
   ```
