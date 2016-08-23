import { TestComponentBuilder } from '@angular/compiler/testing';
import {
    it ,
    injectAsync ,
    describe ,
    beforeEachProviders,
    expect
} from '@angular/core/testing';
import { FormModelService, UIControlService, BlockID } from 'amp-ddc-ui-core/ui-core';
import { Component , provide , ElementRef } from '@angular/core';
import { Control } from '@angular/common';
import { AmpButton } from '../../../app/components/amp-button/amp-button.component';
import { MockFormModelService } from '../../services/mock-form-mode.service';
import { MockUIControlService } from '../../services/mock-ui-control.service';
import { FormBlock, provideParent } from '../../../app/blocks/formBlock';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe( 'amp-button component test' , () => {
    beforeEachProviders( () => {
        return [
            provide( FormModelService , { useClass : MockFormModelService } ) ,
            provide( MockFormModelService , { useClass : MockFormModelService } ) ,
            provide( ElementRef , { useClass : MockElementRef } ) ,
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

            <amp-button id='customDTMlabel' [data-automation-id]='"highest-priority"'>Custom DTM value</amp-button>
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

    it('Should behave correctly when used outside of FormBlock parent container context', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(AmpButtonTest).then((fixture: any) => {
          fixture.detectChanges();

          let ampButtonTestComponent = fixture.debugElement;
          let ampButton_first = ampButtonTestComponent.children[0];
          let ampButton_second = ampButtonTestComponent.children[1];
          let someRandomElement = ampButtonTestComponent.children[2];
          let ampButton_third = someRandomElement.children[0];
          let ampButton_fourth = ampButtonTestComponent.children[3];

          expect(ampButton_first).toBeDefined();
          expect(ampButton_first.name).toEqual('amp-button');
          let fst_button = ampButton_first.children[0];
          expect(fst_button).toBeDefined();
          expect(fst_button.nativeElement.getAttribute('data-automation-id')).toEqual('btn-OK');
          expect(fst_button.nativeElement.disabled).toBeFalsy();

          expect(ampButton_second).toBeDefined();
          expect(ampButton_second.name).toEqual('amp-button');
          let snd_button = ampButton_second.children[0];
          expect(snd_button).toBeDefined();
          expect(snd_button.nativeElement.getAttribute('data-automation-id')).toEqual('btn-ToggleSummary');
          expect(snd_button.nativeElement.disabled).toBeTruthy();

          expect(someRandomElement).toBeDefined();
          expect(someRandomElement.name).toEqual('some-random-element');

          expect(ampButton_third).toBeDefined();
          expect(ampButton_third.name).toEqual('amp-button');
          let trd_button = ampButton_third.children[0];
          expect(trd_button).toBeDefined();
          expect(trd_button.nativeElement.getAttribute('data-automation-id')).toEqual('btn-Cancel');
          expect(trd_button.nativeElement.disabled).toBeFalsy();

          expect(ampButton_fourth).toBeDefined();
          expect(ampButton_fourth.name).toEqual('amp-button');
          let forth_button = ampButton_fourth.children[0];
          expect(forth_button).toBeDefined();
          expect(forth_button.nativeElement.getAttribute('data-automation-id')).toEqual('highest-priority');
          expect(forth_button.nativeElement.disabled).toBeFalsy();


        });
    }));

    it('Should contain 3 buttons, 2 with click event bindings', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(AmpButtonTest).then((fixture: any) => {
          fixture.detectChanges();

          let ampButtonTestComponent = fixture.debugElement;
          let ampButton_first = ampButtonTestComponent.children[0];
          let ampButton_second = ampButtonTestComponent.children[1];
          let someRandomElement = ampButtonTestComponent.children[2];
          let ampButton_third = someRandomElement.children[0];

          expect(ampButton_first).toBeDefined();
          expect(ampButton_first.name).toEqual('amp-button');
          let fst_button = ampButton_first.children[0];
          fst_button.nativeElement.click();
          expect(ampButtonTestComponent.componentInstance.counter).toEqual(1);

          let snd_button = ampButton_second.children[0];
          snd_button.nativeElement.click();
          expect(ampButtonTestComponent.componentInstance.counter).toEqual(1);

          let trd_button = ampButton_third.children[0];
          trd_button.nativeElement.click();
          expect(ampButtonTestComponent.componentInstance.counter).toEqual(2);
        });
    }));


    it('Should contain 3 buttons, with the correct class names', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(AmpButtonTest).then((fixture: any) => {
          fixture.detectChanges();

          let ampButtonTestComponent = fixture.debugElement;
          let ampButton_first = ampButtonTestComponent.children[0];
          let ampButton_second = ampButtonTestComponent.children[1];
          let someRandomElement = ampButtonTestComponent.children[2];
          let ampButton_third = someRandomElement.children[0];

          expect(ampButton_first).toBeDefined();
          expect(ampButton_first.name).toEqual('amp-button');
          let fst_button = ampButton_first.children[0];
          expect(fst_button.nativeElement.getAttribute('class')).toEqual('abc');

          let snd_button = ampButton_second.children[0];
          snd_button.nativeElement.click();
          expect(snd_button.nativeElement.getAttribute('class')).toEqual('a b c');

          let trd_button = ampButton_third.children[0];
          trd_button.nativeElement.click();
          expect(trd_button.nativeElement.getAttribute('class')).toEqual('undefined');
        });
    }));
} );

