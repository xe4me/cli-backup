import { AccountsListBlock } from './blocks/accounts-list/accounts-list.component';
import { AddressBlock } from './blocks/address/address.component';
import { Bett3rBannerBlock } from './blocks/bett3r-banner/bett3r-banner.component';
import { Bett3rExitButtonComponent } from './blocks/bett3r-exit-button/bett3r-exit-button.component';
import { BetterChoiceBlock } from './blocks/better-choice/better-choice.component';
import { ContinueApplicationBlock } from './blocks/continue-application/continue-application.component';
import { DebitCardMigrationBlock } from './blocks/debit-card-migration/debit-card-migration.component';
import { DepositTransitionBlock } from './blocks/deposit-transition/deposit-transition.component';
import { Footer } from './blocks/footer/footer.component';
import { Header } from './blocks/header/header.component';
import { LastStepBlock } from './blocks/last-step/last-step.component';
import { LoanOffsetTransitionBlock } from './blocks/loan-offset-transition/loan-offset-transition.component';
import { MenuFrameBlockComponent } from './blocks/menu-frame/menu-frame.component';
import { MyAMPLoginBlockComponent } from './blocks/my-amplogin-block/my-amplogin-block.component';
import { NewOrExistingCustomerBlock } from './blocks/new-or-existing-customer/new-or-existing-customer-block.component';
import { NotARobotBlock } from './blocks/not-a-robot/not-a-robot.component';
import { ResidencyBlock } from './blocks/residency/residency.component';
import { SingleOrJointBlockComponent } from './blocks/single-or-joint/single-or-joint-block.component';
import { SourceOfFundingBlock } from './blocks/source-of-funding/source-of-funding.component';
import { TaxFileNumberBlock } from './blocks/tax-file-number/tax-file-number.component';
import { WelcomeBlockComponent } from './blocks/welcome/welcome-block.component';
import { DetailsPage } from './pages/details-page';
import {
    PageSectionComponent,
    ReviewSectionComponent
} from 'amp-ddc-components';

export const DYNAMIC_BLOCKS = [
    ReviewSectionComponent,
    PageSectionComponent,
    DetailsPage,
    AccountsListBlock,
    AddressBlock,
    Bett3rBannerBlock,
    Bett3rExitButtonComponent,
    BetterChoiceBlock,
    ContinueApplicationBlock,
    DebitCardMigrationBlock,
    DepositTransitionBlock,
    Footer,
    Header,
    LastStepBlock,
    LoanOffsetTransitionBlock,
    MenuFrameBlockComponent,
    MyAMPLoginBlockComponent,
    NewOrExistingCustomerBlock,
    NotARobotBlock,
    ResidencyBlock,
    SingleOrJointBlockComponent,
    SourceOfFundingBlock,
    TaxFileNumberBlock,
    WelcomeBlockComponent
];
