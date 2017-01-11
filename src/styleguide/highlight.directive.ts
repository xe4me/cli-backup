import {
    Directive ,
    ElementRef
} from '@angular/core';

declare const hljs : any;

@Directive( {
    selector: 'code[syntaxHighlight]'
} )
export class HighlightCodeDirective {

    constructor ( private eltRef : ElementRef ) {

    }

    ngAfterViewInit () {
        hljs.highlightBlock(this.eltRef.nativeElement);
    }

}
