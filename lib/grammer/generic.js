'use strict'

const {TOKENS, BASIC_PATTERNS} = require('../constants')
const tokenizers = require('../tokenizer')

module.exports =
class Language {
  constructor(code, opts = {}) {
    const tokenizer_type = [opts.tokenizer || 'standard']
    const Tokenizer = tokenizers[tokenizer_type]

    if (!Tokenizer) {
      const error = new Error(`Unknown tokenizer type ${tokenizer_type}`)
      error.code = 'ENOTOKENIZER'
      error.name = 'LaguageTokenizerError'
      throw error
    }

    if (typeof Tokenizer !== 'function') {
      const error = new TypeError(`Tokenizer ${tokenizer_type} must be a function`)
      throw error
    }

    this.code = code
    this.tokenizer = new Tokenizer()
    this._rules = this.rules
    this._patterns = this.patterns
    this._delimiters = this.delimiters
    this._keywords = this.keywords

    if (this._delimiters.start){
      this._rules.add({
        pattern: this._delimiters.start
      , alias: TOKENS.DELIMITER_ONE
      , token: 'delimiter'
      })
    }

    if (this._delimiters.end){
      this._rules.add({
        pattern: this._delimiters.end
      , alias: TOKENS.DELIMITER_TWO
      , token: 'delimiter'
      })
    }

    for (const [name, keyword_set] of this.keywords) {
      if (keyword_set.csv){
        this._rules.add({
          pattern: this._csvToExp(keyword_set.csv, keyword_set.mod || 'g')
        , alias: keyword_set.alias
        , token: keyword_set.token
        })
      }
    }

    for (const pattern of this._patterns) {
      this._rules.add(pattern)
    }

  }

  get patterns() {
    if (this._patterns) return this._patterns
    return new Set([
      { pattern: BASIC_PATTERNS.STRING, alias: TOKENS.STRING, token: 'string' }
    , { pattern: BASIC_PATTERNS.FUNCTION_CALL, alias: TOKENS.FUNCTION, token: 'keyword' }
    , { pattern: BASIC_PATTERNS.METHOD_CALL, alias: TOKENS.METHOD, token: 'keyword'  }
    , { pattern: BASIC_PATTERNS.BRACKET, alias: TOKENS.BRACKET, token: 'punctuation' }
    , { pattern: BASIC_PATTERNS.NUMBER, alias: TOKENS.NUMBER, token: 'number' }
    , { pattern: BASIC_PATTERNS.MULTI_COMMENT, alias: TOKENS.MULTI_COMMENT, token: 'comment' }
    , { pattern: BASIC_PATTERNS.SLASH_COMMENT, alias: TOKENS.SLASH_COMMENT, token: 'comment' }
    , { pattern: BASIC_PATTERNS.POUND_COMMENT, alias: TOKENS.POUND_COMMENT, token: 'comment' }
    ])
  }

  get tokens() {
    return this.tokenizer.tokenize(this, this.code)
  }

  get keywords() {
    if (this._keywords) return this._keywords
    return new Map()
  }
  get rules() {
    if (this._rules) return this._rules
    return new Set()
  }

  get delimiters (){
    if (this._delimiters) return this._delimiters
    return {start: null, end: null}
  }

  rule(name) {
    return this.rules.get(name)
  }

  _delimiterToExp(start, esc, end, mod, suffix) {
    const _start = _escapeRegex(start)
    const _esc = esc ? _escapeRegex(esc) : null
    const _end = end ? _escapeRegex(end) : _start

    const pattern = (_esc)
      ? `${_start}[^$${_end}${_esc}\\n]*(?:${_esc}.[^${_end}${_esc}\\n]*)*${_end}`
      : `${_start}[^${_end}\\n]*${_end}`

    return new RegExp(
      `${pattern}${suffix || ''}`
    , mod || ''
    )
  }

  _csvToExp(csv, mod) {
    return new RegExp(
      `\\b(${csv.replace(/,\s*/g, '|')})\\b`
      , mod
    )
  }

  _strictRegExp(...args) {
    let exp = ''
    for (let idx = 0; idx < args.length; idx++) {
      exp += _escapeRegex(args[idx])
      exp += (idx < args.length - 1) ? '|' : ''
    }

    return new RegExp(`(${exp})`, 'gim')
  }
}

function _escapeRegex(str) {
  return ('' + str).replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1')
}
