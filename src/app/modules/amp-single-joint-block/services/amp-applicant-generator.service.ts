import { Injectable } from '@angular/core';
import { clone } from '../../../modules/amp-utils/functions.utils';

@Injectable()
export class AmpApplicantGeneratorService {
     public applicantDef : any ;
     public isCommonBlock : boolean = false;
     private applicantCounter : number = 0 ;
     public getApplicantSection ( ) : any {
         this.applicantCounter++;
         const applicantSections = clone( this.applicantDef );

         this.addApplicantIdToSectionBlocks(applicantSections, this.applicantCounter);

         return {
             name        : `applicant${this.applicantCounter}` ,
             blockType   : 'PageSectionComponent' ,
             blockLayout : 'SECTION' ,
             commonBlock : this.isCommonBlock ,
             path        : 'sections/page-section.component' ,
             custom      : {
                 label : `Applicant ${this.applicantCounter}`
             } ,
             blocks      : applicantSections
         };
    }

    public numberOfApplicant () : number {
        return this.applicantCounter;
    }
    private addApplicantIdToSectionBlocks (sections, index : number ) : void {
        for (let section of sections) {
            for (let block of section.blocks) {
                block.custom.applicantIndex = index;
            }
        }
    }

}
