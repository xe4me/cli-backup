import { NgModule } from '@angular/core';
import { AmpFileUploadService } from './services/amp-file-upload.service';
import { AmpFileUploadComponent } from './components/amp-file-upload.component';
import { Http } from '@angular/http';
import { AmpButtonModule } from '../amp-button';

const DECLARATIONS = [
    AmpFileUploadComponent
];
@NgModule( {
    declarations : [ ...DECLARATIONS ] ,
    imports      : [
        AmpButtonModule
    ] ,
    providers    : [ AmpFileUploadService , Http ] ,
    exports      : DECLARATIONS
} )
export class AmpFileUploadModule {
}
