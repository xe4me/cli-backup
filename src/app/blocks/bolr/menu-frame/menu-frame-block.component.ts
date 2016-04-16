import {Component, AfterViewChecked, DoCheck} from 'angular2/core';
import {Control} from 'angular2/common';
import {FormBlock, NamedControl} from '../../formBlock';
import {StickyProgressHeaderBlockComponent} from '../../../../../src/app/blocks/bolr/sticky-progress-header-block/sticky-progress-header-block.component';
import {FormModelService} from 'amp-ddc-ui-core/ui-core';
import {BrowserDomAdapter} from 'angular2/platform/browser'

@Component({
    selector: 'menu-frame',
    template: `
        <div class='frame'>
             <sticky-progress-header-block
                    class='sticky-progressbar'
                    determinate='determinate'
                    [value]='calculatedProgress'>
             </sticky-progress-header-block> 
             <div class='hr--solid frame__divider'></div>
             <div class='content'>
                 <div class='menu grid__item '>
                    <div class='menu--left'>
                        <div class='menu--left--title'>You request details</div>
                        <div class='menu--left--hr hr--solid'></div>
                        <div class='menu--left--save'><span class='icon icon--time'></span> Save for later</div>
                        <div class='menu--left--download'><span class='icon icon--time'></span>  Download a copy</div>
                        <div >CurrentClass : {{formModelService.getModel().currentBlockClassName}}</div> 
                    </div>
                    <div class='menu--right bolr-right-padding utils__position--rel'>
                        <!-- Dynamic form blocks driven from the Form Definition -->
                        <div #nestedBlock></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [require('./menu-frame-block.component.scss').toString()],
    directives: [StickyProgressHeaderBlockComponent]
})


export class MenuFrameBlockComponent extends FormBlock  implements AfterViewChecked{

    static CLASS_NAME = 'MenuFrameBlockComponent';


    private calculatedProgress = 0;
    private formControlLength:number;
    private subscribedToFormModel:boolean = false;

    constructor(private formModelService:FormModelService, private _dom:BrowserDomAdapter) {
        super();

        /*
         * IMPORTANT TODO :
         * Looks like this block cannot have access to formModel unless it has it's own formControls
         * */
        this.formControl = [new NamedControl('menuBlock', new Control())];

    }

    private stickyAnimatedIntoView = false;
    private introHasPassed() {
        if (this.formModel && !this.formModel.controls['introIsNotPassed']) {
            this.stickyAnimatedIntoView = true;
            var that= this;

            setTimeout(function () {

                console.log('Adding class sticky');
                let frame = that._dom.query('.frame');
                that._dom.addClass(frame, 'frame--sticky');
            }, 1200);
        }
    }

    private calculateProgress() {
        if (this.formModel && this.formModel.valueChanges) {
            this.subscribedToFormModel = true;
            console.log('subscribed to the formModel Changes ');
            this.formModel.removeControl('menuBlock');

            var that = this;
            this.formModel.valueChanges.subscribe(function (changes) {
                if (that.formModel.controls) {
                    let valids:number = 0;
                    that.formControlLength = Object.keys(that.formModel.controls).length;
                    console.log('that.formControlLength', that.formModel);
                    Object.keys(that.formModel.controls).map(function (value, index) {
                        if (that.formModel.controls[value]) {
                            if (that.formModel.controls[value].valid) {
                                console.log('is valid  : ', value);
                                valids++;
                            }
                        }
                    })
                    that.calculatedProgress = Math.floor((100 * valids / that.formControlLength));
                }
            })
        }


    }

    ngAfterViewChecked():any {
        if (!this.subscribedToFormModel) {
            this.calculateProgress();
        }
        if (!this.stickyAnimatedIntoView) {
            this.introHasPassed();
        }
        return undefined;
    }


    preBindControls(_formBlockDef:any):void {

    }

}
