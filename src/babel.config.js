import path from 'path'

// Used in: tasks/buildServer, tasks/js, and tasks/watch/server

const modulePath = m => path.join(__dirname, '../node_modules', m)

export default {
  presets: [
    modulePath('babel-preset-es2015'), modulePath('babel-preset-stage-0'),
  ]
}