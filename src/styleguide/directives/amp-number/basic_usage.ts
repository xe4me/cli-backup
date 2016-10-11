import {
    Component ,
    ChangeDetectorRef
} from '@angular/core';
import { ThemeService } from '../../services/theme';
import { AmpNumberDirective } from '../../../app/modules/amp-directives/directives/number/amp-number.directive';
@Component( {
    selector    : 'amp-number-basic-usage' ,
    templateUrl : 'src/styleguide/directives/amp-number/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ]
} )

export default class AmpNumberBasicUsage {
    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }
}
