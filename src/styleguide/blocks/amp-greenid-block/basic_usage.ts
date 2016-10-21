
import { Component , OnInit , ChangeDetectorRef, ElementRef } from '@angular/core';
import { AmpGreenidBlockComponent } from '../../../app/blocks/amp-greenid-block/amp-greenid-block';
import { AmpGreenIdServices } from '../../../app/blocks/amp-greenid-block/services/amp-greenid-service';
import { FormControl , FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';

@Component( {
    selector    : 'amp-greenid-block-basic-usage' ,
    directives  : [ AmpGreenidBlockComponent ] ,
    providers   : [ AmpGreenIdServices ],
    templateUrl : 'src/styleguide/blocks/amp-greenid-block/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AmpGreenIdBlockBasicUsage {

    constructor ( private  themeService : ThemeService) {
    }

    ngOnInit () {

    }
}
