import page from 'page'
import bus from 'bus'
import { domRender } from '../../lib/render/render'
import forumStore from '../../lib/forum-store/forum-store'
import topicStore from '../../lib/topic-store/topic-store'
import * as layout from '../layout/layout'
// import { loadMap } from '../quiero-firmar/map'
import youtubeVideo from '../youtube-video/youtube-video'
import SignatureForm from '../quiero-firmar/signature-form/signature-form'
import SignatureCount from '../quiero-firmar/signature-count/signature-count'
import template from './template.jade'
import NoticiasView from './noticias'

page('/', layout.load, (ctx, next) => {
  let view = domRender(template)
  layout.set(view)

  const form = new SignatureForm()
  form.appendTo(view.querySelector('[data-signature-form]'))

  const count = new SignatureCount()
  view.querySelector('[data-signature-count]').appendChild(count.el)

  // loadMap()
  loadNews()
  bus.emit('page:render')
  loadCoverVideo(view)
})

page.exit('/', layout.unload)

function loadCoverVideo (view) {
  window.requestAnimationFrame(function () {
    youtubeVideo(view.querySelector('[data-youtube-video]'))
  })
}

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
