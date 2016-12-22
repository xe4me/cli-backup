/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require('@angular/core/testing');
classifiedModuleName %  > Service;
from;
'./<%= dasherizedModuleName %>.service';
describe('<%= classifiedModuleName %>Service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [, classifiedModuleName %  > Service]
        });
        it('should ...', testing_1.inject([, classifiedModuleName %  > Service], function (service) {
            if (service === void 0) { service =  %  > Service; }
            expect(service).toBeTruthy();
        }));
    });
});
