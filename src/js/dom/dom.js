export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let classString = el.className.split(' ')
  classString.push(className)
  let newclass = classString.join(' ')
  el.className = newclass
}
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
export function getData (el, name, value) {
  const pre = 'data-'
  let na = pre + name
  if (!value) {
    return el.getAttribute(na)
  } else {
    return el.setAttribute(na, value)
  }
}

export function debounce (func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
