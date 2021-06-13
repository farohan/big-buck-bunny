//Selecting all the HTML elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');

//Constructing our functions
function playVideo() { //for playing the video
  const method = video.paused ? 'play' : 'pause'; 
  video[method]();
}

function updateBtn() { //updating the play/pause button
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skipTime() { //for skipping time
 video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdateHandler() { //changes volume and speed of movie
  video[this.name] = this.value;
}

function progressHandler() { //dividing the movie's duration by 100, to get a percentage we can work with to build a duration-viewer
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function timeLeft(e) { //for showing the remaining time
  const remainingTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = remainingTime;
}

//Adding the event listeners
video.addEventListener('click', playVideo);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', progressHandler);

toggle.addEventListener('click', playVideo);
skipBtns.forEach(button => button.addEventListener('click', skipTime));
ranges.forEach(range => range.addEventListener('change', rangeUpdateHandler));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdateHandler));

let mousedown = false;
progress.addEventListener('click', timeLeft);
progress.addEventListener('mousemove', (e) => mousedown && timeLeft(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