describe( 'amp-button used within a parent FormBlock component' , () => {
    beforeEachProviders( () => {
        return [
            provide( FormModelService , { useClass : MockFormModelService } ) ,
            provide( MockFormModelService , { useClass : MockFormModelService } ) ,
            provide( ElementRef , { useClass : MockElementRef } ) ,
            provide( Window , { useValue : window } )
        ];
    } );
    @Component( {
        selector   : 'some-form-block',
        template   : `
            <amp-button id='toggleChecked' class="abc">OK</amp-button>
            <amp-button id='customDTMlabel' [data-automation-id]='"highest-priority"'>Custom DTM value</amp-button>
        ` ,
        directives : [ AmpButton ],
        providers  : [ provideParent( SomeFormBlockComponent ),
            provide(UIControlService, { useClass: MockUIControlService }) ]
    } )
    class SomeFormBlockComponent extends FormBlock implements FormBlock {
        static CLASS_NAME : string      = 'SomeFormBlockComponent';
        public blockType = 'SomeFormBlockComponent';
        public _id = new BlockID('whatever', 1);

        constructor (controlService : UIControlService) {
            super(controlService);
        }

        public preBindControls ( _formBlockDef ) {
        }

        public postBindControls () : void {
        }
    }


    it('Should generate data-automation-id that is aware of the parent FormBlock component', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(SomeFormBlockComponent).then((fixture: any) => {
          fixture.detectChanges();

          let ampButtonTestComponent = fixture.debugElement;
          let ampButton_first = ampButtonTestComponent.children[0];
          let ampButton_second = ampButtonTestComponent.children[1];

          expect(ampButton_first).toBeDefined();
          expect(ampButton_first.name).toEqual('amp-button');
          let fst_button = ampButton_first.children[0];
          expect(fst_button).toBeDefined();
          expect(fst_button.nativeElement.getAttribute('data-automation-id')).toEqual('btn-OK_SomeFormBlockComponent');
          expect(fst_button.nativeElement.disabled).toBeFalsy();

          expect(ampButton_second).toBeDefined();
          expect(ampButton_second.name).toEqual('amp-button');
          let snd_button = ampButton_second.children[0];
          expect(snd_button).toBeDefined();
          expect(snd_button.nativeElement.getAttribute('data-automation-id')).toEqual('highest-priority');
          expect(snd_button.nativeElement.disabled).toBeFalsy();

        });
    }));

} );
