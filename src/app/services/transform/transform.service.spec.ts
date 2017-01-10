import {
    inject
} from '@angular/core/testing';

import {TransformService} from './transform.service';

describe( 'TransformService', () => {
    const mockFormData = {
        name : 'test1' ,
        dateOfBirth : '1990-01-01'
    };

    let transformService : TransformService = null;
    beforeEach( () => {
        transformService = new TransformService();
        transformService.transform(mockFormData);
    });

    it ( '#isTransformed should return false after creation', ()  => {
        expect(transformService.isTransformedFormData).toBe(false);
    } );

    it ( 'default behaviour is Not transform data', () => {
        expect(transformService.formData).toEqual(mockFormData);
        expect(transformService.transformedData).toBeUndefined();
    } );
});
