'use strict'

exports.TOKENS = {
  DELIMITER_ONE: 'delimiter_one'
, DELIMITER_TWO: 'delimiter_two'
, STRING: 'string_one'
, FUNCTION: 'keyword_one'
, METHOD: 'keyword_two'
, BRACKET: 'bracket_one'
, BRACE: 'bracket_two'
, NUMBER: 'number_one'
, DECIMAL: 'number_one'
, FLOAT: 'number_one'
, SLASH_COMMENT: 'comment_one'
, POUND_COMMENT: 'comment_two'
, MULTI_COMMENT: 'comment_three'
, KEYWORD_ONE: 'keyword_one'
, KEYWORD_TWO: 'keyword_two'
, KEYWORD_THREE: 'keyword_three'
, REGEX: 'regex_one'
, SYMBOL: 'symbol_one'
, PROPERTY: 'property_one'
}

exports.BASIC_PATTERNS = {
  // Matches a C style single-line comment.
  SLASH_COMMENT: /(?:^|[^\\])\/\/.*$/gm

  // Matches a Perl style single-line comment.
, POUND_COMMENT: /#.*$/gm

  // Matches a C style multi-line comment
, MULTI_COMMENT: /\/\*[\s\S]*?\*\//gm

  // Matches a string enclosed by single quotes. Legacy.
, APOS_STRING: /'[^'\\]*(?:\\.[^'\\]*)*'/gm

  // Matches a string enclosed by double quotes. Legacy.
, QUOTED_STRING: /"[^"\\]*(?:\\.[^"\\]*)*"/gm

  // Matches a string enclosed by single quotes across multiple lines.
, MULTILINE_SINGLE_QUOTED_STRING: /'[^'\\]*(?:\\.[^'\\]*)*'/gm

  // Matches a string enclosed by double quotes across multiple lines.
, MULTILINE_DOUBLE_QUOTED_STRING: /"[^"\\]*(?:\\.[^"\\]*)*"/gm

  // Matches both.
, MULTILINE_STRING: /'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"/gm

  // Matches a string enclosed by single quotes.
, SINGLE_QUOTED_STRING: /'[^'\\\r\n]*(?:\\.[^'\\\r\n]*)*'/gm

  // Matches a string enclosed by double quotes.
, DOUBLE_QUOTED_STRING: /"[^"\\\r\n]*(?:\\.[^"\\\r\n]*)*"/gm

  // Matches both.
, STRING: /'[^'\\\r\n]*(?:\\.[^'\\\r\n]*)*'|"[^"\\\r\n]*(?:\\.[^"\\\r\n]*)*"/gm

  // Matches a PROPERTY: .property style.
, PROPERTY: /\.([\w]+)\s*/gi

  // Matches a method CALL: .methodName() style.
, METHOD_CALL: /\.([\w]+)\s*\(/gm

  // Matches a function CALL: functionName() style.
, FUNCTION_CALL: /\b([\w]+)\s*\(/gm

  // Matches any of the common brackets.
, BRACKET: /\{|}|\(|\)|\[|]/g

  // Matches integers, decimals, hexadecimals.
, NUMBER: /\b((?:(\d+)?\.)?[0-9]+|0x[0-9A-F]+)\b/gi
}
