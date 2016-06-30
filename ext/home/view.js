import view from '../../lib/view/mixin'
import template from '../topic-cards/template.jade'
import Flickity from 'flickity'

export default class NoticiasView extends view('appendable', 'withEvents') {
  constructor (options = {}) {
    options.template = template
    super(options)
    this.switchOn()
  }

  switchOn () {
    new Flickity('#noticias-slider', { // eslint-disable-line no-new
      wrapAround: true,
      contain: true,
      pageDots: false
    })
  }
}
