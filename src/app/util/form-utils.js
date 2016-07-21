"use strict";
var FormUtils = (function () {
    function FormUtils() {
    }
    FormUtils.getControlByName = function (_parentGroup, _controlName) {
        return _parentGroup.controls[_controlName];
    };
    FormUtils.getSelectorNameOfClassName = function (className) {
        var split = this.splitStringByCapital(className);
        split.pop();
        return split.join('-').toLowerCase();
    };
    FormUtils.splitStringByCapital = function (string) {
        return string.split(/(?=[A-Z])/);
    };
    FormUtils.stringToDate = function (_date, _format, _delimiter) {
        if (_date === null) {
            return null;
        }
        var formatLowerCase = _format.toLowerCase();
        var formatItems = formatLowerCase.split(_delimiter);
        var dateItems = _date.split(_delimiter);
        if (dateItems.length < 3) {
            return null;
        }
        for (var i = 0; i < dateItems.length; i++) {
            if (isNaN(dateItems[i])) {
                return null;
            }
        }
        var monthIndex = formatItems.indexOf('mm');
        var dayIndex = formatItems.indexOf('dd');
        var yearIndex = formatItems.indexOf('yyyy');
        var month = parseInt(dateItems[monthIndex]) - 1;
        return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    };
    ;
    FormUtils.getDatesDiff = function (fromDate, toDate) {
        var date1 = this.stringToDate(fromDate, 'dd/MM/yyyy', '/');
        var date2 = this.stringToDate(toDate, 'dd/MM/yyyy', '/');
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };
    ;
    FormUtils.getAge = function (birthday) {
        var birthdayDate = this.stringToDate(birthday, 'dd/MM/yyyy', '/');
        var ageDifMs = Date.now() - birthdayDate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
    FormUtils.getAgeDays = function (_todate) {
        var date1 = new Date();
        var date2 = this.stringToDate(_todate, 'dd/MM/yyyy', '/');
        if (!date2) {
            return null;
        }
        var timeDiff = date2.getTime() - date1.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };
    return FormUtils;
}());
exports.FormUtils = FormUtils;
