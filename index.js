const debounce = require('lodash.debounce')
const chokidar = require('chokidar')
const exec = require('child_process').exec
const argv = require('yargs')
  .command('$0 <path>', 'Watch directory and execute a command on any change', (yargs) => {
    yargs.positional('path', {
      describe: 'Path to directory to be watched',
      type: 'string'
    })
  })
  .option('command', {
    alias: 'c',
    demandOption: true,
    describe: 'Command to be executed when changes are detected',
    type: 'string'
  })
  .option('debounce', {
    alias: 'd',
    default: 10000,
    describe: 'Time in ms to wait since the last detected change before calling the command',
    type: 'number'
  })
  .option('threshold', {
    alias: 't',
    default: 2000,
    describe: 'Time in ms for a file size to remain constant before detecting it as a change',
    type: 'number'
  })
  .argv

const log = console.log.bind(console)
const debouncedCmd = debounce(() => {
  exec(argv.command, (error, stdout, stderr) => {
    console.log(`${stdout}${stderr}`)
    if (error !== null) {
      console.log(`exec error: ${error}`)
    }
  })
}, argv.debounce)

log(`Watching file changes in '${argv.path}'`)

chokidar.watch(argv.path, {
  ignored: /(^|[/\\])\../, // ignores .dotfiles
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: argv.threshold
  }
}).on('all', (event, path) => {
  debouncedCmd()
})
