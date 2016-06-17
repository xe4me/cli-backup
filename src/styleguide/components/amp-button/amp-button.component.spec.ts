import {
    it ,
    injectAsync ,
    describe ,
    beforeEachProviders ,
    TestComponentBuilder
} from '@angular/core/testing';
import { FormModelService  } from 'amp-ddc-ui-core/ui-core';
import { Component , provide , ElementRef } from '@angular/core';
import { Control } from '@angular/common';
import { AmpButton } from '../../../app/components/amp-button/amp-button.component';
import { MockFormModelService } from '../../../styleguide/blocks/bolr/dialogue/contact-details/mock-form-mode.service';
describe( 'amp-button component test' , () => {
    beforeEachProviders( () => {
        return [
            provide( FormModelService , { useClass : MockFormModelService } ) ,
            provide( MockFormModelService , { useClass : MockFormModelService } ) ,
            provide( ElementRef , { useClass : ElementRef } ) ,
            provide( Window , { useValue : window } )
        ];
    } );
    @Component( {
        template   : `
            <amp-button id='toggleChecked' (click)='dummyClickCounter()' class="abc">OK</amp-button>
            <amp-button id='toggleSummary' [disabled]='true' class="a b c">Toggle Summary</amp-button>

            <some-random-element>
                <amp-button id='dtmTest' (click)='dummyClickCounter()'>Cancel</amp-button>
            </some-random-element>
        ` ,
        directives : [ AmpButton ]
    } )
    class AmpButtonTest {
        counter: number = 0;
        public dummyClickCounter(): number {
            this.counter += 1;
            return this.counter;
        }
    }
    //
    // it('Should contain 3 buttons, first and last button should be enabled, second one disabled. data-automation-id should be set in context of the parent element', injectAsync([TestComponentBuilder], (tcb) => {
    //   return tcb.createAsync(AmpButtonTest).then((fixture: any) => {
    //       fixture.detectChanges();
    //
    //       let ampButtonTestComponent = fixture.debugElement;
    //       let ampButton_first = ampButtonTestComponent.children[0];
    //       let ampButton_second = ampButtonTestComponent.children[1];
    //       let someRandomElement = ampButtonTestComponent.children[2];
    //       let ampButton_third = someRandomElement.children[0];
    //
    //       expect(ampButton_first).toBeDefined();
    //       expect(ampButton_first.name).toEqual('amp-button');
    //       let fst_button = ampButton_first.children[0];
    //       expect(fst_button).toBeDefined();
    //       expect(fst_button.nativeElement.getAttribute('data-automation-id')).toEqual('btn-OK_div');
    //       expect(fst_button.nativeElement.disabled).toBeFalsy();
    //
    //       expect(ampButton_second).toBeDefined();
    //       expect(ampButton_second.name).toEqual('amp-button');
    //       let snd_button = ampButton_second.children[0];
    //       expect(snd_button).toBeDefined();
    //       expect(snd_button.nativeElement.getAttribute('data-automation-id')).toEqual('btn-ToggleSummary_div');
    //       expect(snd_button.nativeElement.disabled).toBeTruthy();
    //
    //       expect(someRandomElement).toBeDefined();
    //       expect(someRandomElement.name).toEqual('some-random-element');
    //
    //       expect(ampButton_third).toBeDefined();
    //       expect(ampButton_third.name).toEqual('amp-button');
    //       let trd_button = ampButton_third.children[0];
    //       expect(trd_button).toBeDefined();
    //       expect(trd_button.nativeElement.getAttribute('data-automation-id')).toEqual('btn-Cancel_some-random-element');
    //       expect(trd_button.nativeElement.disabled).toBeFalsy();
    //
    //     });
    // }));
    //
    // it('Should contain 3 buttons, 2 with click event bindings', injectAsync([TestComponentBuilder], (tcb) => {
    //   return tcb.createAsync(AmpButtonTest).then((fixture: any) => {
    //       fixture.detectChanges();
    //
    //       let ampButtonTestComponent = fixture.debugElement;
    //       let ampButton_first = ampButtonTestComponent.children[0];
    //       let ampButton_second = ampButtonTestComponent.children[1];
    //       let someRandomElement = ampButtonTestComponent.children[2];
    //       let ampButton_third = someRandomElement.children[0];
    //
    //       expect(ampButton_first).toBeDefined();
    //       expect(ampButton_first.name).toEqual('amp-button');
    //       let fst_button = ampButton_first.children[0];
    //       fst_button.nativeElement.click();
    //       expect(ampButtonTestComponent.componentInstance.counter).toEqual(1);
    //
    //       let snd_button = ampButton_second.children[0];
    //       snd_button.nativeElement.click();
    //       expect(ampButtonTestComponent.componentInstance.counter).toEqual(1);
    //
    //       let trd_button = ampButton_third.children[0];
    //       trd_button.nativeElement.click();
    //       expect(ampButtonTestComponent.componentInstance.counter).toEqual(2);
    //     });
    // }));
    //
    //
    // it('Should contain 3 buttons, with the correct class names', injectAsync([TestComponentBuilder], (tcb) => {
    //   return tcb.createAsync(AmpButtonTest).then((fixture: any) => {
    //       fixture.detectChanges();
    //
    //       let ampButtonTestComponent = fixture.debugElement;
    //       let ampButton_first = ampButtonTestComponent.children[0];
    //       let ampButton_second = ampButtonTestComponent.children[1];
    //       let someRandomElement = ampButtonTestComponent.children[2];
    //       let ampButton_third = someRandomElement.children[0];
    //
    //       expect(ampButton_first).toBeDefined();
    //       expect(ampButton_first.name).toEqual('amp-button');
    //       let fst_button = ampButton_first.children[0];
    //       expect(fst_button.nativeElement.getAttribute('class')).toEqual('abc');
    //
    //       let snd_button = ampButton_second.children[0];
    //       snd_button.nativeElement.click();
    //       expect(snd_button.nativeElement.getAttribute('class')).toEqual('a b c');
    //
    //       let trd_button = ampButton_third.children[0];
    //       trd_button.nativeElement.click();
    //       expect(trd_button.nativeElement.getAttribute('class')).toEqual('undefined');
    //     });
    // }));
} );
