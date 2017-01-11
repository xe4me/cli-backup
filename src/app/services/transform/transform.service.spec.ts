import {
    inject,
    async,
    TestBed
} from '@angular/core/testing';
import { TransformService } from './transform.service';

describe('TransformService', () => {

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
        } ) );

    describe('When converting the frontend model to the backend model', () => {

        const mockFrontModel = {
            applicant1: {
                personalDetails: {
                    basicInfo: {
                        firstName: 'John',
                        surName: 'Doe',
                        dateOfBirth: '01/01/1990'
                    }
                }
            }
        };

        it('default behaviour is to not transform data', () => {
            const backendModel = transformService.toBackendModel(mockFrontModel);
            expect(backendModel).toEqual(mockFrontModel);
        });
    });

    describe('When converting the backend model to the frontend model', () => {

        const mockBackendModel = {
            applicants: [{
                basicInfo: {
                    firstName: 'John',
                    surName: 'Doe',
                    dateOfBirth: '01/01/1990'
                }
            }]
        };

        it('default behaviour is to not transform data', () => {
            const backendModel = transformService.toFrontendModel(mockBackendModel);
            expect(backendModel).toEqual(mockBackendModel);
        });
    });

});
