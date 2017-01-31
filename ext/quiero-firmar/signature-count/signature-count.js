import d from 'domator'
import request from '../../../lib/request/request'

export default class SignatureCount {
  constructor () {
    this.render = this.render.bind(this)
    this.updateCount = this.updateCount.bind(this)

    this.count = 0
    this.el = d('.signature-count')

    this.updateCount()
  }

  updateCount () {
    request
      .get('/quiero-firmar/count')
      .end((err, res) => {
        if (err) throw err
        if (!res.ok) throw res.error

        this.count = res.body.count
        this.render()
      })
  }

  render () {
    this.el = d(this.el, [
      `p ${prettyDecimals(this.count)} personas ya han firmado`,
      `.progress`, [
        `.progress-bar`, {
          style: `width: ${getCompletion(this.count)}%`,
          role: 'progressbar',
          'aria-valuenow': getCompletion(this.count),
          'aria-valuemin': 0,
          'aria-valuemax': 100
        }
      ]
    ])
  }
}

function getCompletion (count) {
  return Number(count) / 80000 * 100
}

function prettyDecimals (number) {
  if (typeof number === 'number') number = String(number)
  if (typeof number !== 'string') return ''
  if (number.length <= 3) return number

  number = number.split('').reverse().join('').match(/[0-9]{1,3}/g)

  return (number || [])
    .join('.')
    .split('')
    .reverse()
    .join('')
}
