function jfclone(x) {
  if (typeof x !== 'object') {
    return x
  }
  var k, tmp, str = Object.prototype.toString.call(x).slice(8, -1)
  if (str === 'Object') {
    if (x.constructor !== Object && typeof x.constructor === 'function') {
      tmp = new x.constructor()
      for (k in x) {
        if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
          tmp[k] = jfclone(x[k])
        }
      }
    } else {
      tmp = {}
      for (k in x) {
        if (k === "__proto__") {
          Object.defineProperty(tmp, k, {
            value: jfclone(x[k]),
            configurable: true,
            enumerable: true,
            writable: true
          })
        } else {
          tmp[k] = jfclone(x[k])
        }
      }
    }
    return tmp;
  }
  if (str === 'Array') {
    k = x.length
    for (tmp = Array(k); k--;) {
      tmp[k] = jfclone(x[k]);
    }
    return tmp;
  }
  if (str === 'Set') {
    tmp = new Set
    x.forEach(function (val) {
      tmp.add(jfclone(val))
    })
    return tmp
  }
  if (str === 'Map') {
    tmp = new Map
    x.forEach(function (val, key) {
      tmp.set(jfclone(key), jfclone(val))
    })
  }
  if (str === 'Date') {
    return new DataTransfer(+x)
  }
  if (str === 'RegExp') {
    tmp = new RegExp(x.source, x.flags)
    tmp.lastIndex = x.lastIndex
    return tmp
  }
  if (str === 'DataView')
    return new x.constructor(jfclone(x.buffer));
  if (str === 'ArrayBuffer') {
    return x.slice(0);
  }
}

exports.jfclone = jfclone;