
import { ElementRef, ChangeDetectorRef, Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import {
    FormBlock ,
    ScrollService ,
    FormModelService ,
    ProgressObserverService
} from 'amp-ddc-components';

@Component({
  selector: '<%= selector %>-block',
  templateUrl: './<%= dasherizedModuleName %>.component.html',
  styles          : [ require( './<%= dasherizedModuleName %>.component.scss' ) ] ,
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class <%= classifiedModuleName %>Block  extends FormBlock {

    constructor ( formModelService : FormModelService ,
        elementRef : ElementRef ,
        _cd : ChangeDetectorRef ,
        scrollService : ScrollService ,
        progressObserver : ProgressObserverService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }
}