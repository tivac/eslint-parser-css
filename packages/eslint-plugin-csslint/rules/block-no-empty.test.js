"use strict";

const { RuleTester } = require("eslint");

const rule = require("./block-no-empty.js");
const parser = require("../../eslint-parser-css/index.js");
    
RuleTester.describe = describe;
RuleTester.it = it;

const tester = new RuleTester({
    parser : require.resolve("../../eslint-parser-css/index.js"),
});

tester.run("block-no-empty", rule, {
    valid : [
        { code : ".a { color: red; }" },
        { code : ".a { /* */ }" },
        { code : "@media print { a { color: red; } }" },
    ],

    invalid : [{
        code : ".a {}",
        errors : [{ messageId : "empty-block" }],
    }],
});