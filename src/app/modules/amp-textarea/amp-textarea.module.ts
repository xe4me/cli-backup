import { NgModule } from '@angular/core';
import { AmpTextareaComponent } from './components/amp-textarea/amp-textarea.component';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { MdInputModule } from '@angular/material';
const DECLARATIONS = [ AmpTextareaComponent ];
@NgModule( {
    declarations : DECLARATIONS,
    imports : [
        AmpSharedRootModule,
        MdInputModule
    ],
    exports : DECLARATIONS
} )
export class AmpTextareaModule {
}
