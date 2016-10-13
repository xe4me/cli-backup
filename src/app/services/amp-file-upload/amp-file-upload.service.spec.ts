import { AmpFileUploadService } from './amp-file-upload.service';

describe( 'Amp File Upload service' , ( ) => {
    let _fileUploadService;
    beforeEach( ( ) => {
        _fileUploadService = new AmpFileUploadService( null );
    } );

    it( 'Should return a valid token url' , ( ) => {
        expect( _fileUploadService.tokenUrl ).toBe( 'https://api-upload-ddc.digital-pilot.ampaws.com.au/ddc/secure/api/upload/token' );
        } );

    it( 'Should return a valid upload url' , ( ) => {
            expect( _fileUploadService.uploadUrl ).toBe( 'https://api-upload-ddc.digital-pilot.ampaws.com.au/ddc/secure/api/upload/upload' );
        } ) ;

} );
