import page from 'page'
import bus from 'bus'
import { domRender } from '../../lib/render/render'
import * as layout from '../layout/layout'
import { loadMap } from '../quiero-firmar/map'
import template from './template.jade'

page('/quiero-firmar', layout.load, (ctx, next) => {
  let view = domRender(template, {hideMoreInfo: true})
  layout.set(view)
  loadMap()
  bus.emit('page:render')
})

page.exit('/quiero-firmar', layout.unload)
