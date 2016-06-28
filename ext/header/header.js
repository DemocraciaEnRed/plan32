import dom from 'component-dom'
import { domRender } from '../../lib/render/render'
import template from './template.jade'

let view = domRender(template)
dom(view).insertAfter('.app-header')
