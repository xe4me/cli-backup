"use strict";
var AmpDateService = (function () {
    function AmpDateService() {
        this._dateFormat = 'dd/mm/yyyy';
    }
    Object.defineProperty(AmpDateService.prototype, "dateFormat", {
        get: function () {
            return this._dateFormat;
        },
        set: function (dateFormat) {
            this._dateFormat = dateFormat;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AmpDateService.prototype, "today", {
        get: function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; // January is 0!
            var yyyy = today.getFullYear();
            var DD = dd;
            var MM = mm;
            var YYYY = yyyy;
            if (dd < 10) {
                DD = '0' + dd;
            }
            if (mm < 10) {
                MM = '0' + mm;
            }
            return DD + '/' + MM + '/' + YYYY;
        },
        enumerable: true,
        configurable: true
    });
    AmpDateService.prototype.getDatesDiff = function (fromDate, toDate) {
        var date1 = this.stringToDate(fromDate, 'dd/mm/yyyy', '/');
        var date2 = this.stringToDate(toDate, 'dd/mm/yyyy', '/');
        // let timeDiff = Math.abs( date2.getTime() - date1.getTime() );
        var timeDiff = date2.getTime() - date1.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };
    AmpDateService.prototype.stringToDate = function (_date, _format, _delimiter) {
        if (_date === null) {
            return null;
        }
        _date = _date.replace(/\/$/, '').replace(/^\//, '');
        var formatLowerCase = _format.toLowerCase();
        var formatItems = formatLowerCase.split(_delimiter);
        var dateItems = _date.split(_delimiter);
        if (dateItems.length !== 3) {
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
        var month = parseInt(dateItems[monthIndex], 10);
        month -= 1;
        return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    };
    return AmpDateService;
}());
exports.AmpDateService = AmpDateService;
/**
 * Created by xe4me on 9/05/2016.
 */
