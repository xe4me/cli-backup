export abstract class AssociationLengthAbstract {
    private static associationLengthRadios = {
        buttons   : {
            DEA_AMPFP   : [
                {
                    id   : 'at_least_fifteen' ,
                    value: 'at_least_fifteen' ,
                    label: 'At least 15 years'
                } ,
                {
                    id   : 'at_least_four_years_but_fewer_than_15_years' ,
                    value: 'at_least_four_years_but_fewer_than_15_years' ,
                    label: 'At least four years but fewer than 15 years.'
                } ,
                {
                    id   : 'fewer_than_four_years' ,
                    value: 'fewer_than_four_years' ,
                    label: 'Fewer than four years.'
                }
            ] ,
            DEA_ASSURED   : [
                {
                    id   : 'at_least_fifteen' ,
                    value: 'at_least_fifteen' ,
                    label: 'At least 15 years'
                } ,
                {
                    id   : 'at_least_four_years_but_fewer_than_15_years' ,
                    value: 'at_least_four_years_but_fewer_than_15_years' ,
                    label: 'At least four years but fewer than 15 years.'
                } ,
                {
                    id   : 'fewer_than_four_years' ,
                    value: 'fewer_than_four_years' ,
                    label: 'Fewer than four years.'
                }
            ] ,
            DEA_HILLROSS: [
                {
                    id   : 'at_least_five_years' ,
                    value: 'at_least_five_years' ,
                    label: 'At least five years.'
                } ,
                {
                    id   : 'fewer_than_five_years' ,
                    value: 'fewer_than_five_years' ,
                    label: 'Fewer than five years (subject to exceptional circumstances)'
                }
            ] ,
            DEA_CHARTER : [
                {
                    id   : 'at_least_five_years' ,
                    value: 'at_least_five_years' ,
                    label: 'At least five years.'
                } ,
                {
                    id   : 'fewer_than_five_years' ,
                    value: 'fewer_than_five_years' ,
                    label: 'Fewer than five years (subject to exceptional circumstances)'
                }
            ]
        } ,
        groupName : 'associationLength' ,
        getOptions: function( licensee ) {
            return this.buttons[ licensee ] || [];
        }
    };

    public static get timeframes () {
        return this.associationLengthRadios;
    }

    public static getOptionsByLicensee ( licensee: string ) {
        return this.associationLengthRadios.getOptions( licensee );
    }

    public static getLabel ( licensee: string , value: string ) {
        let options = this.getOptionsByLicensee( licensee );
        for ( let i = 0 ; i < options.length ; i ++ ) {
            let item = options[ i ];
            if ( item.value === value ) {
                return item.label.toLowerCase();
            }
        }
        return '';
    }

    public static get groupName () {
        return this.associationLengthRadios.groupName;
    }
}
