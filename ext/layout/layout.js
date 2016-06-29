import dom from 'component-dom'
import footer from '../footer/footer'

const content = document.querySelector('#content')

export function load (ctx, next) {
  document.body.classList.add('ext-layout')
  next()
}

export function unload (ctx, next) {
  document.body.classList.remove('ext-layout')
  dom(content).empty()
  content.scrollTop = 0
  next()
}

export function set (view) {
  dom(content).empty()
  content.scrollTop = 0
  dom(content).append(view)
  footer()
}
