'use strict'

const fs = require('fs')
const util = require('util')
const Language = require('./lib/lang/javascript')
const constants = require('./lib/constants')
const lang = new Language(fs.readFileSync('timer.js', 'utf8'))
const tokens = lang.tokens

console.log(tokens, {colors: true, depth: 3})

console.log(constants.BASIC_PATTERNS.STRING.exec(lang.code))
