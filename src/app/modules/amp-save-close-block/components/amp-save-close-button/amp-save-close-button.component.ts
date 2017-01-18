import {
    Component,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {
    FormModelService,
    SaveService,
    SaveAndCloseService
} from '../../../../services';
import { Subscription } from 'rxjs';

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
    private hydrationSubscription : Subscription;
    constructor (
        private saveService : SaveService,
        private formModelService : FormModelService,
        private saveCloseService : SaveAndCloseService,
        private router : Router) {
        this.showStickyButton = this.saveCloseService.showSaveAndClose;
        this.hydrationSubscription = this.formModelService.$hydrateForm
            .subscribe( ( _hydratedForm : any ) => {
                this.showStickyButton = true;
            } );
    }

    public onSave () {
        this.saveService.save( this.form.value ).subscribe( ( result ) => {
            this.formModelService.storeModel( this.form.value );
            this.router.navigate( [ 'saveAndClose' ] );
        } );
    }
    public ngOnDestroy () {
        this.hydrationSubscription.unsubscribe();
    }
}
