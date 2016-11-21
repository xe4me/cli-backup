"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var amp_ddc_components_1 = require('amp-ddc-components');
var IdCheckBlock = (function (_super) {
    __extends(IdCheckBlock, _super);
    function IdCheckBlock(formModelService, elementRef, formService, _cd, scrollService, progressObserver) {
        _super.call(this, formModelService, elementRef, _cd, progressObserver, scrollService);
        this.formService = formService;
        this.configScriptUrl = amp_ddc_components_1.Environments.property.GreenId.configScriptUrl;
        this.uiScriptUrl = amp_ddc_components_1.Environments.property.GreenId.uiScriptUrl;
        this.styleUrl = amp_ddc_components_1.Environments.property.GreenId.styleUrl;
        this.environment = amp_ddc_components_1.Environments.property.GreenId.environment;
    }
    IdCheckBlock.prototype.ngOnInit = function () {
        var applicantIndex = this.__custom.applicantIndex;
        var applicant = this.__form.get(['Application', ("Applicant" + applicantIndex + "Section")]).value;
        var personalDetails = applicant.PersonalDetailsSection;
        var residentialAddress = personalDetails.Address.Address.residentialAddress.manualAddress;
        this.checkboxLabel = this.__custom.checkboxLabel;
        this.modelValue = {
            firstName: personalDetails.BasicInfo.FirstName,
            lastName: personalDetails.BasicInfo.LastName,
            middleNames: personalDetails.BasicInfo.MiddleName || '',
            title: personalDetails.BasicInfo.Title,
            dateOfBirth: personalDetails.BasicInfo.DateOfBirth,
            email: personalDetails.ContactDetails.EmailAddress,
            verificationId: '',
            verificationToken: '',
            verificationStatus: '',
            address: {
                country: 'AU',
                state: residentialAddress.state,
                streetName: residentialAddress.streetName || '',
                flatNumber: residentialAddress.unitNumber || '',
                streetNumber: residentialAddress.streetNumber || '',
                suburb: residentialAddress.suburb,
                postcode: residentialAddress.postCode,
                streetType: residentialAddress.streetType || ''
            }
        };
    };
    IdCheckBlock = __decorate([
        core_1.Component({
            selector: 'id-check-block',
            templateUrl: './id-check.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], IdCheckBlock);
    return IdCheckBlock;
}(amp_ddc_components_1.FormBlock));
exports.IdCheckBlock = IdCheckBlock;
