import {
    Component,
    ViewChild,
    OnInit
} from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    AmpSingleJointBlockModule,
    AmpApplicantGeneratorService
} from '../../../app/modules/amp-single-joint-block/';
const applicantJSON = require ( './applicant-def.json');
import {
    APP_RESOLVER_PROVIDERS
} from '../../app.resolver';

import { formDef } from './form-def.def.json';
import { AmpBlockLoaderDirective } from '../../../app/amp-block-loader.directive';

let custom : any = {};

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;
let applicantControl;
let formGroup;

function loadComponent () {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;
    component = fixture.componentInstance;
    const formBlock = ngElement.componentInstance.block;
    formGroup = formBlock.__form;
    const controlGroup = formBlock.__controlGroup.controls;
    applicantControl = controlGroup['singleOrJoint'];
}

describe('amp-single-joint-block component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AmpBlockLoaderDirective,
                FormsModule,
                AmpSingleJointBlockModule,
                HttpModule
            ],
            declarations: [TestComponent],
            providers: [
                ...APP_RESOLVER_PROVIDERS
            ]
        });
        custom = {
            blockTitle : 'test title',
            controls: [
                { id: 'singleOrJoint' }
            ]
        };
    }));
    describe('When the component is loaded', () => {
        beforeEach( () => {
            loadComponent();
        });
        it('the component should be defined with one formControl', () => {
            expect(component).toBeDefined();
            expect(applicantControl).toBeDefined();
        });
        it ('load applicant1 form blocks initially', () => {
            expect(formGroup.contains['applicant1']).toBe(true);
            expect(formGroup.contains['applicant2']).toBe(false);
        });
        it ('When click "Just me" will load applicant1 blocks only', () => {
            const singleButton = domElement.querySelectorAll('button').item(0);
            expect(singleButton).toBeDefined();
            expect(formGroup.contains['applicant1']).toBe(true);
            expect(formGroup.contains['applicant2']).toBe(false);
        });
        it ('When click "Me and someone else" will load applicant1 and applicant2 blocks', () => {
            const jointButton = domElement.querySelectorAll('button').item(1);
            expect(jointButton).toBeDefined();
            expect(formGroup.contains['applicant1']).toBe(true);
            expect(formGroup.contains['applicant2']).toBe(true);
        });
    });
});

@Component({
    template : `
        <form #formModel='ngForm' class='nl-form'>
            <div [amp-block-loader]="childBlocks" [fdn]="fullyDistinguishedName" [form]="form" [requireMethod]="'ALL'"></div>
        </form>
    `
})
class TestComponent {

    private fullyDistinguishedName = [];
    private childBlocks            = formDef;
    private form : FormGroup = new FormGroup( {} );
    constructor (public applicantService : AmpApplicantGeneratorService) {
        this.applicantService.applicantDef = applicantJSON;
    }

}
