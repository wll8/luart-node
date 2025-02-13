import cp from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as util from './src/util.js'
import process from 'node:process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

new Promise(async () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'))
  const luartVersion = pkg.luartVersion
  const path7za = await util.getPath7za()
  const fileName = `LuaRT-${luartVersion}-x86.zip`
  const exeName = fileName.replace(/.zip$/, `.exe`)

  util.exec(`echo npx shx rm -rf temp`)
  util.exec(`npx shx mkdir temp`)
  util.exec(`wget -c https://github.com/samyeyo/LuaRT/releases/download/v${luartVersion}/LuaRT-${luartVersion}-x86.zip`, {cwd: `./temp`})
  util.exec(`"${path7za}" e -aos "${fileName}" "${exeName}"`, {cwd: `./temp`})
  util.exec(`"${path7za}" e -aos "${exeName}" "luaRT.zip"`, {cwd: `./temp`})
  util.exec(`"${path7za}" x -y -aos "luaRT.zip" -o"luaRT"`, {cwd: `./temp`})
  util.exec(`npx shx rm -rf dist`)
  util.exec(`npx shx mkdir dist`)
  util.exec(`npx shx cp -r temp/luaRT dist/luaRT`)
  util.exec(`npx rollup --config rollup.config.js`)
})

