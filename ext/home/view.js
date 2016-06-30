import view from '../../lib/view/mixin'
<<<<<<< HEAD
import template from './noticias-cards.jade'
=======
import template from '../topics-cards/template.jade'
>>>>>>> d8a4e74ebbc58ca067ad326039d41c0ee9fb3076
import Flickity from 'flickity'

export default class NoticiasView extends view('appendable', 'withEvents') {
  constructor (options = {}) {
    options.template = template
    super(options)
    this.flickity = undefined
    this.switchOn()
  }

  switchOn () {
    if (this.flickity) return
    this.flickity = new Flickity('#noticias-slider', // eslint-disable-line no-new
      {
        wrapAround: true,
        contain: true,
        pageDots: false
      })
  }
}
