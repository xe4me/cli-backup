export interface IFormModel {
    firstName: string,
    lastName: string,
    middleNames: string,
    title: string,
    dateOfBirth: Date,
    email: string,
    verificationId: string,
    verificationToken: string,
    verficationStatus: string,
    address: {
        country: string,
        state: string,
        streetName: string,
        flatNumber: string,
        streetNumber: string,
        suburb: string,
    }

}
