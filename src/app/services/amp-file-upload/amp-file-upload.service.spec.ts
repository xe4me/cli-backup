import { AmpFileUploadService } from './amp-file-upload.service';

describe( 'Amp File Upload service' , ( ) => {
    let _fileUploadService;
    beforeEach( ( ) => {
        _fileUploadService = new AmpFileUploadService( );
    } );

    it( 'Should return a valid token url' , ( ) => {
        expect( _fileUploadService.tokenUrl ).toBe( '/ddc/secure/api/upload/token' );
        } );

    it( 'Should return a valid upload url' , ( ) => {
            expect( _fileUploadService.uploadUrl ).toBe( '/ddc/secure/api/upload/upload' );
        } ) ;

} );
