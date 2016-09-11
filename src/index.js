import path from 'path'
import minimist from 'minimist'
import logger from './utils/logger'
import findPaths from './utils/findPaths'

const options = minimist(process.argv.slice(2))
const args = options._

// ------------ Command ------------

const allowedCommands = ['dev', 'build']
let command = args[0]

if (command && allowedCommands.indexOf(command) >= 0) {
  args.shift()
} else command = 'dev'

// ------------ Config ------------

const root = process.cwd()
const src = args[0] ? args[0] : root

const paths = findPaths({ root, src })
const log = logger({ verbose: !options.quiet })
const relative = name => path.relative(paths.src, name)

const config = {
  ...paths,
  common: {
    root,
    dev: command==='dev',
    log,
    relative
  }
}

log.info('Command')
log(command, paths.src)

if (paths.client || paths.server) {
  require(`./commands/${command}`)(config)
} else {
  log.error('No client or server found')  
}
