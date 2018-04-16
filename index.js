/* Copyright 2018 Spirytoos

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

exports.momentImmutableMethods = function(moment) {
    if (typeof moment !== 'function')
        throw Error("You need to provide moment as an argument.");
    // doNotAttachMethods is list of methods that we dont want to have immutable versions. 
    // There probably should be more so feel free to extend it, create pull request and we can merge it into repo
    var doNotAttachMethods = ['clone', 'format'];
    var momentProto = moment().constructor.prototype;
    Object.keys(moment.fn).map(function(key) {
        if (typeof moment.fn[key] === 'function' && typeof momentProto[key + 'Immu'] === 'undefined' && doNotAttachMethods.indexOf(key) === -1) {
            momentProto[key + 'Immu'] = function() {
                var clonedMoment = this.clone();
                return moment.fn[key].apply(clonedMoment, [].slice.apply(arguments));
            };
        }
    });
    return moment;
};