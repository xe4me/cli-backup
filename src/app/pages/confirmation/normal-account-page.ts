import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';

@Component( {
    selector    : 'normal-account-page' ,
    template: require( './normal-account-page.html' ) ,
    styles: [ require( './normal-account-page.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class NormalAccountPage {
}
