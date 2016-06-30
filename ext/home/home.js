import page from 'page'
import bus from 'bus'
import { domRender } from '../../lib/render/render'
import * as layout from '../layout/layout'
import template from './template.jade'
import topicStore from '../../lib/topic-store/topic-store'
import NoticiasView from './view.js'

page('/', layout.load, (ctx, next) => {
  let view = domRender(template)
  layout.set(view)
  bus.emit('page:render')
  topicStore.findAll({forum: '5773d0dcb6567110006020cc'}) // 5774190dbf53d71000605c36
    .then(topics => {
      if (!topics) return console.log('no noticias')
      new NoticiasView({ // eslint-disable-line no-new
        container: document.querySelector('#noticias-slider'),
        locals: {
          topics: topics
        }
      })
    })
    .catch(err => {
      console.error('Found Error %s', err)
    })
})

page.exit('/', layout.unload)
