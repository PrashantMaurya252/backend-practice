const lodash = require('lodash')
const name = ['sangam','john','terry','alex','mia']

const capitalize = lodash.map(name,lodash.capitalize)

console.log(capitalize)