import chalk from 'chalk'

export default function createLogger(options) {

  let log = (name, ...args) => {
    options.verbose && console.log(chalk.blue(`  ${name}`)+':', ...args)
  }

  log.info = (name, ...args) => {
    options.verbose && console.log(chalk.green(name)+':', ...args)
  }

  log.error = (name, ...args) => {
    console.error(chalk.red(name))
    if (args.length) console.log(...args)
  }

  return log
}
