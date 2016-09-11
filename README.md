
# Grub

An opinionated full-stack build tool: based on Gulp, Babel, Browserify and Sass

## Install

```bash
npm install grub -g
```
## Use

```
grub [command] [folder]
```

Command and folder are optional.

Folder name is searched for in the current working directory and in `./projects`.

## Commands

**`dev`** (default)

- Build `client` and `server` folders, if either exists
- Start server with `nodemon`
  - If no `server` then start static file server for `client`
- Watch files for changes: compile and reload
  - Client files
    - HTML: Reload server and browser
    - CSS: Live-reload styles
    - JS, assets: Reload browser
  - Server files
    - Reload server and browser

**`build`**

- Build `client` and `server` folders for production

## Folder structure

The following folders are expected.

`assets` - Folders and files inside are copied to `build/client`

`build` - Result of build: `client` and `server`

`client`

All entry files below are required.

- `index.html`  -> EJS
- `index.js`    -> Browserify and Babel
- `index.scss`  -> Sass, auto-prefixer

`server`

Entry file `index.js` is required.

- *.js     -> Babel

`shared`

If a folder called `shared` is found in the current working directory, it is included in the `require` and `import` path for JS and Sass. This can be used by `client` files in `projects`.

## Options

`--quiet` - Quiet mode

## Babel presets

The following are included by default: `es2015` and `stage-0`.

## To do

- Configuration for build tasks
- `lint` with ESLint
- `test` with Ava
