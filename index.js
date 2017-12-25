'use strict';

var os = require('os');

var platform = os.platform();

var MAC = platform === 'darwin';

// const LINUX = platform === 'linux'

var keyPathVisitor = function keyPathVisitor(obj, path, setValue) {
    var pathLength = path.length;
    return path.reduce(function (pre, next) {
        if (pre !== setValue) {
            var preValue = pre;
            var nextvalue = preValue[next];
            return !nextvalue ? setValue || undefined : nextvalue;
        } else {
            return setValue || undefined;
        }
    }, obj);
};

module.exports = function (babel) {
    var t = babel.types,
        template = babel.template;


    var visitor = MAC ? {
        CallExpression: function CallExpression(path, state) {
            var node = path.node;
            var objectName = keyPathVisitor(node, ['callee', 'object', 'name']);
            var prototypeName = keyPathVisitor(node, ['callee', 'property', 'name']);
            if (objectName === 'console' && prototypeName === 'log') {
                path.remove();
            }
        }
    } : {};

    return {
        visitor: visitor
    };
};