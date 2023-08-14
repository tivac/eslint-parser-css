"use strict";

console.log("rule");

module.exports = {
	meta : {
        messages : {
            // useDestructuring : `Destructure {{prop}} from store {{store}} for better change tracking`,
        },
    },

    create(context) {
        console.log("rule.create", context);

      	return {
            "declaration"(node) {
             	console.log(node);
            }
        };
    },
};