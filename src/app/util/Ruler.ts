import {DomAdapter} from '@angular/platform-browser/src/dom/dom_adapter';
import {ElementRef} from '@angular/core';

export class Rectangle {
    left;
    right;
    top;
    bottom;
    height;
    width;
    constructor(left, top, width, height) {
        this.left = left;
        this.right = left + width;
        this.top = top;
        this.bottom = top + height;
        this.height = height;
        this.width = width;
    }
}

export class Ruler {
    domAdapter : DomAdapter;
    constructor(domAdapter : DomAdapter) { this.domAdapter = domAdapter; }

    measure(el : ElementRef) : Promise<Rectangle> {
        let clntRect = <any> this.domAdapter.getBoundingClientRect(el.nativeElement);

        // even if getBoundingClientRect is synchronous we use async API in preparation for further changes
        return new Promise<Rectangle>(() => {
            // TODO: The use of the new keyword here should be reevaluated to see if there is a way to not use it
            //       as it is considered bad practice (as stated by the tslint rules) that way the tslint ignore
            //       comment can be removed.
            //       GitLab issue: https://gitlab.ccoe.ampaws.com.au/DDC/components/issues/1
            // tslint:disable-next-line:no-unused-new
            new Rectangle(clntRect.left, clntRect.top, clntRect.width, clntRect.height);
        });
    }
}
