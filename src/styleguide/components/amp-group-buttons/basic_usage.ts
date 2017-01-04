import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
@Component( {
    selector : 'amp-group-buttons-block-basic-usage',
    templateUrl : './basic_usage.html',
    styles : [ require( './basic_usage.scss' ) ]
} )

export default class AmpGroupButtonComponentBasicUsage {
    controlGroup : FormGroup = new FormGroup( {} );
    private required = true;
    private fullOrPartialButtons = {
        buttons : [
            {
                id : 'fullId',
                value : 'full',
                label : 'Full sale'
            },
            {
                id : 'partialId',
                value : 'partial',
                label : 'Partial sale'
            }
        ],
        fullOrPartial : 'fullOrPartial'
    };
    private booleanOptions = {
        buttons : [
            {
                id : 'Yes',
                value : true,
                label : 'Yes'
            },
            {
                id : 'No',
                value : false,
                label : 'No'
            }
        ],
        groupName : 'booleanOptions'
    };
    private color = 'red';

    constructor( private  themeService : ThemeService ) {
    }

    private get control() {
        return this.controlGroup.controls[ 'fullOrPartial' ];
    }

    private onButtonClick() {
        if ( this.color === 'red' ) {
            this.color = 'blue';
        } else {
            this.color = 'red';
        }
    }
}
