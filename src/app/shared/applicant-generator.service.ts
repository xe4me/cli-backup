import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormService,
         clone
} from 'amp-ddc-components';
import { FDN } from '../forms/better-form/Application.fdn';
const applicantJSON = require('../forms/better-form/applicant.json');
@Injectable()
export class ApplicantGeneratorService {
    constructor(private formService: FormService) {

    }

    public findBlock(applicant, title, sectionIndex) {
        return applicant[sectionIndex].blocks.filter((item) => {
            return title === item.name;
        })[0];
    }

    public getApplicantSection(_index: number): any {
        const applicant = clone(applicantJSON);
        let onlineOrOfflineBlock = this.findBlock(applicant, 'OnlineOrOfflineIdCheck', 1);
        if (onlineOrOfflineBlock) {
            onlineOrOfflineBlock.custom.applicantIndex = _index;
        }
        if (_index === 2) {
            let basicInfoBlock = this.findBlock(applicant, 'BasicInfo', 0);
            if (basicInfoBlock) {
                basicInfoBlock.custom.blockTitle = basicInfoBlock.custom.blockTitle_applicant2;
            }
        }
        return {
            'name': `Applicant${_index}Section`,
            'blockType': 'PageSectionComponent',
            'blockLayout': 'SECTION',
            'commonBlock': true,
            'path': 'sections/page-section.component',
            'custom': {
                'label': `Applicant ${_index}`
            },
            'blocks': applicant
        };
    }
}

