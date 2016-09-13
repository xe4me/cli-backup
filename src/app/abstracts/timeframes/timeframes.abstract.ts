export abstract class TimeframesAbstract {
    private static timeframesList : {} = {
        six_months    : 'six months from' ,
        later_than    : 'later than' ,
        twelve_months : '12 months from' ,
        ninety_days   : '90 days from' ,
        three_month   : 'three months from' ,
        eighteen_month: '18 months from'
    };

    public static get timeframes () {
        return this.timeframesList;
    }

    public static  getTimeFrame ( key ) {
        return this.timeframesList.hasOwnProperty( key ) ? this.timeframesList[ key ] : '';
    }
}

