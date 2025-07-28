const imagens = [
      'https://static.vecteezy.com/system/resources/previews/050/482/883/non_2x/bright-yellow-balloon-floating-in-an-outdoor-party-cut-out-stock-png.png',
      'coracao-png.webp',
      'https://static.vecteezy.com/system/resources/previews/050/481/164/non_2x/pink-balloon-floating-gently-in-soft-light-cut-out-stock-png.png',
      'https://static.vecteezy.com/system/resources/previews/050/478/722/non_2x/a-single-bright-blue-balloon-floating-upwards-cut-out-stock-png.png'
      
    ];

    function criarBalao() {
      const balao = document.createElement('img');
      balao.src = imagens[Math.floor(Math.random() * imagens.length)];
      balao.classList.add('balao');
      balao.style.left = Math.random() * 100 + 'vw';
      balao.style.animationDuration = (10 + Math.random() * 8) + 's'; // velocidade variável
      document.querySelector('.baloes-container').appendChild(balao);

      // remover depois de subir
      setTimeout(() => {
        balao.remove();
      }, 15000);
    }

     // criar balões em intervalos
    setInterval(criarBalao, 600);

    const envelope = document.querySelector('.envelope-wrapper');
    envelope.addEventListener('click', () => {
      envelope.classList.toggle('flap');
    });

    const trackArt = document.querySelector('.track-art');
const trackName = document.querySelector('.track-name');
const trackArtist = document.querySelector('.track-artist');
const playpauseBtn = document.getElementById('playpause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const seekSlider = document.getElementById('seek-slider');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');

let trackIndex = 0;
let isPlaying = false;
let updateTimer;

let currTrack = document.createElement('audio');

const trackList = [
  {
    name: "parabéns",
    artist: "xande",
    image: "images/som.jpg",
    path: "parabens.mp3"
},
  {
    name: "",
    artist: "",
    image: "",
    path: ""
  },
  // adicione mais músicas aqui
];

function loadTrack(index) {
  clearInterval(updateTimer);
  resetValues();
  currTrack.src = trackList[index].path;
  currTrack.load();

  trackArt.style.backgroundImage = `url(${trackList[index].image})`;
  trackName.textContent = trackList[index].name;
  trackArtist.textContent = trackList[index].artist;

  updateTimer = setInterval(seekUpdate, 1000);

  currTrack.addEventListener('ended', nextTrack);
}

function resetValues() {
  currentTimeEl.textContent = "00:00";
  totalDurationEl.textContent = "00:00";
  seekSlider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  currTrack.play();
  isPlaying = true;
  playpauseBtn.textContent = "⏸︎";
}

function pauseTrack() {
  currTrack.pause();
  isPlaying = false;
  playpauseBtn.textContent = "▶";
}

function nextTrack() {
  if (trackIndex < trackList.length - 1) trackIndex++;
  else trackIndex = 0;
  loadTrack(trackIndex);
  playTrack();
}

function prevTrack() {
  if (trackIndex > 0) trackIndex--;
  else trackIndex = trackList.length - 1;
  loadTrack(trackIndex);
  playTrack();
}

function seekTo() {
  const seekTo = currTrack.duration * (seekSlider.value / 100);
  currTrack.currentTime = seekTo;
}

function setVolume() {
  currTrack.volume = volumeSlider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100 / currTrack.duration);
    seekSlider.value = seekPosition;

    let currentMinutes = Math.floor(currTrack.currentTime / 60);
    let currentSeconds = Math.floor(currTrack.currentTime % 60);
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(currTrack.duration % 60);

    currentTimeEl.textContent = `${pad(currentMinutes)}:${pad(currentSeconds)}`;
    totalDurationEl.textContent = `${pad(durationMinutes)}:${pad(durationSeconds)}`;
  }
}

function pad(value) {
  return value < 10 ? "0" + value : value;
}

playpauseBtn.addEventListener('click', playpauseTrack);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
seekSlider.addEventListener('change', seekTo);
volumeSlider.addEventListener('change', setVolume);

loadTrack(trackIndex);

