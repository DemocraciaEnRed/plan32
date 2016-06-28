import dom from 'component-dom'
import { domRender } from '../../lib/render/render'
import template from './template.jade'

export default function () {
  let view = domRender(template)
  dom(view).appendTo('#content')
}
