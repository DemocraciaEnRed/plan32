import page from 'page'
import bus from 'bus'
import { domRender } from '../../lib/render/render'
import * as layout from '../layout/layout'
import SignatureForm from './signature-form/signature-form'
import { loadMap } from './map'
import template from './template.jade'

page('/quiero-firmar', layout.load, (ctx, next) => {
  const view = domRender(template, {hideMoreInfo: true})
  const form = new SignatureForm

  form.appendTo(view.querySelector('[data-signature-form]'))

  layout.set(view)
  loadMap()
  bus.emit('page:render')
})

page.exit('/quiero-firmar', layout.unload)
