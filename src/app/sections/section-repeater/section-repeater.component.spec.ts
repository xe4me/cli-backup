import {
    Component,
    ViewChild,
    OnInit,
    Renderer,
    TemplateRef
} from '@angular/core';
import {
    FormsModule,
    FormGroup
} from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionRepeaterComponent } from './section-repeater.component';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import {BrowserModule} from '@angular/platform-browser';
import { AmpRowRepeaterModule } from '../../modules/amp-row-repeater';
import {
    AmpBasicInfoBlockComponent
} from '../../modules/amp-basic-info-block';
import { AmpBlockLoaderDirective } from '../../amp-block-loader.directive';
let fixture : ComponentFixture<TestComponent>;
let domElement;
let ngElement;
let component;
console.log('fixture', fixture);
describe('section-repeater component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                FormsModule,
                AmpRowRepeaterModule
            ],
            declarations: [
                AmpBlockLoaderDirective,
                SectionRepeaterComponent,
                TestComponent
            ]
        });
        TestBed.compileComponents();
    }));
    describe('should be defined', () => {
        beforeEach( async( () => {
            fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            domElement = fixture.nativeElement;
            ngElement = fixture.debugElement;
            component = fixture.componentInstance;
        }));
        it('should have amp-row-repeater select', () => {
            const sectionRepeaterEl = domElement.querySelectorAll('amp-row-repeater');
            expect(sectionRepeaterEl.length).toBe(1);
        });
    });
    describe('should be array of sections', () => {

    });
});

@Component( {
    template : `
        <form #formModel='ngForm' class='nl-form'>
            <section-repeater #sectionsCmp ></section-repeater> 
        </form>
        `
} )

class TestComponent implements OnInit {
    @ViewChild(SectionRepeaterComponent) sectionsCmp;

    ngOnInit () {
        this.sectionsCmp.__fdn = ['application'];
        this.sectionsCmp.name = 'applicants';
        this.sectionsCmp.__custom =  {};
        this.sectionsCmp.__controlGroup = new FormGroup( {} );
        this.sectionsCmp.__controlGroup.__fdn = this.sectionsCmp.__fdn;
        this.sectionsCmp.__child_blocks = {};
        this.sectionsCmp.__child_blocks.__fdn = [ 'application', 'applicants'];
        this.sectionsCmp.__child_blocks.name = 'applicants';
        this.sectionsCmp.__child_blocks.blocks =
            [
                {
                    name        : 'personalDetails',
                    blockType   : 'PageSectionComponent',
                    blockLayout : 'SECTION',
                    commonBlock : false,
                    path        : 'sections/page-section.component',
                    custom      : {
                        label : 'Personal Details'
                    },
                    blocks      : [
                        {
                            name        : 'basicInfo',
                            blockType   : 'AmpBasicInfoBlockComponent',
                            blockLayout : 'INLINE',
                            commonBlock : false,
                            path        : 'modules/amp-basic-info-block/components/amp-basic-info-block/amp-basic-info-block.component',
                            custom      : {
                                blockTitle : 'Tell us about yourself',
                                controls   : [
                                    {
                                        id : 'title'
                                    },
                                    {
                                        id : 'firstName'
                                    },
                                    {
                                        id : 'middleName'
                                    },
                                    {
                                        id : 'surName'
                                    },
                                    {
                                        id : 'dateOfBirth'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ];
    }
}
