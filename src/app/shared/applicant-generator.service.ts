import { Injectable } from '@angular/core';
import { clone } from 'amp-ddc-components';
const applicantJSON = require( '../forms/better-form/applicant.json' );

@Injectable()
export class ApplicantGeneratorService {
    public findBlock ( applicant , title , sectionIndex ) {
        return applicant[sectionIndex].blocks.filter((item) => {
            return title === item.name;
        })[0];
    }

    public getApplicantSection ( index : number ) : any {
        const applicantSections = clone( applicantJSON );

        this.addApplicantIdToSectionBlocks(applicantSections, index);

        if ( index === 2 ) {
            let basicInfoBlock = this.findBlock( applicantSections , 'BasicInfo' , 0 );
            if ( basicInfoBlock ) {
                basicInfoBlock.custom.blockTitle = basicInfoBlock.custom.blockTitle_applicant2;
            }
        }

        return {
            'name'        : `Applicant${index}Section` ,
            'blockType'   : 'PageSectionComponent' ,
            'blockLayout' : 'SECTION' ,
            'commonBlock' : true ,
            'path'        : 'sections/page-section.component' ,
            'custom'      : {
                'label' : `Applicant ${index}`
            } ,
            'blocks'      : applicantSections
        };
    }

    private addApplicantIdToSectionBlocks (sections, index : number ) : void {
        for (let section of sections) {
            for (let block of section.blocks) {
                block.custom.applicantIndex = index;
            }
        }
    }
}
