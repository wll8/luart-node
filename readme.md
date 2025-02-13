## luart

Facilitates interaction between luart and nodejs by extracting files from https://github.com/samyeyo/LuaRT/releases/ and packaging them as an npm package.

## Usage

Install like any other npm package, e.g., `npm i -g luart`.

After installation, the following commands are available:

- luart-node -- utility
- luart -- for running command-line programs
- wluart -- for running windowed programs
- rtc -- for compiling programs

If you need to configure the bin directory in environment variables, its location is `node_modules/luart/luaRT/bin/`.

For programmatic invocation:

```js
const { getPath } = require(`luart-node`)
getPath(`rtc`) // Pass in the command, returns the file path
```

Command line:

```txt
$ luart-node <v|version>
  Show version.
$ luart-node <gen> [vscode]
  Generate vscode configuration.
$ luart-node <c|compile> <path>
  Compile into an exe with all dependencies introduced.
```

## Development

```bat
:: Install dependencies
pnpm i

:: Development
pnpm dev

:: Build
pnpm build

:: Test
pnpm test

:: Generate npm package
pnpm pack
```