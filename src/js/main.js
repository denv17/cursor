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

  cursor.style.top = `${y - 15}px`;
  cursor.style.left = `${x - 15}px`;
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

// variable for the current item
let currentCarouselItem = 0;

// variables for touch events
let touchstartX = 0;
let touchendX = 0;

//const carouselInterval = setInterval(nextCarouselItem,4000);

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

// this function go to carousel item
const goToCarouselItem = n => {
  if(carouselItems[currentCarouselItem].classList.contains('left')) {
    carouselItems[currentCarouselItem].classList.remove('left');
  }

  if(carouselItems[currentCarouselItem].classList.contains('right')) {
    carouselItems[currentCarouselItem].classList.remove('right');
  }

  setTimeout( () => {
    carouselItems[currentCarouselItem].classList.remove('active');
    currentCarouselItem = (n+carouselItems.length)%carouselItems.length;
    carouselItems[currentCarouselItem].classList.add('active');
  }, 300);
}

// this function display the prev carousel item
const prevCarouselItem = () => {
  carouselItems[currentCarouselItem].querySelector('.overlay').style.right = '';
  carouselItems[currentCarouselItem].querySelector('.overlay').style.left = '0';

  goToCarouselItem(currentCarouselItem-1);

  setTimeout( () => {
    carouselItems[currentCarouselItem].classList.add('right');
  }, 305);
};

// this function display the next carousel item
const nextCarouselItem = () => {
  carouselItems[currentCarouselItem].querySelector('.overlay').style.left = '';
  carouselItems[currentCarouselItem].querySelector('.overlay').style.right = '0';

  goToCarouselItem(currentCarouselItem+1);

  setTimeout( () => {
    carouselItems[currentCarouselItem].classList.add('left');
  }, 305);
};

// this function display the prev/next carousel item according to the swipe
const handleGesure = () => {
  if (touchendX > touchstartX) prevCarouselItem();
  if (touchendX < touchstartX) nextCarouselItem();
}

// check whether the user hover/leave a carousel controls
prevButton.addEventListener('mouseenter', onPrevButton);
prevButton.addEventListener('mouseleave', onPrevButton);
nextButton.addEventListener('mouseenter', onNextButton);
nextButton.addEventListener('mouseleave', onNextButton);

// check whether the user click a carousel controls
prevButton.addEventListener('click', prevCarouselItem, false);
nextButton.addEventListener('click', nextCarouselItem, false);

// check whether the user swipe a carousel
carousel.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
})

carousel.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  handleGesure();
})
