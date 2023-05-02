//carousel
const carousel = [...document.querySelectorAll('.home-carousel img')];
let carouselImageIndex = 0;

const changeCarouselIndex = () => {
  carousel[carouselImageIndex].classList.toggle('active');

  if (carouselImageIndex >= carousel.length - 1) {
    carouselImageIndex = 0;
  } else {
    carouselImageIndex++;
  }

  carousel[carouselImageIndex].classList.toggle('active');
}

setInterval(() => {
  changeCarouselIndex();
}, 3000);

// toggling music player
const musicPlayer = document.querySelector('.musicPlayer-section');
let clickCount = 1;

musicPlayer.addEventListener('click', () => {
  if (clickCount >= 2) {
    musicPlayer.classList.add('active');
    clickCount = 1;
    return;
  }
  clickCount++;
  setTimeout(() => {
    clickCount = 1;
  }, 250);
})

// back to home
const backToHome = document.querySelector('.musicPlayer-section .back-btn');
backToHome.addEventListener('click', () => {
  musicPlayer.classList.remove('active');
})

// access playlist
const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.musicPlayer-section .nav-btn');
navBtn.addEventListener('click', () => {
  playlistSection.classList.add('active');
})

// back to music player
const backToMusic = document.querySelector('.playlist .back-btn');
backToMusic.addEventListener('click', () => {
  playlistSection.classList.remove('active');
})

//// music
let currentMusic = 0;

const music = document.querySelector('.audio-src');
const seekBar = document.querySelector('.seekBar--0');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')]
// all buttons
const forwardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-sider');

//playBtn click event
playBtn.addEventListener('click', () => {
  music.play();
  playBtn.classList.remove('active')
  pauseBtn.classList.add('active')
})

//pauseBtn click event
pauseBtn.addEventListener('click', () => {
  music.pause();
  pauseBtn.classList.remove('active')
  playBtn.classList.add('active')
})

// function for setting up music
const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;

  music.src = song.path;

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  coverImage.src = song.cover;

  setTimeout(() => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  }, 300);
  currentMusicTime.innerHTML = '00 : 00';
  queue.forEach(item => item.classList.remove('active'));
  queue[currentMusic].classList.add('active');
}
setMusic(3);

// format duration in 00 : 00 format

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0` + min;
  }

  let sec = Math.floor(time % 60);
  if (min < 10) {
    min = `0` + sec;
  }
  return `${min}` : `${sec}`;

}

// seekbar events
setInterval(() => {
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
    if (repeatBtn.className.includes('active')) {
      setMusic(currentMusic);
      playBtn.click();
    } else {
      forwardBtn.click();
    }
  }
}, 500)
seekBar.addEventListener('change', () => {
  music.currentTime = seekBar.value;
})

// forward btn
forwardBtn.addEventListener('click', () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playBtn.click();
})

// backward btn
backwardBtn.addEventListener('click', () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playBtn.click();
})

// repeat btn
repeatBtn.addEventListener('click', () => {
  repeatBtn.classList.toggle('active');
})

// volume btn
volumeBtn.addEventListener('click', () => {
  volumeBtn.classList.toggle('active');
  volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () => {
  music.volume = volumeSlider.value;
})

queue.forEach((item, i) => {
  item.addEventListener('click', () => {
    setMusic(i);
    playBtn.click();
  })
})