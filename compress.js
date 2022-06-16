//Adapted from 
const brotli = require('brotli')
const fs = require('fs')

const brotliSettings = {
  extension: 'br',
  skipLarger: true,
  mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
  quality: 11, // 0 - 11,
  lgwin: 12 // default
}

const textExtensions = ["js", "css", "html", "json", "txt"]

const rootDir = 'dist/';
let count = 0;
fs.readdirSync(rootDir).forEach(sub => {
  const dir = rootDir + sub + "/";
  fs.readdirSync(dir).forEach(file => {
    if (textExtensions.find(it => file.endsWith(`.${it}`))) {
      count++;
      const result = brotli.compress(fs.readFileSync(dir + file), brotliSettings)
      fs.writeFileSync(dir + file + '.br', result)
    }
  })
})
console.log(`Comprimidos ${count} archivos a brotli!`)
