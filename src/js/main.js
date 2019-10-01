// General
// get the cursor element
const cursor = document.querySelector('.cursor');

// get all links
const links = document.querySelectorAll('a');

// the variable that add the bounce effect to tha cursor
const bounce = 'bounce';

// this function place the customize circle at the X and Y coordinates of the original cursor
const moveMouse = e => {
  let x = e.clientX;
  let y = e.clientY;

  cursor.style.transform = `translate(${x - 15}px, ${y - 15}px`;
}

// this function turn on/off the animation
const enableAnimation = () => {
  const hasBounceClass = cursor.classList.contains(bounce);

  if (hasBounceClass) {
    cursor.classList.remove(bounce);
  } else {
    cursor.classList.add(bounce);
  }
}

// check for when the mouse is being moving
document.addEventListener('mousemove', moveMouse);

// check whether the user hover/leave a link
Array.prototype.forEach.call(links, link => link.addEventListener('mouseenter', enableAnimation));
Array.prototype.forEach.call(links, link => link.addEventListener('mouseleave', enableAnimation));

// Carousel
// get carousel
const carousel = document.querySelector('.carousel');

// get carousel items
const carouselItems = document.querySelectorAll('.carousel-item');

// get prev and next button
const prevButton = document.querySelector('.carousel-controls-prev');
const nextButton = document.querySelector('.carousel-controls-next');

// this function turn on/off the prev button cursor
const onPrevButton = () => {
  const hasPrevClass = cursor.classList.contains('prev');

  if (hasPrevClass) {
    cursor.classList.remove('prev');
  } else {
    cursor.classList.add('prev');
  }
}

// this function turn on/off the next button cursor
const onNextButton = () => {
  const hasNextClass = cursor.classList.contains('next');

  if (hasNextClass) {
    cursor.classList.remove('next');
  } else {
    cursor.classList.add('next');
  }
}

// this function display the prev carousel item
const clickPrevButton = () => prevCarouselItem();

// this function display the next carousel item
const clickNextButton = () => nextCarouselItem();

// this function ....
const goToSlide = n => {
  carouselItems[currentCarouselItem].className = 'carousel-item';
  currentCarouselItem = (n+carouselItems.length)%carouselItems.length;
  carouselItems[currentCarouselItem].className = 'carousel-item active';
}

// check whether the user hover/leave a carousel controls
prevButton.addEventListener('mouseenter', onPrevButton);
prevButton.addEventListener('mouseleave', onPrevButton);
nextButton.addEventListener('mouseenter', onNextButton);
nextButton.addEventListener('mouseleave', onNextButton);

// check whether the user click a carousel controls
prevButton.addEventListener('click', clickPrevButton, false);
nextButton.addEventListener('click', clickNextButton, false);

// test
var currentCarouselItem = 0;
//var carouselInterval = setInterval(nextCarouselItem,4000);

function nextCarouselItem() {
  goToSlide(currentCarouselItem+1);
}

function prevCarouselItem() {
  goToSlide(currentCarouselItem-1);
}

// swipe
let touchstartX = 0;
let touchendX = 0;

// this function ...
function handleGesure() {
  if (touchendX < touchstartX) prevCarouselItem();
  if (touchendX > touchstartX) nextCarouselItem();
}

carousel.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
})

carousel.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  handleGesure();
})
