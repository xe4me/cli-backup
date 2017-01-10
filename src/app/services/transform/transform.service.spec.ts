import { TransformService } from './transform.service';

describe('TransformService', () => {

    const mockFormData = {
        name : 'John' ,
        dateOfBirth : '01/01/1990'
    };

    let transformService : TransformService = new TransformService();

    it('default behaviour is to not transform data', () => {
        const backendModel = transformService.toBackendModel(mockFormData);
        expect(backendModel).toEqual(mockFormData);
    });

});
