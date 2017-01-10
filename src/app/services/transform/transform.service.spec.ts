import {
    TestBed,
    async,
    inject
} from '@angular/core/testing';

import {TransformService} from './transform.service';

describe( 'TransformService', () => {
    const mockFormData = {
        name : 'test1' ,
        dateOfBirth : '1990-01-01'
    };

    let transformService : TransformService = null;
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            providers : [
                TransformService
            ]
        } );
        TestBed.compileComponents();
    } ) );
    beforeEach( inject( [ TransformService ],
        ( _transformService : TransformService ) => {
            transformService = _transformService;
            transformService.transform(mockFormData);
        } ) );

    it ( '#isTransformed should return false after creation', ( done ) => {
        expect(transformService.isTransformedFormData).toBe(false);
        done();
    } );

    it ( 'default behaviour is Not transform data', ( done ) => {
        expect(transformService.formData).toEqual(mockFormData);
        expect(transformService.transformedData).toBeUndefined();
        done();
    } );
});
