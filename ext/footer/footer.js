import dom from 'component-dom'
import { domRender } from '../../lib/render/render'
import template from './template.jade'

const view = domRender(template)

export default function () {
  dom('#content').append(view)
}
