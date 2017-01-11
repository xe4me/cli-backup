import { Injectable } from '@angular/core';

/**
 * Convert model between frontend and backend
 * > A way for the backend model to be less dependent on the UI form structure
 */
@Injectable()
export class TransformService {

    public toBackendModel ( frontendModel ) {
        let backendModel = frontendModel;
        // No transformation by default, up to each experience to redefine it
        return backendModel;
    }

    public toFrontendModel ( backendModel ) {
        let frontendModel = backendModel;
        // No transformation by default, up to each experience to redefine it
        return frontendModel;
    }

}
