"use strict";
var TimeframesAbstract = (function () {
    function TimeframesAbstract() {
    }
    Object.defineProperty(TimeframesAbstract, "timeframes", {
        get: function () {
            return this.timeframesList;
        },
        enumerable: true,
        configurable: true
    });
    TimeframesAbstract.getTimeFrame = function (key) {
        return this.timeframesList.hasOwnProperty(key) ? this.timeframesList[key] : '';
    };
    TimeframesAbstract.timeframesList = {
        six_months: 'six months from',
        later_than: 'later than',
        twelve_months: '12 months from',
        ninety_days: '90 days from',
        three_month: 'three months from',
        eighteen_month: '18 months from'
    };
    return TimeframesAbstract;
}());
exports.TimeframesAbstract = TimeframesAbstract;
