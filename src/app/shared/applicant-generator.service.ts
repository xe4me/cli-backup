import { Injectable } from '@angular/core';
import { clone } from 'amp-ddc-components';
const applicantJSON = require( '../forms/better-form/applicant.json' );
const captchBlockJSON = require('../forms/better-form/capcha-block.json');
const bett3rChoiceBlockJSON = require('../forms/better-form/better-choice-block.json');
const debitCardMigrationBlockJSON = require('../forms/better-form/debit-card-migration-block.json');

@Injectable()
export class ApplicantGeneratorService {
     public getApplicantSection ( index : number ) : any {
        const applicantSections = clone( applicantJSON );

        this.addApplicantIdToSectionBlocks(applicantSections, index);

        if ( this.isFirstApplicant( index ) ) {
            this.addCaptchaBlock( applicantSections );
            this.addBett3rChoiceBlock( applicantSections );
        }

        return {
            name        : `Applicant${index}Section` ,
            blockType   : 'PageSectionComponent' ,
            blockLayout : 'SECTION' ,
            commonBlock : true ,
            path        : 'sections/page-section.component' ,
            custom      : {
                label : `Applicant ${index}`
            } ,
            blocks      : applicantSections
        };
    }

    public getDebitCardMigrationBlockJSON () {
         return debitCardMigrationBlockJSON;
    }

    private findBlock ( sections , title , sectionIndex ) {
        return sections[sectionIndex].blocks.filter((item) => {
            return title === item.name;
        })[0];
    }

    private addCaptchaBlock( sections ) {
        let captchBlock = clone(captchBlockJSON);
        sections[0].blocks.push(captchBlock);
    }

    private addBett3rChoiceBlock( sections ) {
        let bett3rChoiceBlock = clone(bett3rChoiceBlockJSON);
        sections[0].blocks.push(bett3rChoiceBlock);
    }

    private isFirstApplicant (index : number ) : boolean {
         return index === 1;
    }

    private addApplicantIdToSectionBlocks (sections, index : number ) : void {
        for (let section of sections) {
            for (let block of section.blocks) {
                block.custom.applicantIndex = index;
            }
        }
    }
}
