"use strict";

const parser = require("../../../index.js");

const rule = require("./rule.js");

module.exports = [
    {
        files : [ "**/*.css" ],
        
        languageOptions : {
            parser,
        },
        
        plugins : {
            custom : {
                rules : {
                    rule,
                },
            },
        },

        rules : {
            "custom/rule" : "error",
        }
    },
];
