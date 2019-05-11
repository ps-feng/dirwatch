# Dirwatch
Simple command line tool to watch files/directories and call a command when a change has been detected. Uses [Chokidar](https://github.com/paulmillr/chokidar) underneath. There's also [Chokidar-CLI](https://github.com/kimmobrunfeldt/chokidar-cli), which is a more complete version but doesn't provide an option to configure the `stabilityThreshold`.

I use it to watch a folder for syncing it with Google Drive.

# Usage
Clone repository and run `npm install`.

### See all the options
```bash
$ node index.js
```

### Watch a folder and run a command
```bash
$ node index.js <folder> -c <command>
```

### Building an executable binary
```bash
$ npm run build
$ ./dirwatch-linux  # will show the command help 
```

# LICENSE
MIT
