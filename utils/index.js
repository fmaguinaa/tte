import moment from 'moment'

const getCleanedFields = formValues => {
  return Object.keys(formValues).reduce((acc, key) => {
    const _acc = acc
    if (formValues[key] !== undefined) _acc[key] = formValues[key]
    return _acc
  }, {})
}

const isNumber = value => {
  return typeof value === 'number' && isFinite(value)
}

const reduce = json => {
  const variables = Object.keys(json).reduce((acc, key) => {
    const _acc = acc
    if (json[key] !== undefined && json[key] !== null) {
      if (moment.isMoment(json[key]) || isNumber(json[key])) {
        _acc[key] = json[key]
      } else {
        _acc[key] = json[key].replace(/\s+/gi, ' ').trim()
      }
    }
    return _acc
  }, {})

  return variables
}

const normalize = str => {
  if (typeof str === 'string') {
    return str
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  } else {
    return str
  }
}

export { getCleanedFields, isNumber, reduce, normalize }
