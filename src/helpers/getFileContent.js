const execFile = require('child_process').execFile
const path = require('path')

export default async function getFileContent (file) {
  return new Promise((resolve, reject) => {
    let filePath = path.resolve('./bin/xdoc2txt.exe')
    execFile(filePath, ['-8', file.path], { maxBuffer: Infinity }, (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}