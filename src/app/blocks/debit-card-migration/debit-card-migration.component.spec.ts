import {
    async,
    TestBed,
    ComponentFixture,
    ComponentFixtureAutoDetect,
    fakeAsync,
    tick,
    discardPeriodicTasks
} from '@angular/core/testing';
import {
    Component,
    ViewChild,
    OnInit
} from '@angular/core';
import {
    FormsModule,
    FormGroup,
    FormControl
} from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';
import {
    SaveService
} from 'amp-ddc-components';
import { AppModule } from '../../app.module';

const migrationChoiceTypes = {
    migrate : 'migrate',
    new : 'new'
};

describe( 'Component: DebitCardBlock', () => {
    beforeEach(  async( () => {
        TestBed.configureTestingModule( {
            imports      : [
                FormsModule,
                AppModule
            ],
            declarations : [
                DebitCardBlockTest
            ],
            providers    : [
                {
                    provide: APP_BASE_HREF,
                    useValue : '/ddc/public/ui/bett3r/'
                },
                {
                    provide: SaveService,
                    useValue: true
                },
                {
                    provide  : ComponentFixtureAutoDetect,
                    useValue : true
                }
            ]
        } );
        TestBed.compileComponents();
    } ) );

    describe ( 'Debit Card Block with New Customer Journey', () => {
        let debitCard : ComponentFixture<DebitCardBlockTest> = null;

        beforeEach( async(() => {
            debitCard = TestBed.createComponent( DebitCardBlockTest );
        }));

        it('Ensure the block is visible and the radio buttons can be clicked', fakeAsync(() => {
            debitCard.detectChanges();
            tick();
            debitCard.detectChanges();

            expect( debitCard.componentInstance ).toBeDefined();

            let title = debitCard.debugElement.query( By.css('h2.heading.js-heading.heading-intro') ).nativeElement.textContent;
            expect( title ).toBe( debitCard.componentInstance.block.__custom.blockTitle );

            let migrationChoice = debitCard.componentInstance.block.__controlGroup.controls.MigrationChoice;
            expect( migrationChoice.value ).toBe( null );

            let groupButtonLabels = debitCard.debugElement.queryAll( By.css('amp-radio-button-group div.amp-radio-button-group label') );

            expect( groupButtonLabels.length ).toBe( 2 );

            groupButtonLabels[0].nativeElement.click();
            tick();
            debitCard.detectChanges();

            expect( migrationChoice.value ).toBe( migrationChoiceTypes.migrate );

            groupButtonLabels[1].nativeElement.click();
            tick();
            debitCard.detectChanges();

            expect( migrationChoice.value ).toBe( migrationChoiceTypes.new );

            discardPeriodicTasks();
        }));
    } );
} );

@Component( {
    template : `
        <div>
            <debit-card-block #block></debit-card-block>
        </div>
    `
} )
class DebitCardBlockTest implements OnInit {

    @ViewChild('block') public block;

    public ngOnInit () {
        let blockJSON = require('../../forms/better-form/debit-card-migration-block.json');
        this.block.__fdn = ['Application', 'Applicant1Section', 'PersonalDetailsSection', 'DebitCard'];
        this.block.__controlGroup = new FormGroup({});
        let migrationChoiceControlId = blockJSON.custom.controls[0].id;
        let migrationChoiceControl = new FormControl();
        this.block.__controlGroup.addControl(migrationChoiceControlId, migrationChoiceControl);
        this.block.__custom = blockJSON.custom;
        this.block.__form = new FormGroup({});
        let applicationFormGroup = new FormGroup({});
        let newOrExistingFormGroup = new FormGroup({});
        newOrExistingFormGroup.addControl('NewOrExistingCustomer', new FormControl());
        applicationFormGroup.addControl('NewOrExistingCustomer', newOrExistingFormGroup);
        this.block.__form.addControl('Application', applicationFormGroup);
    }
}
