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
    transform( loadingMessage : LoadingMessage, ifUrlHas ) : any {
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
    @Input( 'auto-submit' ) autoSubmit : boolean    = true;
    @Output( 'submit' ) $submit : EventEmitter<any> = new EventEmitter<any>();

    constructor( private loadingService : AmpLoadingService,
                 private formModelService : FormModelService,
                 private saveAndSubmitService : SaveAndSubmitService ) {

    }

    @HostListener( 'click', [ '$event' ] ) onClick() {
        if ( this.autoSubmit ) {
            this.saveAndSubmitService
                .saveAndSubmit( this.formModelService.form.value )
                .subscribe( ( result ) => {
                    this.$submit.emit( result );
                } );
        }
    }

}
