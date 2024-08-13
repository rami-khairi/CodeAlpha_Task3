let songs = [
  {
    name: "song - song",
    artist: "unknown",
    img: "song1",
    audio: "------------ 5 - -------- ----. ------------ (------------   ------------)"
  },
  {
    name: "No Mercy - TrackTribe",
    artist: "TrackTribe",
    img: "song2",
    audio: "_10YearsCelebration"
  },
  {
    name: "Justin Bieber - Baby ",
    artist: "Justin Bieber",
    img: "song6",
    audio: "Justin Bieber - Baby "
  },
  {
    name: "Just A Faded Dream _ Alan Walker",
    artist: "Alan Walker",
    img: "song3",
    audio: "Just A Faded Dream _ Alan Walker"
  },
  
  
];

const content = document.querySelector(".content"),
  Playimage = content.querySelector(".music-image img"),
  musicName = content.querySelector(".music-titles .name"),
  musicArtist = content.querySelector(".music-titles .artist"),
  Audio = document.querySelector(".main-song"),
  playBtn = content.querySelector(".play-pause"),
  playBtnIcon = content.querySelector(".play-pause span"),
  prevBtn = content.querySelector("#prev"),
  nextBtn = content.querySelector("#next"),
  progressBar = content.querySelector(".progress-bar"),
  progressDetails = content.querySelector(".progress-details"),
  volumeSlider = document.querySelector("#volume-slider");

let index = 1;

window.addEventListener("load", () => {
  loadData(index);
});

function loadData(indexValue) {
  musicName.innerHTML = songs[indexValue - 1].name;
  musicArtist.innerHTML = songs[indexValue - 1].artist;
  Playimage.src = "images/" + songs[indexValue - 1].img + ".png";
  Audio.src = "songs/" + songs[indexValue - 1].audio + ".mp3";
}

playBtn.addEventListener("click", () => {
  const isMusicPaused = content.classList.contains("paused");
  isMusicPaused ? playSong() : pauseSong();
});

function playSong() {
  content.classList.add("playing");
  content.classList.remove("paused");
  playBtnIcon.innerHTML = "pause";
  Audio.play();
}

function pauseSong() {
  content.classList.remove("playing");
  content.classList.add("paused");
  playBtnIcon.innerHTML = "play_arrow";
  Audio.pause();
}

nextBtn.addEventListener("click", () => {
  nextSong();
});

prevBtn.addEventListener("click", () => {
  prevSong();
});

function nextSong() {
  index++;
  if (index > songs.length) {
    index = 1;
  }
  loadData(index);
  playSong();
}

function prevSong() {
  index--;
  if (index < 1) {
    index = songs.length;
  }
  loadData(index);
  playSong();
}

Audio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const finalTime = e.target.duration;
  let progressWidth = (currentTime / finalTime) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let currentMusicTime = content.querySelector(".current"),
    finalMusicTime = content.querySelector(".final");

  Audio.addEventListener("loadeddata", () => {
    let finalTime = Audio.duration;
    let totalMin = Math.floor(finalTime / 60);
    let totalSec = Math.floor(finalTime % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    finalMusicTime.innerHTML = `${totalMin}:${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  currentMusicTime.innerHTML = `${currentMin}:${currentSec}`;
});

progressDetails.addEventListener("click", (e) => {
  let progressWidthVal = progressDetails.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = Audio.duration;

  Audio.currentTime = (clickedOffsetX / progressWidthVal) * songDuration;
  playSong();
});

volumeSlider.addEventListener("input", (e) => {
  Audio.volume = e.target.value;
});
