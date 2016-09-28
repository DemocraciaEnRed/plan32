import FormView from '../../../lib/form-view/form-view'
import template from './template.jade'

export default class SignatureForm extends FormView {
  constructor () {
    super(template)

    this.switchOn()
  }

  switchOn () {
    const el = this.el[0]
    this.autoFormatNumber(el.querySelector('[data-autoformat="number"]'))
  }

  autoFormatNumber (input) {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D*/g, '')
    })
  }

  response (err, res) {
    res.body = res.body || {}

    switch (res.status) {
      case 200:
        this.success('¡Gracias por sumarte!')
        this.reset()
        break
      case 400:
        if (res.body.error && res.body.error.code === 'ALREADY_SIGNED') {
          this.success('¡Gracias por sumarte! Tu firma ya se encontraba en la base de datos.')
          this.reset()
          break
        }
      default:
        this.errors('Lo sentimos, hubo un error en el servidor, inténtalo mas tarde por favor.')
    }
  }
}
