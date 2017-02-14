import { PrepopAmpBasicInfoService } from '../../../app/modules/amp-basic-info-block/services/prepop-amp-basic-info.service';

describe( 'Service: PrepopAmpBasicInfoService' , () => {

    const prepopAmpBasicInfoService = new PrepopAmpBasicInfoService(null, null);

    describe ( 'parseTitle', () => {

        it( 'When giving a valid title', () => {
            it( 'should just returning the same value', () => {
                expect( prepopAmpBasicInfoService[' parseTitle '] ( 'Mr' ) ).toBe( 'Mr' );
            });
        });

        it( 'When giving a title ending with a dot', () => {
            it( 'should remove the dot and return it', () => {
                expect( prepopAmpBasicInfoService[' parseTitle '] ( 'Mr.' ) ).toBe( 'Mr' );
            });
        });
    });

    describe ( 'parseBirthDate', () => {
        it( 'When giving a date with the format of Customer API', () => {
            it( 'should convert it to the form expected format', () => {
                expect( prepopAmpBasicInfoService[' parseBirthDate '] ( '1949-09-24' ) ).toBe( '24/09/1949' );
            });
        });
    });

});
