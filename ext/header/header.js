import dom from 'component-dom'
import { domRender } from '../../lib/render/render'
import template from './template.jade'

let view = dom(domRender(template))

view.insertAfter('.app-header')

view.on('click', 'a[href]', function () {
  setTimeout(function () {
    view.find('#mobileMenuChk')[0].checked = false
  }, 0)
})
