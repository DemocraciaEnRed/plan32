import page from 'page'
import bus from 'bus'
import dom from 'component-dom'
import { domRender } from '../../lib/render/render'
import template from './template.jade'

page('/', (ctx, next) => {
  let view = domRender(template)

  dom('#content').empty().append(view)

  bus.emit('page:render')
})
