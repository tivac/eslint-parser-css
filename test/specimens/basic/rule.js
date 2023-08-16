"use strict";

console.log("rule loaded");

module.exports = {
	meta : {
        messages : {
            // useDestructuring : `Destructure {{prop}} from store {{store}} for better change tracking`,
        },
    },

    create(context) {
        console.log("rule.create", context);

      	return {
            [`decl[value="red"]`](node) {
             	console.log(node);
            }
        };
    },
};