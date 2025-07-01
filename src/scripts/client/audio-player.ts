window.addEventListener("DOMContentLoaded", () => {
  let progress = document.getElementById("progress") as HTMLInputElement;
  let song = document.getElementById("song") as HTMLAudioElement;
  let ctrlIcon = document.getElementById("ctrlIcon") as HTMLElement;

  const playBtn = document.getElementById("ctrlIcon")?.parentElement;
  if (playBtn) {
    playBtn.addEventListener("click", playPause);
  }

  song.onloadedmetadata = function () {
    progress.max = song.duration.toString();
    progress.value = song.currentTime.toString();
  };

  function playPause() {
    console.log("playPause called");
    if (ctrlIcon.classList.contains("fa-pause")) {
      song.pause();
      ctrlIcon.classList.remove("fa-pause");
      ctrlIcon.classList.add("fa-play");
    } else {
      const playpromise = song.play();
      ctrlIcon.classList.remove("fa-play");
      ctrlIcon.classList.add("fa-pause");
      console.log("playpromise", playpromise);
      if (playpromise !== undefined) {
        setInterval(() => {
          progress.value = ((song.currentTime / song.duration) * 100).toString();
          if (progress.value == progress.max) window.location.href = "/www.ejemplo.com";
        }, 500);
      }
    }
  }

  progress.onchange = function () {
    song.play();
    song.currentTime = (parseFloat(progress.value) / 100) * song.duration;
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
  };

  // Haz playPause global si lo necesitas
  (window as any).playPause = playPause;
});
