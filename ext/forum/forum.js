import bus from 'bus'
import page from 'page'
import forumRouter from '../../lib/forum-router/forum-router'
import { findForum } from '../../lib/forum-middlewares/forum-middlewares'
import { findTopics, clearTopicStore } from '../../lib/topic-middlewares/topic-middlewares'
import topicFilter from '../../lib/topic-filter/topic-filter'
import view from '../../lib/view/mixin'
import * as layout from '../layout/layout'
import template from './template.jade'

page(forumRouter('/'),
  layout.load,
  init,
  clearTopicStore,
  findForum,
  findTopics,
  render
)

page.exit(forumRouter('/'), exit, layout.unload)

function init (ctx, next) {
  document.body.classList.add('ext-forum')
  ctx.content = document.querySelector('#content')
  next()
}

function exit (ctx, next) {
  document.body.classList.remove('ext-forum')
  next()
}

function render (ctx) {
  const view = new View({ // eslint-disable-line no-new
    locals: {
      topics: topicFilter.filter(ctx.topics),
      forum: ctx.forum
    }
  })


  layout.set(view.el)

  loadVideo(view.el.querySelector('[data-youtube-id]'))

  bus.emit('page:render')
}

class View extends view() {
  constructor (options = {}) {
    options.template = template
    super(options)
  }
}

function loadVideo (video) {
  if (!video) return

  video.addEventListener('click', listener)
  function listener () {
    const id = video.getAttribute('data-youtube-id')
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`
    video.querySelector('.video-wrapper').appendChild(iframe)
    video.removeAttribute('data-youtube-id')
    video.removeEventListener('click', listener)
  }
}
