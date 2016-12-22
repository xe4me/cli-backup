import { NgModule } from '@angular/core';
import { AmpSharedRootModule } from '../amp-shared-root/amp-shared-root.module';
import { AmpReviewItemComponent } from './components/amp-review-item/amp-review-item.component';
import { AmpReviewTotalComponent } from './components/amp-review-total/amp-review-total.component';
import { AmpReviewSectionComponent } from './components/amp-review-section/amp-review-section.component';
import { AmpButtonModule } from '../amp-button/amp-button.module';
const DECLARATIONS = [ AmpReviewItemComponent , AmpReviewSectionComponent , AmpReviewTotalComponent ];
@NgModule( {
    declarations : DECLARATIONS ,
    imports      : [
        AmpButtonModule,
        AmpSharedRootModule
    ] ,
    exports      : DECLARATIONS
} )
export class AmpReviewModule {
}
