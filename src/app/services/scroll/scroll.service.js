"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ScrollService = (function () {
    function ScrollService(_dom, _renderer) {
        this._dom = _dom;
        this._renderer = _renderer;
        this.margin = 10;
        this._window = window;
        this.$scrolled = new core_1.EventEmitter();
        this.$scrolling = new core_1.EventEmitter();
    }
    ScrollService.prototype.getMyScrolTop = function (el) {
        return el.nativeElement.scrollTop;
    };
    ScrollService.prototype.getMyOffsetTop = function (el) {
        return el.nativeElement.offsetTop;
    };
    ScrollService.prototype.getMyWindowOffset = function (el) {
        return this.getMyOffsetTop(el) - this._window.scrollY;
    };
    /*
     *TODO: Find another better way to get all the components avaliable in dome to prevent this direct access
     */
    ScrollService.prototype.scrollToNextUndoneBlock = function (formModel, fdn) {
        var isScrolled = false;
        var body = this._dom.query('body');
        var components = this._dom.querySelectorAll(body, '[id$="-block"]');
        for (var i = 0; i < components.length; i++) {
            var selectorName = components[i].id;
            if (fdn) {
                var fullName = fdn.fromString(selectorName.slice(0, selectorName.length - ('_-block'.length)));
                var controlGroup = formModel.getControlGroup(fullName);
                if (!isScrolled && controlGroup && !controlGroup.valid) {
                    this.scrollToComponentSelector(selectorName);
                    isScrolled = true;
                    return fullName;
                }
            }
            else {
                var _fdnOfSelectorName = selectorName.split('-');
                _fdnOfSelectorName.pop();
                var formGroup = formModel;
                for (var i_1 = 0; i_1 < _fdnOfSelectorName.length; i_1++) {
                    if (formGroup.controls[_fdnOfSelectorName[i_1]]) {
                        formGroup = formGroup.controls[_fdnOfSelectorName[i_1]];
                    }
                }
                if (!isScrolled && !formGroup.valid) {
                    this.scrollToComponentSelector(selectorName);
                    isScrolled = true;
                    return null;
                }
            }
        }
        if (!isScrolled) {
            this.scrollToLastBlock(components);
        }
        return null;
    };
    ScrollService.prototype.scrollToComponentSelector = function (componentSelector, easing, margin) {
        var _this = this;
        if (easing === void 0) { easing = 'easeInQuad'; }
        if (margin === void 0) { margin = 80; }
        var element = this._dom.query(componentSelector);
        if (!element) {
            // **20-June-2016 upgraded Angular RC.2, DCL loadIntoLocation no longer exists, LoadAsRoot does not keep the host element, so look for it in the class.
            element = this._dom.query('#' + componentSelector);
        }
        var options = {
            duration: 800,
            easing: easing,
            offset: margin,
            callbackBefore: function (elemt) {
                _this.$scrolling.emit(_this.getGroupNameOfSelectorName(componentSelector));
            },
            callbackAfter: function (elemt) {
                // this.$scrolled.emit( this.getGroupNameOfSelectorName( componentSelector ) );
                _this.$scrolled.emit(componentSelector);
            }
        };
        setTimeout(function () {
            _this.smoothScroll(element, options);
        }, 0);
    };
    ScrollService.prototype.scrollToComponentByClassName = function (componentName) {
        var selectorName = this.getSelectorNameOfClassName(componentName);
        this.scrollToComponentSelector(selectorName);
    };
    ScrollService.prototype.scrollToComponentByGroupName = function (componentGroupName) {
        var selectorName = this.getSelectorNameOfGroupName(componentGroupName);
        this.scrollToComponentSelector(selectorName);
    };
    ScrollService.prototype.scrollMeOut = function (el, easing, margin) {
        var _this = this;
        if (easing === void 0) { easing = 'easeInQuad'; }
        if (margin === void 0) { margin = 0; }
        var parentElem = el.nativeElement.offsetParent;
        var style = window.getComputedStyle(parentElem);
        var element = el.nativeElement;
        var top = element.offsetTop;
        if (style.getPropertyValue('position') && style.getPropertyValue('position') === 'relative' && parentElem.id !== 'scroll-root') {
            top += parentElem.offsetTop;
        }
        var height = element.offsetHeight;
        var bottom = top + height + margin;
        var options = {
            duration: 800,
            easing: easing,
            offset: -bottom,
            callbackBefore: function (elemt) {
            },
            callbackAfter: function (elemt) {
            }
        };
        setTimeout(function () {
            _this.smoothScroll(el, options);
        }, 0);
    };
    ScrollService.prototype.amIVisible = function (el, CLASS_NAME) {
        if (this.scrollTop === this.lastScrollPosition) {
            return;
        }
        var element = el.nativeElement;
        var elementBottom = element.offsetTop + element.offsetHeight;
        var elementTop = element.offsetTop;
        var windowTop = this.scrollTop;
        var windowBottom = windowTop + this.windowHeight;
        if (elementBottom === 0 || element.style.opacity === 0) {
            return;
        }
        var isInView = ((elementBottom <= windowBottom - this.margin) && (elementTop >= windowTop));
        // if ( isInView === false ) {
        //     //Check for both side bleeding
        //     isInView = ((elementBottom >= windowBottom  ) && ( elementTop <= windowTop));
        //     if(isInView===false){
        //         //check for top bleeding
        //         if(elementBottom >= windowBottom){
        //
        //         }
        //         isInView = ((elementBottom >= windowBottom  ) && ( elementTop <= windowTop));
        //     }
        //     if ( isInView === true ) {
        //     }
        // }
        if (isInView) {
            this.lastScrollPosition = this.scrollTop;
        }
        return isInView;
    };
    ScrollService.prototype.scrollToLastBlock = function (components) {
        this.scrollToComponentSelector(components[components.length - 1].id);
    };
    ScrollService.prototype.splitStringByCapital = function (str) {
        return str.split(/(?=[A-Z])/);
    };
    ScrollService.prototype.getSelectorNameOfClassName = function (className) {
        var split = this.splitStringByCapital(className);
        split.pop();
        return split.join('-').toLowerCase();
    };
    ScrollService.prototype.getGroupNameOfSelectorName = function (className) {
        return this.camelCaseAndStripDash(className);
    };
    ScrollService.prototype.getSelectorNameOfGroupName = function (className) {
        var split = this.splitStringByCapital(className);
        return split.join('-').toLowerCase();
    };
    Object.defineProperty(ScrollService.prototype, "scrollTop", {
        /*
         *   NOTE:
         *   Make sure to fix bellow code , I don't know what's the best way of getting
         *   document.documentElement.scrollTop;yet
         * */
        get: function () {
            return this._window.pageYOffset || document.documentElement.scrollTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollService.prototype, "windowHeight", {
        get: function () {
            return this._window.innerHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollService.prototype, "documentHeight", {
        get: function () {
            return this._dom.query('body').innerHeight;
        },
        enumerable: true,
        configurable: true
    });
    ScrollService.prototype.smoothScroll = function (element, options) {
        options = options || {};
        var classInstance = this;
        // Options
        var duration = options.duration || 800;
        var offset = options.offset || 0;
        var easing = options.easing;
        var callbackBefore = options.callbackBefore || function () { };
        var callbackAfter = options.callbackAfter || function () { };
        var container = options.containerId ? classInstance._dom.query('#' + options.containerId) : null;
        var containerPresent = (container !== undefined && container !== null);
        /**
         * Retrieve current location
         */
        var getScrollLocation = function () {
            if (containerPresent) {
                return container.scrollTop;
            }
            else {
                return classInstance.scrollTop;
            }
        };
        /**
         * Calculate easing pattern.
         *
         * 20150713 edit - zephinzer
         * - changed if-else to switch
         * @see http://archive.oreilly.com/pub/a/server-administration/excerpts/even-faster-websites/writing-efficient-javascript.html
         */
        var getEasingPattern = function (type, time) {
            switch (type) {
                case 'easeInQuad':
                    return time * time; // accelerating from zero velocity
                case 'easeOutQuad':
                    return time * (2 - time); // decelerating to zero velocity
                case 'easeInOutQuad':
                    return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
                case 'easeInCubic':
                    return time * time * time; // accelerating from zero velocity
                case 'easeOutCubic':
                    return (--time) * time * time + 1; // decelerating to zero velocity
                case 'easeInOutCubic':
                    return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
                case 'easeInQuart':
                    return time * time * time * time; // accelerating from zero velocity
                case 'easeOutQuart':
                    return 1 - (--time) * time * time * time; // decelerating to zero velocity
                case 'easeInOutQuart':
                    return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
                case 'easeInQuint':
                    return time * time * time * time * time; // accelerating from zero velocity
                case 'easeOutQuint':
                    return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
                case 'easeInOutQuint':
                    return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
                default:
                    return time;
            }
        };
        /**
         * Calculate how far to scroll
         */
        var getEndLocation = function (elemt) {
            var location = 0;
            if (elemt.offsetParent) {
                do {
                    location += elemt.offsetTop;
                    elemt = elemt.offsetParent;
                } while (elemt);
            }
            location = Math.max(location - offset, 0);
            return location;
        };
        // Initialize the whole thing
        setTimeout(function () {
            var currentLocation = null;
            var startLocation = getScrollLocation();
            var endLocation = getEndLocation(element);
            var timeLapsed = 0;
            var distance = endLocation - startLocation;
            var percentage;
            var position;
            var scrollHeight;
            var internalHeight;
            /**
             * Stop the scrolling animation when the anchor is reached (or at the top/bottom of the page)
             */
            var runAnimation;
            var stopAnimation = function () {
                currentLocation = getScrollLocation();
                if (containerPresent) {
                    scrollHeight = container.scrollHeight;
                    internalHeight = container.clientHeight + currentLocation;
                }
                else {
                    scrollHeight = classInstance.documentHeight;
                    internalHeight = classInstance.windowHeight + currentLocation;
                }
                if ((position === endLocation) ||
                    (currentLocation === endLocation) ||
                    (internalHeight >= scrollHeight)) {
                    clearInterval(runAnimation);
                    callbackAfter(element);
                }
            };
            /**
             * Scroll the page by an increment, and check if it's time to stop
             */
            var animateScroll = function () {
                timeLapsed += 16;
                percentage = (timeLapsed / duration);
                percentage = (percentage > 1) ? 1 : percentage;
                position = startLocation + (distance * getEasingPattern(easing, percentage));
                if (containerPresent) {
                    container.scrollTop = position;
                }
                else {
                    classInstance._window.scrollTo(0, position);
                }
                stopAnimation();
            };
            callbackBefore(element);
            runAnimation = setInterval(animateScroll, 16);
        }, 0);
    };
    ;
    ScrollService.prototype.capitalizeFirstLetter = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    ScrollService.prototype.camelCaseAndStripDash = function (str) {
        var _this = this;
        var split = str.split('-');
        split.pop();
        var camelCased = split.map(function (value, index) {
            return index === 0 ? value : _this.capitalizeFirstLetter(value);
        }).join('');
        return camelCased;
    };
    ScrollService = __decorate([
        core_1.Injectable()
    ], ScrollService);
    return ScrollService;
}());
exports.ScrollService = ScrollService;
