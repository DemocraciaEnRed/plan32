import bus from 'bus'
import page from 'page'
import dom from 'component-dom'
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
  new View({ // eslint-disable-line no-new
    container: ctx.content,
    locals: {
      topics: topicFilter.filter(ctx.topics),
      forum: ctx.forum
    }
  })

  bus.emit('page:render')
}

class View extends view('appendable') {
  constructor (options = {}) {
    options.template = template
    super(options)
  }
}

