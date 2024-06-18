// Carga el JSON con las lyrics
export async function cargarJSON() {
  try {
      const response = await fetch('/lyrics/cache.json');
      if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON.');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
      throw error;
  }
}

// Dibuja dinamicamente según se lea el texto
export function lyrics(transcript: string) {
  const lyricsP = document.getElementById('lyrics');
  const audioPlayer = document.getElementById('song') as HTMLAudioElement;

  if (!lyricsP || !audioPlayer) {
    console.error('Elementos no encontrados.');
    return;
  }

  const words: string[] = transcript.split(' ');

  function resaltarTexto(tiempo: number) {
    const indice = Math.floor(tiempo);
    if(!lyricsP) return

    lyricsP.innerHTML = '';

    words.forEach((word, index) => {
      const span = document.createElement('span');
      if (index === indice) {
        span.textContent = word + ' ';
        span.style.color = 'white';
        span.style.backgroundColor = '#333';
        span.classList.add('hilight');
      } else {
        span.textContent = word + ' ';
      }
      lyricsP.appendChild(span);
    });
  }

  audioPlayer.addEventListener('timeupdate', () => resaltarTexto(audioPlayer.currentTime));
}
  