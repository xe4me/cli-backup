import {
    Component,
    ViewChild
} from '@angular/core';
import {
    FormsModule,
    FormGroup
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    async,
    fakeAsync,
    tick,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { APP_RESOLVER_PROVIDERS } from '../styleguide/app.resolver';
import { AmpBlockLoaderDirective } from '../styleguide/amp-block-loader-test.directive';
import { By } from '@angular/platform-browser';
import {
    AmpBasicInfoBlockModule,
    AmpBasicInfoBlockComponent
} from './modules/amp-basic-info-block';
describe( 'form-block', () => {

    let fixture : ComponentFixture<TestComponent>;
    let component;
    let domElement;
    let ngElement;
    let basicInfoBlock : any;
    let basicInfoBlockDebugElem;
    let destroyBasicInfo    = () => {
        component.loader.removeByFdn( basicInfoBlock.__fdn );
        fixture.detectChanges();
    };
    let fireMockScrollEvent = () => {
        basicInfoBlock.scrollService.$scrolled.emit( {
            componentSelector : basicInfoBlock.selectorName,
            section           : null
        } );
        fixture.detectChanges();
    };
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports      : [
                FormsModule,
                AmpBasicInfoBlockModule,
                HttpModule
            ],
            declarations : [
                AmpBlockLoaderDirective,
                TestComponent
            ],
            providers    : APP_RESOLVER_PROVIDERS

        } );

        fixture = TestBed.createComponent( TestComponent );
        fixture.detectChanges();
        domElement              = fixture.nativeElement;
        ngElement               = fixture.debugElement;
        component               = fixture.componentInstance;
        basicInfoBlockDebugElem = ngElement.query( By.directive( AmpBasicInfoBlockComponent ) );
        basicInfoBlock          = basicInfoBlockDebugElem.componentInstance;
    } ) );

    describe( 'Properties', () => {
        describe( 'isAlive', () => {
            it( 'should be true initially', () => {
                expect( basicInfoBlock.isAlive ).toBe( true );
            } );
            it( 'should be false after the block is destroyed', () => {
                expect( basicInfoBlock.isAlive ).toBe( true );
                destroyBasicInfo();
                expect( basicInfoBlock.isAlive ).toBe( false );
            } );
        } );
        describe( 'isActive', () => {
            it( 'should be false initially', () => {
                expect( basicInfoBlock.isActive ).toBe( false );
            } );
        } );
    } );
    describe( 'Behaviours', () => {
        describe( 'scroll', () => {
            it( 'it should listen to $scrolled event if is alive', fakeAsync( () => {
                spyOn( basicInfoBlock, 'setActiveAndFocus' );
                expect( basicInfoBlock.setActiveAndFocus ).not.toHaveBeenCalled();
                fireMockScrollEvent();
                tick( 1000 );
                expect( basicInfoBlock.setActiveAndFocus ).toHaveBeenCalled();
            } ) );
            it( 'it should NOT listen to $scrolled event if it is destroyed (is not alive)', fakeAsync( () => {
                spyOn( basicInfoBlock, 'setActiveAndFocus' );
                expect( basicInfoBlock.setActiveAndFocus ).not.toHaveBeenCalled();
                destroyBasicInfo();
                fireMockScrollEvent();
                tick( 1000 );
                expect( basicInfoBlock.setActiveAndFocus ).not.toHaveBeenCalled();
            } ) );
        } );
    } );
} );

@Component( {
    template : `
        <div [amp-block-loader]="childBlocks" [fdn]="[]" [form]="form"></div>
    `
} )
class TestComponent {

    public form : FormGroup = new FormGroup( {} );
    @ViewChild( AmpBlockLoaderDirective ) loader : AmpBlockLoaderDirective;
    private childBlocks     = {
        id      : 'Application',
        name    : 'Application',
        version : '0.0.1',
        path    : '/application',
        status  : 'NEW',
        blocks  : [
            {
                name        : 'basicInfo',
                blockType   : 'AmpBasicInfoBlockComponent',
                blockLayout : 'INLINE',
                commonBlock : false,
                path        : 'modules/amp-basic-info-block/components/amp-basic-info-block/amp-basic-info-block.component'
            }
        ]
    };

}
