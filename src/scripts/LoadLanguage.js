// const glob = require("glob");
// const Promise = require("bluebird");
const glob = require('glob')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

const langs = glob.sync('**/*.lang.json')

let exportString = `/* eslint-disable max-len */
const resources = {\n`

Promise.each(langs, (lang) => {
  const langFM = lang.replace('src', '~')
  exportString += `"${lang}": import("${langFM}\"),\n`
}).then(() => {
  exportString += `};\n\nexport default resources;
`
  fs.writeFileAsync('src/translations/resources.js', exportString)
  console.log('File written successfully\n')
})
