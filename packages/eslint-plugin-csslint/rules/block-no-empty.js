"use strict";

module.exports = {
	meta : {
        messages : {
            "empty-block" : `Empty block found`,
        },
    },

    create(context) {
      	return {
            [`rule`](node) {
             	if(node.nodes.length > 0) {
                    return;
                }

                return context.report({
                    node,
                    messageId : "empty-block"
                });
            }
        };
    },
};