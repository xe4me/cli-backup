import {
    AmpApplicantGeneratorService
} from './amp-applicant-generator.service';
describe('amp-applicant-generator service', () => {
    let applicantGenerator = new AmpApplicantGeneratorService();
    const testApplicantJson = {
        'test' : 'done'
    };
    const returnApplicant1Def = {
        name        : `applicant1` ,
        blockType   : 'PageSectionComponent' ,
        blockLayout : 'SECTION' ,
        commonBlock : false ,
        path        : 'sections/page-section.component' ,
        custom      : {
            label : `Applicant 1`
        } ,
        blocks      : testApplicantJson
    };
    const returnApplicant2Def = {
        name        : `applicant2` ,
        blockType   : 'PageSectionComponent' ,
        blockLayout : 'SECTION' ,
        commonBlock : false ,
        path        : 'sections/page-section.component' ,
        custom      : {
            label : `Applicant 2`
        } ,
        blocks      : testApplicantJson
    };
    beforeEach( () => {
        applicantGenerator.applicantDef = testApplicantJson;
        applicantGenerator.isCommonBlock = false;
    });
    it ('should return applicant1 form-def and increase counter', () => {
        expect(applicantGenerator.getApplicantSection()).toEqual(returnApplicant1Def);
        console.log(applicantGenerator.numberOfApplicant());
        expect(applicantGenerator.numberOfApplicant()).toBe(1);
    });

    it('should return applicant2 form-def and increase counter', () => {
        expect(applicantGenerator.getApplicantSection()).toEqual(returnApplicant2Def);
        expect(applicantGenerator.numberOfApplicant()).toBe(2);
    });
});
