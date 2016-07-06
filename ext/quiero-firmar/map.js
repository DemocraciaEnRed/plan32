import checkVisible from 'element-is-visible-in-viewport'
import throttle from 'mout/function/throttle'
import { content } from '../layout/layout'

export function loadMap () {
  const map = document.querySelector('[data-map]')
  loadOnViewport(map)

  const showButton = map.querySelector('[data-map-activate]')
  showButton.addEventListener('click', function () {
    map.classList.add('active')
  })
}

// Map should be hidden 'til is in viewport, if not theres a bug where the
// iframe overlaps everything
function loadOnViewport (map) {
  function check () {
    const isVisible = checkVisible(map, 'any')
    if (isVisible) {
      map.classList.remove('loading')
      content.removeEventListener('scroll', checkThrottled)
    }
  }

  const checkThrottled = throttle(check, 100)

  content.addEventListener('scroll', checkThrottled)
  window.requestAnimationFrame(check)
}
