import {View, Component, OnInit, ChangeDetectorRef, provide, ViewChild} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {Control, CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {IntroBlockComponent} from '../../../../app/blocks/bolr/initState/IntroBlock.component';
import {FormModelService} from 'amp-ddc-ui-core/src/app/services/formModel.service';
import {Observable}     from 'rxjs/Observable';
import {BlockID} from 'amp-ddc-ui-core/ui-core';

export class MockFormModelService  {
    private model = {
        errors: [],
        currentBlockID: new BlockID(null, 0),         // Defaults to the first block on the current page
        context: {
            licensee: 'LIC_CHARTER',
            practicePrincipal_firstName: 'Darren',
            practicePrincipal_lastName: 'Mink',
            payeeId: 'BCABB-F',
            practiceName: 'Pinnancle Financial pty ltd'
        }
    };

    getContext() : Observable<string> {
        return Observable.create(function (observer) {
                observer.onNext({
                    licensee: 'LIC_CHARTER',
                    practicePrincipal_firstName: 'Darren',
                    practicePrincipal_lastName: 'Mink',
                    payeeId: 'BCABB-F',
                    practiceName: 'Pinnancle Financial pty ltd'
                });
                observer.onCompleted();

                return function() {
                    //Clean up logic
                };
        });
    }

    present(data) {
        this.model.currentBlockID = new BlockID(null, 1);
    }

    getModel() {
        return this.model;
    }
}


@Component({
    selector: 'bolr-intro-block-basic-usage',
    providers: [provide(FormModelService , {useClass: MockFormModelService})]
})
@View({
  templateUrl: 'src/styleguide/blocks/bolr/intro/basic_usage.html',
  styles: [require('./basic_usage').toString()],
  directives: [IntroBlockComponent]
})
export default class BOLRIntrolBlockBasicUsage implements OnInit {
    @ViewChild(IntroBlockComponent)
    private _introBlockComponent: IntroBlockComponent;

    constructor (private _cd: ChangeDetectorRef) {  }

    ngOnInit() {
        setTimeout(() => this._introBlockComponent._id = new BlockID(null, 0), 0);
    }

}
