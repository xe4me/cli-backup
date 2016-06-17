import { View , Component } from '@angular/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
let imagePath = 'src/assets/images/avatars/avatar11.svg';
@Component( { selector : 'list-basic-usage' } )
@View( {
    templateUrl : 'src/styleguide/components/list/basic_usage.html' ,
    styleUrls   : [ 'src/styleguide/components/list/basic_usage.css' ] ,
    directives  : [ MATERIAL_DIRECTIVES ]
} )
export default class ListBasicUsage {
    phones = [
        { type : 'Home' , number : '(555) 251-1234' } ,
        { type : 'Cell' , number : '(555) 786-9841' } ,
        { type : 'Office' , number : '(555) 314-1592' }
    ];
    todos  = [
        {
            face  : imagePath ,
            what  : 'Brunch this weekend?' ,
            who   : 'Min Li Chan' ,
            when  : '3:08PM' ,
            notes : ' I\'ll be in your neighborhood doing errands'
        } ,
        {
            face  : imagePath ,
            what  : 'Brunch this weekend?' ,
            who   : 'Min Li Chan' ,
            when  : '3:08PM' ,
            notes : ' I\'ll be in your neighborhood doing errands'
        } ,
        {
            face  : imagePath ,
            what  : 'Brunch this weekend?' ,
            who   : 'Min Li Chan' ,
            when  : '3:08PM' ,
            notes : ' I\'ll be in your neighborhood doing errands'
        } ,
        {
            face  : imagePath ,
            what  : 'Brunch this weekend?' ,
            who   : 'Min Li Chan' ,
            when  : '3:08PM' ,
            notes : ' I\'ll be in your neighborhood doing errands'
        } ,
        {
            face  : imagePath ,
            what  : 'Brunch this weekend?' ,
            who   : 'Min Li Chan' ,
            when  : '3:08PM' ,
            notes : ' I\'ll be in your neighborhood doing errands'
        } ,
    ];
}
