let touchstartX = 0
let touchendX = 0

const slider = document.getElementById('carousel')

function handleGesure() {
  if (touchendX < touchstartX) console.log('swiped left!')
  if (touchendX > touchstartX) console.log('swiped right!')
}

slider.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

slider.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  handleGesure()
})
