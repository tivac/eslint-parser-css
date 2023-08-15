"use strict";

const postcss = require("postcss");
const scope = require("eslint-scope");

const { name, version } = require("./package.json");

const VISITOR_KEYS = {
    root : [ "nodes" ],
    atrule : [ "name", "params", "nodes" ],
    comment : [ "text" ],
    decl : [ "prop", "value" ],
    root : [ "nodes" ],
    rule : [ "selector", "nodes" ],
};

const sortByRange = ({ range : a }, { range : b }) => {
    if(a[0] !== b[0]) {
        return a[0] - b[0];
    }

    return a[1] - b[1];
}

const parseForESLint = (code, options) => {
    const ast = postcss.parse(code, { from : options.filePath });
    const tokens = [];
    const comments = [];

    let last;

    ast.walk((node) => {
        node.range = [ node.source.start.offset, node.source.end.offset ];
        node.loc = {
            source : node.toString(),
            start : node.source.start,
            end : node.source.end,
        };

        if(node.type === "comment") {
            comments.push(node);
        } else {
            tokens.push(node);
        }

        last = node;
    });

    ast.range = [ 0, last.source.end.offset ];
    ast.loc = {
        source : ast.source.input.css,
        start : ast.source.start,
        end : last.source.end,
    };
    ast.tokens = tokens.sort(sortByRange);
    ast.comments = comments.sort(sortByRange);

    const scopeManager = scope.analyze(ast, { childVisitorKeys : VISITOR_KEYS });

    // Set up global scope
    scopeManager.__nestGlobalScope(ast);

    return {
        ast : ast,
        visitorKeys : VISITOR_KEYS,
        scopeManager,
    }
};

module.exports = {
    meta : {
        name,
        version,
    },

    parseForESLint,
};
