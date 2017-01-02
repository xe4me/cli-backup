export class AmpDateService {
    private _dateFormat : string = 'dd/mm/yyyy';
    public set dateFormat ( dateFormat ) {
        this._dateFormat = dateFormat;
    }

    public get dateFormat () {
        return this._dateFormat;
    }

    public get today () {
        let today      = new Date();
        let dd         = today.getDate();
        let mm         = today.getMonth() + 1; // January is 0!
        let yyyy       = today.getFullYear();
        let DD : any   = dd;
        let MM : any   = mm;
        let YYYY : any = yyyy;
        if ( dd < 10 ) {
            DD = '0' + dd;
        }
        if ( mm < 10 ) {
            MM = '0' + mm;
        }
        return DD + '/' + MM + '/' + YYYY;
    }

    public getDatesDiff ( fromDate, toDate ) {
        let date1    = this.stringToDate( fromDate, 'dd/mm/yyyy', '/' );
        let date2    = this.stringToDate( toDate, 'dd/mm/yyyy', '/' );
        // let timeDiff = Math.abs( date2.getTime() - date1.getTime() );
        let timeDiff = date2.getTime() - date1.getTime();
        return Math.ceil( timeDiff / (1000 * 3600 * 24) );
    }

    public stringToDate ( _date, _format, _delimiter ) : any {
        if ( _date === null ) {
            return null;
        }
        _date               = _date.replace( /\/$/, '' ).replace( /^\//, '' );
        let formatLowerCase = _format.toLowerCase();
        let formatItems     = formatLowerCase.split( _delimiter );
        let dateItems       = _date.split( _delimiter );
        if ( dateItems.length !== 3 ) {
            return null;
        }
        for ( const dateItem of dateItems.length ) {
            if ( isNaN( dateItem ) ) {
                return null;
            }
        }
        let monthIndex = formatItems.indexOf( 'mm' );
        let dayIndex   = formatItems.indexOf( 'dd' );
        let yearIndex  = formatItems.indexOf( 'yyyy' );
        let month      = parseInt( dateItems[ monthIndex ], 10 );
        month -= 1;
        return new Date( <number> dateItems[ yearIndex ], <number> month, <number> dateItems[ dayIndex ] );
    }
}
/**
 * Created by xe4me on 9/05/2016.
 */
