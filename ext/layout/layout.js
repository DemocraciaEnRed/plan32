
export function load (ctx, next) {
  document.body.classList.add('ext-layout')
  next()
}

export function unload (ctx, next) {
  document.body.classList.remove('ext-layout')
  next()
}
