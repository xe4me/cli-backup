"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('@angular/common/src/facade/lang');
function AmpComponent(annotation) {
    return function (target) {
        var parentTarget = Object.getPrototypeOf(target.prototype).constructor;
        var parentAnnotations = Reflect.getMetadata('annotations', parentTarget);
        var parentAnnotation = parentAnnotations[0];
        Object.keys(parentAnnotation).forEach(function (key) {
            if (parentAnnotation[key]) {
                if (lang_1.isArray(annotation[key])) {
                    annotation[key] = annotation[key].concat(parentAnnotation[key]);
                }
                else {
                    if (key !== 'selector') {
                        annotation[key.replace('_', '')] = parentAnnotation[key];
                    }
                }
            }
        });
        var metadata = new core_1.ComponentMetadata(annotation);
        Reflect.defineMetadata('annotations', [metadata], target);
    };
}
exports.AmpComponent = AmpComponent;
