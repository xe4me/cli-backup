import { TransformService } from './transform.service';

describe('TransformService', () => {

    const mockFormData = {
        name : 'John' ,
        dateOfBirth : '01/01/1990'
    };

    it('default behaviour is to not transform data', () => {
        const backendModel = TransformService.toBackendModel(mockFormData);
        expect(backendModel).toEqual(mockFormData);
    });

});
