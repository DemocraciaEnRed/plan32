import page from 'page'
import bus from 'bus'
import { domRender } from '../../lib/render/render'
import forumStore from '../../lib/forum-store/forum-store'
import topicStore from '../../lib/topic-store/topic-store'
import * as layout from '../layout/layout'
import { loadMap } from '../quiero-firmar/map'
import template from './template.jade'
import NoticiasView from './view'

page('/', layout.load, (ctx, next) => {
  let view = domRender(template)
  layout.set(view)
  loadMap()
  loadNews()
  bus.emit('page:render')
})

page.exit('/', layout.unload)

function loadNews () {
  forumStore.findOneByName('noticias')
    .then((forum) => topicStore.findAll({forum: forum.id}))
    .then((topics) => {
      if (!topics) return console.log('no noticias')
      new NoticiasView({ // eslint-disable-line no-new
        container: document.querySelector('#noticias-slider'),
        locals: {
          topics: topics.sort(function (a, b) {
            return new Date(b.publishedAt) - new Date(a.publishedAt)
          })
        }
      })
    })
    .catch((err) => {
      console.error('Found Error %s', err)
    })
}
