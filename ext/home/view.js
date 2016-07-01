import view from '../../lib/view/mixin'
import template from './noticias-cards.jade'
import Flickity from 'flickity'

export default class NoticiasView extends view('appendable', 'withEvents') {
  constructor (options = {}) {
    options.template = template
    super(options)
    this.flickity = undefined
    this.switchOn()
    debugger
  }

  switchOn () {
    if (this.flickity) return
    debugger
    this.flickity = new Flickity('#noticias-slider', // eslint-disable-line no-new
      {
        wrapAround: true,
        contain: true,
        pageDots: false
      })
  }
}
