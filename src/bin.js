#!/usr/bin/env node

import process from 'node:process'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import * as util from "./util.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

new Promise(async () => {
  const shelljs = require('shelljs')
  const pkg = require('../package.json')
  const argv = util.parseArgv()
  let [run, arg, ...argMore] = process.argv.slice(2)
  if(!run) {
    console.log(`
      luart ${pkg.luartVersion}
      ${pkg.name} ${pkg.version}

      Usage:
        $ ${pkg.name} <v|version>
          Show version.
        $ ${pkg.name} <gen> [vscode]
          Generate vscode configuration.
        $ ${pkg.name} <c|compile> <path>
          Compile into an exe with all dependencies introduced. 
    `)
  }
  if(run === `gen`) {
    arg = arg || `vscode`
    if(arg === `vscode`) {
      if(fs.existsSync(`.vscode`)) {
        console.log(`.vscode already exists, please delete it first.`)
      } else {
        shelljs.cp(`-r`, `${__dirname}/.vscode`, `.vscode`)
      }
    }
  }
  if([`v`, `version`].includes(run)) {
    console.log(`luart ${pkg.luartVersion}`)
    console.log(`${pkg.name} ${pkg.version}`)
  }
  if([`c`, `compile`].includes(run)) {
    const argStr = [arg, ...argMore].map(item => `"${item}"`).join(` `)
    const cmd = `rtc -w -lnet -ljson -lcrypto -lwebview -lcanvas -laudio -lsqlite -lini -lsysutils -lc -lkeyboard ${argStr}`
    util.exec(cmd)
  }
})