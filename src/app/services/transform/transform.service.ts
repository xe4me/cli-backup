import { Injectable } from '@angular/core';

@Injectable()
export class TransformService {

    public toBackendModel ( frontendModel ) {
        return frontendModel;
    }

}
