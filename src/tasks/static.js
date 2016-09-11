import http from 'http'
import nodeStatic from 'node-static'

module.exports = function({ src, port = 3000, dev = false, log, relative }) {

  // Reference: https://github.com/cloudhead/node-static

  const staticServer = new nodeStatic.Server(src, { cache: !dev })

  http.createServer((req, res) => {
    req.addListener('end', function () {
        staticServer.serve(req, res)
    }).resume()
  }).listen(port)

  log('Static', `Serving at localhost:${port} from ${relative(src)}`)
}
