import { Input , Component } from '@angular/core';
@Component( {
    selector   : 'amp-loading' ,
    template   : `
        <md-progress-circle 
            *ngIf="showLoading"
            [mode]="mode"
            [value]="value">    
        </md-progress-circle>
    ` ,
    styles     : [ require( './amp-loading.component.scss' ) ]
} )
export class AmpLoadingComponent {
    @Input() mode        = 'indeterminate';
    @Input() value       = 10;
    private _showLoading = true;
    @Input() set showLoading ( _showLoading ) {
        this._showLoading = _showLoading;
    }

    get showLoading () {
        return this._showLoading;
    }
}
