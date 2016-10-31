import {
    Component ,
    Input ,
    ChangeDetectionStrategy ,
    OnInit
} from '@angular/core';

import { LicenseesAbstract } from '../../../../abstracts/licensee/licensee.abstract';

let defaultTheme = 'forms';

@Component( {
    selector        : 'amp-logo' ,
    template        : `<img [attr.src]="url" [attr.alt]="alt" />` ,
    styles          : [ require( './amp-logo.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
} )

export class AmpLogoComponent implements OnInit {

    @Input( 'alt' ) alt : string = '';
    @Input( 'licensee' ) licensee : string = '';
    @Input( 'baseURL' ) baseURL : string = 'http://www.amp.com.au/content/dam/amp/digitalhub/common/images/systems/ddc/';
    @Input( 'theme' ) theme : string = defaultTheme;

    private url : string = '';

    public ngOnInit () {
        this.licensee = LicenseesAbstract.hasLicensee(this.licensee) ? this.licensee : 'AMP';

        let licenseeMap = LicenseesAbstract.licenseeImages;
        let imageName = licenseeMap[this.licensee][this.theme] ||
                        licenseeMap[this.licensee][defaultTheme];
        let imageAlt = this.alt ||
                       licenseeMap[this.licensee].name ||
                       LicenseesAbstract.getLicenseeBuybackFacility(this.licensee);

        this.url = this.baseURL + imageName;
        this.alt = imageAlt;
    }
}
