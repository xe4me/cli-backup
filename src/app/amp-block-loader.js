"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
(function (BlockLayout) {
    BlockLayout[BlockLayout["INLINE"] = 0] = "INLINE";
    BlockLayout[BlockLayout["PAGE"] = 1] = "PAGE";
    BlockLayout[BlockLayout["SECTION"] = 2] = "SECTION";
})(exports.BlockLayout || (exports.BlockLayout = {}));
var BlockLayout = exports.BlockLayout;
(function (RequireMethod) {
    RequireMethod[RequireMethod["ALL"] = 0] = "ALL";
    RequireMethod[RequireMethod["IN_ORDER"] = 1] = "IN_ORDER";
})(exports.RequireMethod || (exports.RequireMethod = {}));
var RequireMethod = exports.RequireMethod;
var AmpBlockLoader = (function () {
    function AmpBlockLoader(viewContainer, compiler, formSectionService, componentResolver) {
        this.viewContainer = viewContainer;
        this.compiler = compiler;
        this.formSectionService = formSectionService;
        this.componentResolver = componentResolver;
        this.fdn = [];
        this.requireMethod = RequireMethod[RequireMethod.IN_ORDER];
        this.loaded = new core_1.EventEmitter();
        this._hasLoadedOnce = false;
        this.blocksCount = 0;
        this.retrievedFiles = [];
        this._blocks = [];
    }
    AmpBlockLoader.prototype.ngOnChanges = function (changes) {
        if (!this._hasLoadedOnce && changes.blockLoader) {
            this.loadAndCreate(changes.blockLoader.currentValue, this.requireMethod);
            this._hasLoadedOnce = true;
        }
        return undefined;
    };
    AmpBlockLoader.prototype.createComponent = function (_loadedComponent, _index) {
        var _this = this;
        return this.componentResolver
            .resolveComponent(_loadedComponent)
            .then(function (componentFactory) {
            return _this.viewContainer.createComponent(componentFactory, _index);
        });
    };
    AmpBlockLoader.prototype.removeAt = function (_index) {
        this.viewContainer.remove(_index);
    };
    AmpBlockLoader.prototype.loadAt = function (_def, _index) {
        var _this = this;
        var waitForChunk = this.requireFile(_def);
        waitForChunk(function (file) {
            Object.keys(file).map(function (_file) {
                _this.createComponent(file[_file], _index)
                    .then(function (componentRef) {
                    if (_index === (_this._blocks.length - 1)) {
                        _this.emitLoadedAll();
                    }
                    _this.copyFormBlockDefProperty(componentRef, _def, _index);
                });
            });
        });
    };
    AmpBlockLoader.prototype.getCommonBundle = function (path) {
        try {
            return require('bundle!amp-ddc-components/src/app/' + path + '\.ts');
        }
        catch (err) {
            console.log('Oops!! Trying to load components from node_modules but not components found.');
        }
        return null;
    };
    AmpBlockLoader.prototype.loadAndCreate = function (formDef, _requireMethod) {
        this._blocks = formDef.blocks;
        if (!this._blocks) {
            return;
        }
        this.blocksCount = this._blocks.length;
        var _blockName = formDef.name;
        if (_blockName && this.fdn.indexOf(_blockName) < 0) {
            this.fdn.push(_blockName);
        }
        for (var _index = 0; _index < this._blocks.length; _index++) {
            if (_requireMethod === RequireMethod.ALL) {
                this.loadAllAt(this._blocks[_index], _index);
            }
            else {
                this.loadAt(this._blocks[_index], _index);
            }
        }
    };
    AmpBlockLoader.prototype.registerSection = function (_section) {
        this.formSectionService.registerSection(_section);
    };
    AmpBlockLoader.prototype.copyFormBlockDefProperty = function (_componentRef, _blockDef, _index) {
        var _this = this;
        var _fdn = this.fdn.concat(_blockDef.name ? [_blockDef.name] : []);
        _componentRef.instance.__child_blocks = _blockDef;
        _componentRef.instance.__form = this.form;
        _componentRef.instance.__fdn = _fdn;
        _blockDef.__fdn = _fdn;
        if (_blockDef.name) {
            var _form_1 = _componentRef.instance.__form;
            _componentRef.instance.__controlGroup = new forms_1.FormGroup({});
            _componentRef.instance.__controlGroup.__prettyName = _blockDef.prettyName || _blockDef.name;
            _componentRef.instance.__controlGroup.__reviewTemplate = _blockDef.reviewTemplate;
            for (var i = 0; i < this.fdn.length; i++) {
                if (_form_1.controls[this.fdn[i]]) {
                    _form_1 = _form_1.controls[this.fdn[i]];
                }
            }
            _form_1.addControl(_blockDef.name, _componentRef.instance.__controlGroup);
            _componentRef.onDestroy(function () {
                _form_1.removeControl(_blockDef.name);
            });
        }
        if (_blockDef.blockLayout === BlockLayout[BlockLayout.SECTION]) {
            this.registerSection(_blockDef);
        }
        _componentRef.instance.__path = _blockDef.path;
        _componentRef.instance.__blockType = _blockDef.blockType;
        _componentRef.instance.__blockLayout = _blockDef.blockLayout;
        _componentRef.instance.__name = _blockDef.name;
        if (_blockDef.blockLayout === BlockLayout[BlockLayout.PAGE]) {
            _componentRef.instance.__page = _blockDef.page;
        }
        _componentRef.instance.__custom = _blockDef.custom;
        _componentRef.instance.__loadNext = function (_def, _viewContainerRef) {
            _this.loadNext(_def, _viewContainerRef);
        };
        _componentRef.instance.__loadAt = function (_def, index) {
            _this.loadAt(_def, index);
        };
        _componentRef.instance.__removeAt = function (index) {
            _this.removeAt(index);
        };
        _componentRef.instance.__removeNext = function (_viewContainerRef) {
            _this.removeNext(_viewContainerRef);
        };
        _componentRef.changeDetectorRef.detectChanges();
    };
    AmpBlockLoader.prototype.loadAllAt = function (_def, _index) {
        var _this = this;
        this.retrievedFiles[_index] = null;
        var waitForChunk = this.requireFile(_def);
        waitForChunk(function (file) {
            Object.keys(file).map(function (_file) {
                _this.storeFile(file[_file], _def, _index);
                if (_this.retrievedFiles.length === _this.blocksCount) {
                    _this.createAllRecursively(0);
                }
            });
        });
    };
    AmpBlockLoader.prototype.requireFile = function (_def) {
        var myChunk = null;
        var waitForChunk = null;
        if (_def.commonBlock) {
            if (_def.blockLayout) {
                waitForChunk = this.getCommonBundle(_def.path);
            }
        }
        else {
            myChunk = this.getCustomBundle(_def.path);
        }
        if (myChunk) {
            return function (_callback) {
                _callback(myChunk);
            };
        }
        return waitForChunk;
    };
    AmpBlockLoader.prototype.storeFile = function (file, block, _index) {
        this.retrievedFiles[_index] = {
            file: file,
            blockDef: block
        };
    };
    AmpBlockLoader.prototype.createAllRecursively = function (_index) {
        var _this = this;
        this.createComponent(this.retrievedFiles[_index].file, _index)
            .then(function (componentRef) {
            if (_index === (_this._blocks.length - 1)) {
                _this.emitLoadedAll();
            }
            _this.copyFormBlockDefProperty(componentRef, _this.retrievedFiles[_index].blockDef, _index);
            _index += 1;
            if (_index < _this.blocksCount) {
                _this.createAllRecursively(_index);
            }
        });
    };
    AmpBlockLoader.prototype.emitLoadedAll = function () {
        var _this = this;
        setTimeout(function () {
            _this.loaded.emit('loaded');
            _this.retrievedFiles = [];
        });
    };
    AmpBlockLoader.prototype.getViewRefOfViewContainerRef = function (_viewContainerRef) {
        return _viewContainerRef._element.parentView.ref;
    };
    AmpBlockLoader.prototype.loadNext = function (_def, _viewContainerRef) {
        var index = this.getIndexOfComponent(_viewContainerRef);
        if (index !== undefined) {
            index++;
        }
        this._blocks.splice(index, 0, _def);
        this.loadAt(_def, index);
    };
    AmpBlockLoader.prototype.getIndexOfComponent = function (_viewContainerRef) {
        var viewRef = this.getViewRefOfViewContainerRef(_viewContainerRef);
        return this.viewContainer.indexOf(viewRef);
    };
    AmpBlockLoader.prototype.removeNext = function (_viewContainerRef) {
        var index = this.getIndexOfComponent(_viewContainerRef);
        if (index !== undefined) {
            index++;
        }
        this._blocks.splice(index, 1);
        this.removeAt(index);
    };
    AmpBlockLoader = __decorate([
        core_1.Directive({
            selector: '[amp-block-loader]'
        })
    ], AmpBlockLoader);
    return AmpBlockLoader;
}());
exports.AmpBlockLoader = AmpBlockLoader;
