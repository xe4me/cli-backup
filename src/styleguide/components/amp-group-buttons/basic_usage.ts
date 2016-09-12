import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { AmpGroupButtonsComponent } from '../../../app/components/amp-group-buttons/amp-group-buttons.component';
import { ThemeService } from '../../services/theme';
@Component( {
    selector    : 'amp-group-buttons-block-basic-usage' ,
    templateUrl : 'src/styleguide/components/amp-group-buttons/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ AmpGroupButtonsComponent ]
} )

export default class AmpGroupButtonComponentBasicUsage {
    private required                   = true;
            controlGroup : FormGroup = new FormGroup({});
    private fullOrPartialButtons       = {
        buttons       : [
            {
                id    : 'fullId' ,
                value : 'full' ,
                label : 'Full sale'
            } ,
            {
                id    : 'partialId' ,
                value : 'partial' ,
                label : 'Partial sale'
            }
        ] ,
        fullOrPartial : 'fullOrPartial'
    };
    private color                      = 'red';

    constructor ( private  themeService : ThemeService ) {
    }

    private get control () {
        return this.controlGroup.controls[ 'fullOrPartial' ];
    }

    private onButtonClick () {
        if ( this.color === 'red' ) {
            this.color = 'blue';
        } else {
            this.color = 'red';
        }
    }
}
