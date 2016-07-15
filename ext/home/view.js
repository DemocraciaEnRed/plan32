import view from '../../lib/view/mixin'
import template from './noticias-cards.jade'
import Flickity from 'flickity'
import moment from 'moment'

export default class NoticiasView extends view('appendable', 'withEvents') {
  constructor (options = {}) {
    options.template = template
    options.locals.moment = moment
    super(options)
    this.flickity = undefined
    this.switchOn()
  }

  switchOn () {
    if (this.flickity) return
    this.flickity = new Flickity('#noticias-slider', // eslint-disable-line no-new
      {
        wrapAround: true,
        autoPlay: true,
        cellAlign: 'left',
        pageDots: false
      })
  }
}
