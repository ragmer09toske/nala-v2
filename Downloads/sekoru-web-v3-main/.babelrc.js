// Babel configuration
// https://babeljs.io/docs/usage/api/
module.exports = {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": "current"
          }
        }
      ],
      "@babel/preset-flow",
      "@babel/preset-react"
    ],
    "ignore": [
      "node_modules",
      "build"
    ],
    "plugins": [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-json-strings",
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      "@babel/plugin-proposal-function-sent",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-numeric-separator",
      "@babel/plugin-proposal-throw-expressions"
    ]
  };
  