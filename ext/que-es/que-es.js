import page from 'page'
import bus from 'bus'
import { domRender } from '../../lib/render/render'
import * as layout from '../layout/layout'
import template from './template.jade'

page('/que-es', layout.load, (ctx, next) => {
  let view = domRender(template)
  layout.set(view)
  bus.emit('page:render')
})

page.exit('/que-es', layout.unload)
