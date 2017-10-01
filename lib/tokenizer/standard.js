'use strict'

const unist = require('unist-builder')

module.exports =
class Tokenizer {
  tokenize(lang, code) {
    let last_token = 0
    const tokens = []
    const rules = lang.rules
    let raw = this.getPreprocessedTokens()

    for (const rule of rules) {
      let match
      while(match = rule.pattern.exec(code)) {
        rule.pattern.lastIndex = match.index + 1
        if (match.length === 1) {
          raw.push(_token(rule.token, {
            index: match.index
          , alias: rule.alias
          }, match[0]))
          continue
        }

        for (var idx = 1; idx < match.length; idx++) {
          if (match[idx] && match[idx].length) {
            raw.push(_token(rule.token, {
              index: match.index + match[0].indexOf(match[idx])
            , alias: rule.alias
            }, match[idx]))
          }
        }
      }
    }

    raw = raw.sort((a, b) => {
      return a.index - b.index
    })

    for (var t = 0; t < raw.length; t++) {
      const token = raw[t]
      if (last_token < token.index) {
        tokens.push(
          _token('text', {
            index: last_token
          , alias: 'punctuation'
          }, code.substring(last_token, token.index))
        )

        tokens.push(token)
        last_token = token.end
      }

      let next_token = false
      for (var j = t + 1; j < raw.length; j++) {
        const joken = raw[j]
        if (joken.index >= last_token) {
          t = j-1
          next_token = true
          break
        }
      }
      if (!next_token) break
    }
    return tokens
  }

  getPreprocessedTokens() {
    return []
  }
  static token(name, props, value) {
    return _token(name, props, value)
  }
}


function _token(name, props, value) {
  return unist(name, {
    end: value.length + props.index
  , length: value.length
  , value: value
  , name: name
  , ...props
  }, value)
}
