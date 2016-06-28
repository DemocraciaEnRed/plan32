import page from 'page'
import bus from 'bus'
import dom from 'component-dom'
import { domRender } from '../../lib/render/render'
import template from './template.jade'
import footer from '../footer/footer'

page('/que-es', (ctx, next) => {
  let view = domRender(template)
  dom('#content').empty().append(view)
  footer()
  bus.emit('page:render')
})
