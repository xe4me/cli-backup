import { Component } from "@angular/core";
@Component( {
    selector : 'amp-block' ,
    template : `
        <div id='{{ selectorName }}' class='{{ selectorName }} pt-60 palm-pt+'>
            <ng-content></ng-content>    
            <div class='hr-block-divider mt-80  palm-mt+'></div>
        </div>
    ` ,
    inputs   : [ 'selectorName' ]
} )
export class AmpBlockComponent {
}