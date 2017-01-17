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

import { AmpSaveCloseBlockModule } from '../../../app/blocks/amp-save-close-block/amp-save-close-block.module';
import { APP_RESOLVER_PROVIDERS } from '../../app.resolver';
import {By} from '@angular/platform-browser';

let custom : any = {};

let fixture : ComponentFixture<TestComponent>;
let component;
let domElement;
let ngElement;

let mobileControl;
let acceptPrivacyControl;

function loadComponent () {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    domElement = fixture.nativeElement;
    ngElement = fixture.debugElement;
    component = fixture.componentInstance;
}

describe('amp-save-confirmation-block component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmpSaveCloseBlockModule, HttpModule],
            declarations: [TestComponent],
            providers: [
                ...APP_RESOLVER_PROVIDERS
            ]
        });
        custom = {
            blockTitle: 'Test AMP save and close block',
            active: true
        };
    }));
    describe('When the component is loaded', () => {
        it('the component should be defined', () => {
            loadComponent();
            expect(component).toBeDefined();
        });
    });
});
@Component({
    template: `
    <form #formModel='ngForm' class='nl-form'>
        <div class="save-close-block">
            <amp-save-confirmation-block #block>
            </amp-save-confirmation-block>
        </div>
    </form>
    `
})
class TestComponent implements OnInit {

    @ViewChild('block') block;

    ngOnInit() {
        this.block.__fdn = ['Application'];
        this.block.__custom = custom;
        this.block.__controlGroup = new FormGroup({});

        // No more random IDs
        this.block.__controlGroup.__fdn = this.block.__fdn;
    }
}
