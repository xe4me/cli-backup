import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormService } from 'amp-ddc-components';
import { FDN } from '../forms/better-form/Application.fdn';
const applicantJSON = require('../forms/better-form/applicant.json');
@Injectable()
export class ApplicantGeneratorService {
    constructor(private formService: FormService) {

    }

    public getApplicantSection(_index: number): any {
        return {
            'name': `Applicant${_index}Section`,
            'blockType': 'PageSectionComponent',
            'blockLayout': 'SECTION',
            'commonBlock': true,
            'path': 'sections/page-section.component',
            'custom': {
                'label': `Applicant ${_index}`
            },
            'blocks': applicantJSON
        };
    }
}

