import {
    Component ,
    ElementRef ,
    ChangeDetectorRef ,
    ViewContainerRef ,
    EventEmitter ,
    AfterViewInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AmpFormGroup } from '../../base-control';
@Component( {
    selector : 'receipt-page-block' ,
    template : require( './receipt-page.component.html' ) ,
    styles   : [ require( './receipt-page.component.scss' ).toString() ] ,
    inputs   : [
        'licensee' ,
        'fdn' ,
        'title' ,
        'messageForReference' ,
        'messageForEmail' ,
        'emailSentEvent' ,
        'emailSentErrorEvent'
    ] ,
    outputs  : [ 'sendEmailEvent' ]
} )
export class SaveReceiptPageComponent implements AfterViewInit {
    public sendEmailEvent : EventEmitter<any>      = new EventEmitter();
    public emailSentEvent : EventEmitter<any>      = null;
    public emailSentErrorEvent : EventEmitter<any> = null;
    public licensee : string                       = 'AMP';
    private title                                  = 'Your quote/application has been saved';
    private __fdn                                  = [ 'default-receipt-page' ];
    private messageForReference                    = 'Your quote/application is now saved and your reference is ';
    private messageForEmail                        = 'Enter your email address so instructions to retrieve the quote/application can be sent to you.';
    private emailSentConfirmation : string         = null;
    private emailSentErrorMessage : string         = null;
    private referenceId : string                   = null;
    private fdn                                    = [];
    private isInSummaryState : boolean             = false;
    private controlGroup : AmpFormGroup            = new AmpFormGroup( {} );
    private controlName : string                   = 'emailAddress';

    constructor ( private _cd : ChangeDetectorRef ,
                  private el : ElementRef ,
                  public _viewContainerRef : ViewContainerRef ,
                  private route : ActivatedRoute ) {
    }

    ngOnInit () {
        // This is becuase amp-button expects __fdn , but we don't want to force the dev to send an input as __fdn ,
        // it''s overhead , but it's cleaner.
        this.__fdn              = this.fdn;
        this.controlGroup.__fdn = this.__fdn;
    }

    ngAfterViewInit () {
        this.referenceId = this.route.snapshot.params[ 'referenceId' ];
        this.controlGroup.controls[ this.controlName ].setValue( this.route.snapshot.params[ 'email' ] );
        this.emailSentEvent.subscribe( ( message ) => {
            this.emailSentConfirmation = message;
            this._cd.markForCheck();
        } );
        this.emailSentErrorEvent.subscribe( ( errorMessage ) => {
            this.emailSentErrorMessage = errorMessage;
            this._cd.markForCheck();
        } );
    }

    private get buttonDisabled () : boolean {
        return ! this.controlGroup.valid;
    }

    private sendEmail () {
        this.sendEmailEvent.emit( this.controlGroup.value[ this.controlName ] );
    }

    private back () {
        history.back();
    }

    private context () {
        return this;
    }
}
