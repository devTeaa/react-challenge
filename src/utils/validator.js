const emptyStringRegex = new RegExp(/^\s*$/)
const startWithEmptyStringRegex = new RegExp(/^\s/)

export const handleEmptyString = (value) => {
  if (emptyStringRegex.test(value)) {
    throw 'Must not empty'
  }
}

export const handleStartWithEmptyString = (value) => {
  if (startWithEmptyStringRegex.test(value)) {
    throw 'Must not start with empty string'
  }
}
