import {
    Component,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormModelService, SaveService, SaveAndCloseService } from '../../../../services';

@Component(
    {
        selector        : 'amp-save-close-button',
        template        :  require( './amp-save-button.component.html'),
        styles          : [ require( './amp-save-close-button.component.scss' ) ],
        changeDetection : ChangeDetectionStrategy.OnPush
    } )
export class AmpSaveCloseButtonComponent {
    @Input() private form : FormGroup;
    private showStickyButton : boolean = false;
    constructor (
        private saveService : SaveService,
        private formModelService : FormModelService,
        private router : Router) {
        this.hydrationSubscription = this.formModelService.$hydrateForm
            .subscribe( ( _hydratedForm : any ) => {
                this.showStickyButton = false;
            } );
    }

    public onSave () {
        this.saveService.save( this.form.value ).subscribe( ( result ) => {
            this.formModelService.storeModel( this.form.value );
            this.router.navigate( [ 'saveAndClose' ] );
        } );
    }

}
