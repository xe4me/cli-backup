import {
    Component,
    Input,
    Pipe,
    PipeTransform
} from '@angular/core';
import {
    AmpLoadingService,
    LoadingMessage
} from '../../services/amp-loading/amp-loading.service';
import { Request } from '@angular/http';
import Timer = NodeJS.Timer;

@Pipe( {
    name : 'messageMatchesUrl'
} )
export class MessageMatchesUrlPipe implements PipeTransform {
    transform ( loadingMessage : LoadingMessage, ifUrlHas ) : any {
        if ( loadingMessage ) {
            let { url, isLoading } = loadingMessage;
            if ( ifUrlHas === undefined ) { // show the loading if user doesn't care about the url match
                return isLoading;
            }
            if ( isLoading ) {
                if ( url instanceof Request ) {
                    return url.url.indexOf( ifUrlHas ) > 0;
                }
                if ( typeof(url) === 'string' ) {
                    return url.indexOf( ifUrlHas ) > 0;
                }
            }
        }
        return false;
    }
}

@Component( {
    selector : 'amp-loading-button',
    template : require( './amp-loading-button.component.html' ),
    styles   : [ require( './amp-loading-button.component.scss' ) ]
} )

export class AmpLoadingButtonComponent {
    @Input( 'if-url-has' ) ifUrlHas;
    @Input( 'theme' ) theme : string;
    @Input( 'class' ) clasz : string;
    @Input( 'disabled' ) disabled : boolean;
    @Input( 'data-automation-id' ) dataAutomationId : string;

    constructor ( private loadingService : AmpLoadingService ) {

    }
}
