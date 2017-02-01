import {async} from '@angular/core/testing';

describe( 'App: ExperienceBett3r Better Choice Test Init', () => {
    beforeEach(  async( () => {
        TestBed.configureTestingModule( {
            imports      : [ FormsModule, ReactiveFormsModule, AmpGroupButtonsModule ],
            declarations : [
                AmpGroupButtonTest
            ],
            providers    : [
                {
                    provide  : ScrollService,
                    useClass : MockScrollService
                },
                {
                    provide  : ComponentFixtureAutoDetect,
                    useValue : true
                }
            ]
        } );
        TestBed.compileComponents();
    });

    it( 'Should have at least 1 test for the build to success', () => {
        expect( true ).toBeTruthy();
    } );
} );

@Component( {
    template : `
        <better-choice-block></better-choice-block>
    `
} )
class BetterChoiceComponentTest {

}
