// Dibuja dinamicamente según se lea el texto segun vaya leyendo el audio
export function drawLyrics(transcript: string) {
  const lyricsP = document.getElementById("lyrics") as HTMLElement;
  const audioPlayer = document.getElementById("song") as HTMLAudioElement;

  if (!lyricsP || !audioPlayer) {
    console.error("Elementos para lyrics no encontrados, revise lyrics()");
    return;
  }

  // Separamos las palabras
  const words: string[] = transcript.split(" ");

  // Creamos un span por cada palabra resaltando lo que se está leyendo en ese momento
  function resaltarTexto(tiempo: number) {
    const indice = Math.floor(tiempo);
    lyricsP.innerHTML = "";

    words.forEach((word, index) => {
      // Creamos un span cuando se encuentre en esa palabra
      const span = document.createElement("span");
      if (index === indice) {
        span.textContent = word + " ";
        span.style.color = "white";
        span.style.backgroundColor = "#333";
        span.classList.add("hilight");
      } else {
        span.textContent = word + " ";
      }
      // Añadimos el span al parrafo
      lyricsP.appendChild(span);
    });
  }

  audioPlayer.addEventListener("timeupdate", () => resaltarTexto(audioPlayer.currentTime));
}

export async function transcribeFile(name: string): Promise<string> {
  const res = await fetch("/api/transcribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    console.error("Error al transcribir el archivo:", res.statusText);
    return "Error al transcribir el archivo";
  } else {
    const data = await res.json();
    return data;
  }
}
