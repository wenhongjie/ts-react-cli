#!/usr/bin/env node

const yargs = require('yargs')
const shell = require('shelljs')
const path = require('path')
const argv = yargs
  .command('dev', '开发构建', yargs => {
    if (!shell.which('node')) {
      shell.echo('请安装node')
      shell.exit(1)
    }
    shell.exec(`node ${require.resolve('../command/dev.js')}`)
  })
  .command('build', '生产构建', yargs => {
    if (!shell.which('node')) {
      shell.echo('请安装node')
      shell.exit(1)
    }
    shell.exec(`node ${require.resolve('../command/build.js')}`)
  })
  .argv