"use strict";
var AssociationLengthAbstract = (function () {
    function AssociationLengthAbstract() {
    }
    Object.defineProperty(AssociationLengthAbstract, "timeframes", {
        get: function () {
            return this.associationLengthRadios;
        },
        enumerable: true,
        configurable: true
    });
    AssociationLengthAbstract.getOptionsByLicensee = function (licensee) {
        return this.associationLengthRadios.getOptions(licensee);
    };
    AssociationLengthAbstract.getLabel = function (licensee, value) {
        var options = this.getOptionsByLicensee(licensee);
        for (var i = 0; i < options.length; i++) {
            var item = options[i];
            if (item.value === value) {
                return item.label.toLowerCase();
            }
        }
        return '';
    };
    Object.defineProperty(AssociationLengthAbstract, "groupName", {
        get: function () {
            return this.associationLengthRadios.groupName;
        },
        enumerable: true,
        configurable: true
    });
    AssociationLengthAbstract.associationLengthRadios = {
        buttons: {
            DEA_AMPFP: [
                {
                    id: 'at_least_fifteen',
                    value: 'at_least_fifteen',
                    label: 'At least 15 years'
                },
                {
                    id: 'at_least_four_years_but_fewer_than_15_years',
                    value: 'at_least_four_years_but_fewer_than_15_years',
                    label: 'At least four years but fewer than 15 years.'
                },
                {
                    id: 'fewer_than_four_years',
                    value: 'fewer_than_four_years',
                    label: 'Fewer than four years.'
                }
            ],
            DEA_ASSURED: [
                {
                    id: 'at_least_fifteen',
                    value: 'at_least_fifteen',
                    label: 'At least 15 years'
                },
                {
                    id: 'at_least_four_years_but_fewer_than_15_years',
                    value: 'at_least_four_years_but_fewer_than_15_years',
                    label: 'At least four years but fewer than 15 years.'
                },
                {
                    id: 'fewer_than_four_years',
                    value: 'fewer_than_four_years',
                    label: 'Fewer than four years.'
                }
            ],
            DEA_HILLROSS: [
                {
                    id: 'at_least_five_years',
                    value: 'at_least_five_years',
                    label: 'At least five years.'
                },
                {
                    id: 'fewer_than_five_years',
                    value: 'fewer_than_five_years',
                    label: 'Fewer than five years (subject to exceptional circumstances)'
                }
            ],
            DEA_CHARTER: [
                {
                    id: 'at_least_five_years',
                    value: 'at_least_five_years',
                    label: 'At least five years.'
                },
                {
                    id: 'fewer_than_five_years',
                    value: 'fewer_than_five_years',
                    label: 'Fewer than five years (subject to exceptional circumstances)'
                }
            ]
        },
        groupName: 'associationLength',
        getOptions: function (licensee) {
            return this.buttons[licensee] || [];
        }
    };
    return AssociationLengthAbstract;
}());
exports.AssociationLengthAbstract = AssociationLengthAbstract;
