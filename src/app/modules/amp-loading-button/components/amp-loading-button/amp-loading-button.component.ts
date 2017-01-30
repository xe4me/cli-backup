import {
    Component,
    Input,
    Pipe,
    EventEmitter,
    Output,
    PipeTransform,
    HostListener
} from '@angular/core';
import {
    AmpLoadingService,
    LoadingMessage
} from '../../services/amp-loading/amp-loading.service';
import { SaveAndSubmitService } from '../../../../services/save-and-submit/save-and-submit.service';
import { FormModelService } from '../../../../services/form-model/form-model.service';
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
            let regex = new RegExp( ifUrlHas );
            if ( isLoading ) {
                if ( url instanceof Request ) {
                    return regex.test( url.url );
                }
                if ( typeof(url) === 'string' ) {
                    return regex.test( url );
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
    @Input( 'if-url-has' ) ifUrlHas                     = 'save|submit';
    @Input( 'theme' ) theme : string;
    @Input( 'class' ) clasz : string;
    @Input( 'context' ) context : string;
    @Input( 'disabled' ) disabled : boolean;
    @Input( 'data-automation-id' ) dataAutomationId : string;
    @Input( 'submit-on-click' ) submitOnClick : boolean = false;
    @Output( 'submit' ) $submit : EventEmitter<any>     = new EventEmitter<any>();

    constructor ( private loadingService : AmpLoadingService,
                  private formModelService : FormModelService,
                  private saveAndSubmitService : SaveAndSubmitService ) {

    }

    @HostListener( 'click', [ '$event' ] ) onClick () {
        if ( this.submitOnClick ) {
            this.saveAndSubmitService
                .saveAndSubmit( this.formModelService.form.value )
                .subscribe( ( result ) => {
                    this.$submit.emit( result );
                } );
        }
    }

}
