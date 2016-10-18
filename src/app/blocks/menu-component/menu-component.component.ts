import { Component,
        OnInit,
        AfterViewInit
} from '@angular/core';
import {
  FormGroup
} from '@angular/forms';
import { ScrollService } from 'amp-ddc-components';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements OnInit, AfterViewInit {
  private ApplicantsSection : FormGroup;
  private __form : FormGroup;
  constructor(private scrollService: ScrollService) { }

  public ngOnInit() {
  }

  public ngAfterViewInit() {
      const application : FormGroup = <FormGroup> this.__form.controls['Application'];
      this.ApplicantsSection = <FormGroup> application.controls['ApplicantsSection'];
  }

}
