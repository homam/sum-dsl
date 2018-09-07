/**
 * @author Audi Nugraha <audinue@gmail.com>
 * @license MIT
 */

const sum = () => new Proxy({}, {
  get(_, name) {
    const type = eval(`(class ${name} extends Array {})`)
    return (...args) => type.of(...args)
  }
})

const match = map => value => {
  const key = value.constructor.name
  return map.hasOwnProperty('_')
    ? map.hasOwnProperty(key)
      ? map[key](...value)
      : map._(value)
    : map[key](...value)
}

exports.sum = sum
exports.match = match
