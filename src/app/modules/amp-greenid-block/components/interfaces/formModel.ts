export interface IGreenIdFormModel {
    firstName : string;
    lastName : string;
    middleNames : string;
    title : string;
    dateOfBirth : string;
    email : string;
    verificationId : string;
    verificationToken : string;
    verificationStatus : string;
    address : {
        country : string;
        state : string;
        streetName : string;
        flatNumber : string;
        streetNumber : string;
        suburb : string;
        postcode : string;
        streetType : string;
    };
}
