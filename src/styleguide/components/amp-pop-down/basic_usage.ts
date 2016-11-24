import { Component , AfterViewInit , ChangeDetectorRef , ViewChild , ViewEncapsulation } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { ScrollService } from '../../../app/services/scroll/scroll.service';
@Component( {
    templateUrl   : 'src/styleguide/components/amp-pop-down/basic_usage.html' ,
    styles        : [ require( './basic_usage.scss' ).toString() ] ,
    selector      : 'amp-pop-down-basic-usage' ,
    encapsulation : ViewEncapsulation.None
} )

export default class AmpPopDownComponentBasicUsage {
    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }
}
