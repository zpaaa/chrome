// 防抖
function debounce (fn, delay){
  // 利用闭包保存定时器
  let timer = null
  return function () {
    let context = this
    let arg = arguments
    // 在规定时间内再次触发会先清除定时器后再重设定时器
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, arg)
    }, delay)
  }
}

function throttle(cb, wait, options) {
  let previous = 0;
  let timer, that, args;
  if (!options) options = {}

  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timer = null
    cb.apply(that, args)
    if (!timer) {
      that = args = null
    }
  }

  var throttled = function () {
    let now = new Date().getTime()
    if (!previous && options.leading === false) {
      previous = now
    }
    let remaining = wait - (new Date().getTime() - previous);
    that = this
    args = arguments

    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      previous = now
      cb.apply(that, args)
      if (!timer) {
        that = args = null
      }
    } else if (!timer && options.trailing !== false) {
      timer = setTimeout(later, remaining)
    }
  }
  // throttled.cancel = function () {
  //   clearTimeout(timer);
  //   previous = 0;
  //   timer = null;
  // }
  return throttled
}

export {
  debounce,
  throttle,
}
