import path from 'path'
import fileExists from './fileExists'

export default function findPaths({ root, src }) {

  let paths = findPathsFrom(src)

  if (!paths.client && !paths.server && src!==root) {
    src = path.join(root, 'projects', src)
    paths = findPathsFrom(src)
  }

  return { root, src, ...paths }
}

function findPathsFrom(src) {

  let dest = path.join(src, 'build')

  let client = {
    src: path.join(src, 'client'),
    dest: path.join(dest, 'client')
  }

  let server = {
    src: path.join(src, 'server'),
    dest: path.join(dest, 'server')
  }

  let assets = {
    src: path.join(src, 'assets'),
    dest: client.dest
  }

  if (!fileExists(client.src)) client = false
  if (!fileExists(server.src)) server = false

  return { client, server, assets }
}
