'use strict'

const Language = require('./generic')
const {TOKENS, BASIC_PATTERNS} = require('../constants')

module.exports =
class Javascript extends Language {
  constructor(code, opts = {}) {
    super(code, opts)
  }

  get keywords() {
    if (this._keywords) return this._keywords
    const kw = (super.keywords)
    kw.set('reserved', {
      csv: 'as, break, symbol, case, catch, continue, delete, do, else, eval, finally, for, if, in, is, instanceof, return, switch, this, throw, try, typeof, void, while, write, with'
    , alias: TOKENS.KEYWORD_ONE
    , token: 'keyword'
    })
    kw.set('language', {
      csv: 'class, const, default, debugger, export, extends, false, function, import, namespace, new, null, package, private, protected, public, super, true, var, let'
    , alias: TOKENS.KEYWORD_TWO
    , token: 'keyword'
    })
    kw.set('browser', {
      csv: 'alert, confirm, open, print, prompt, document, browser'
    , alias: TOKENS.KEYWORD_THREE
    , token: 'keyword'
    })
    return kw
  }

  get patterns() {
    if (this._patterns) return this._patterns
    return new Set([
     {
        pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+)\b/gi
      , alias: TOKENS.NUMBER
      , token: 'number'
      }, {
        pattern: this._delimiterToExp("/", "\\", "/", "g", "[gimy]*")
      , alias:   TOKENS.REGEX
      , token: 'regex'
      }
    
    , { pattern: BASIC_PATTERNS.STRING, alias: TOKENS.STRING, token: 'string' }
    , { pattern: BASIC_PATTERNS.FUNCTION_CALL, alias: TOKENS.FUNCTION, token: 'keyword' }
    , { pattern: BASIC_PATTERNS.METHOD_CALL, alias: TOKENS.METHOD, token: 'keyword'  }
    , { pattern: BASIC_PATTERNS.BRACKET, alias: TOKENS.BRACKET, token: 'punctuation' }
    , { pattern: BASIC_PATTERNS.NUMBER, alias: TOKENS.NUMBER, token: 'number' }
    , { pattern: BASIC_PATTERNS.MULTI_COMMENT, alias: TOKENS.MULTI_COMMENT, token: 'comment' }
    , { pattern: BASIC_PATTERNS.SLASH_COMMENT, alias: TOKENS.SLASH_COMMENT, token: 'comment' }
    ]
    )
  }
}
