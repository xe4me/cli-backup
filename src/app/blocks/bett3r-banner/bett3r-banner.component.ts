import {
    Component,
    OnInit,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    Environments
} from 'amp-ddc-components';

@Component( {
    selector        : 'bett3r-banner' ,
    templateUrl     : './bett3r-banner.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles : [ require( './bett3r-banner.component.scss').toString() ]
} )

export class Bett3rBannerBlock implements OnInit {
    private bannerImages : Array<string>;
    private bannerBaseUrl : string;
    private damContentUrl = Environments.property.DamContentUrl;
    constructor () {
    }
    public ngOnInit () {
        this.bannerBaseUrl = `${this.damContentUrl}enterprise-assets/ddc/bett3r/AMP_Bett3r_lockup_1_`;
        this.bannerImages = [
            `${this.bannerBaseUrl}01.jpg`,
            `${this.bannerBaseUrl}02.jpg`,
            `${this.bannerBaseUrl}03.jpg`];
    }
}
