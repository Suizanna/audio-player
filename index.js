// const audio = document.querySelector("audio");
const player = document.querySelector(".player");
const main = document.querySelector(".main");
const title = document.querySelector(".song-title");
const cover = document.querySelector("#cover");
const progressBar = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");

const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const audio = new Audio();
// let pausedTime = 0;
let isPlay = false;

// Song titles
const songs = ["forest", "solovey", "drozd", "zarynka", "javoronok", "slavka"];

// Default indx song
let songIndx = 0;

// Initially song - DOM
function loadSong(song) {
  title.innerHTML = song;
  audio.src = `assets/audio/${song}.mp3`;
  // change background img
  main.src = `assets/img/${song}.jpg`;
}
loadSong(songs[songIndx]);

// Play
function playAudio() {
  //начинает всегда с начала
  // audio.currentTime = 0;
  playBtn.classList.add("pause");
  audio.play();
  isPlay = true;
}

// Pause
function pauseAudio() {
  // audio.currentTime = 0;
  playBtn.classList.remove("pause");
  audio.pause();
  isPlay = false;
}

// Play & Pause Listener
playBtn.addEventListener("click", () => {
  if (!isPlay) {
    playAudio();
  } else {
    pauseAudio();
  }
});

// Next botton
function nextSong() {
  songIndx++;
  if (songIndx > songs.length - 1) {
    songIndx = 0;
  }
  loadSong(songs[songIndx]);
  playAudio();
}

// Prev
function prevSong() {
  songIndx--;
  if (songIndx < 0) {
    songIndx = songs.length - 1;
  }
  loadSong(songs[songIndx]);
  playAudio();
}

// Progress bar
function updateProgress(e) {
  console.log(e.srcElement.duration);
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
}

// Set progress
function setProgress(e) {
  const width = this.clientWidth; //вся ширина
  const clickX = e.offsetX; // куда кликнули
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Autoplay. Когда закончится начать сначала.
audio.addEventListener("ended", nextSong);

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("click", setProgress);
