"use strict";
const js = require("@eslint/js");
const globals = require("globals");
const myConfig = require("@tivac/eslint-config");

module.exports = [
    {
        languageOptions : {
            globals : {
                ...globals.node,
                ...globals.nodeBuiltin,
            },

            parserOptions : {
                sourceType : "commonjs",
            },
        },
    },
    js.configs.recommended,
    myConfig,
];
