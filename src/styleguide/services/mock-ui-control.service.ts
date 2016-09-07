import { Injectable } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder } from '@angular/forms';


@Injectable()
export class MockUIControlService {

    public logging: boolean = false;

    private model: FormGroup;

    constructor(private builder: FormBuilder) {
        this.model = builder.group({});
    }

/*
    Control
*/
    public createControl(path : string[],
                         name: string,
                         defaultValue?: string | number): FormControl {

        let ctrlgroup = this.createControlGroup(path);
        if (this.logging) { console.info('createControl:', path, name, defaultValue, ctrlgroup); }
        let newControl = null;
        if (!ctrlgroup.contains(name)) {
            newControl = new FormControl(defaultValue);
            ctrlgroup.addControl(name, newControl);
        } else {
            if (this.logging) { console.info('Control already exists:', name); }
            newControl = ctrlgroup.controls[name];
        }
        return newControl;
    }

    public getControl(path : string[], name: string ): FormControl {

      return null;
    }

/*
    Control Group
*/

    public getControlGroup(path? : string[]): FormGroup {
        let root = this.model;
        if (path) {
            for (let i in path) {
                const group = path[i];
                if ( root.contains(group) ) {
                    root = <FormGroup>root.controls[group];
                } else {
                    if (this.logging) { console.info('ControlGroup doesn\'t exists:', group); }
                    return null;
                }
            }
        }
        return root;
    }

    public createControlGroup(path : string[]): FormGroup {
        let root = this.model;
        for (let i in path) {
            const group = path[i];
            let newRoot = null;
            if ( root.contains(group) ) {
                newRoot = root.controls[group];
            } else {
                newRoot = new FormGroup({});
                root.addControl(group, newRoot);
            }
            root = newRoot;
        }
        return root;
    }



    public createControlArray(path: string[], name: string, defaultValues?): FormArray {
        let ctrlgroup = this.createControlGroup(path);
        let newControlArray = null;
        if (!ctrlgroup.contains(name)) {
            newControlArray = new FormArray( this.createControlGroupsFromArray(defaultValues) );
            ctrlgroup.addControl(name, newControlArray);
        } else {
            if (this.logging) { console.info('ControlArray already exists:', name); }
            newControlArray = ctrlgroup.controls[name];
        }
        return newControlArray;
    }

    public getControlArray(path: string[], name: string): FormArray {
        let ctrlgroup = this.getControlGroup(path);
        if (ctrlgroup && ctrlgroup.contains(name)) {
            return <FormArray>ctrlgroup.controls[name];
        }
        if (this.logging) { console.info('Control doesn\'t exists:', name); }
        return null;
    }


/*
    Update model
*/

    public updateModel(newModel: any , path? : string[]) : void {
        if (!path) {
            path = [];
        }
        const pathIndex = path.length;

        for (let key in newModel) {
            path.splice(pathIndex);
            path[pathIndex]  = key;
            let currentModel = newModel[key];
            const group      = path.slice(0, path.length - 1);

            if (currentModel instanceof Array) {
                this.createControlArray(group, key, currentModel);
            } else if (typeof(currentModel) === 'object') {
                this.updateModel(currentModel, path);
            } else {
                this.createControl(group, key, currentModel);
            }
        }

    }

    /*
    Control Array
    */
    private createControlGroupsFromArray(array?) {
        let ret = [];
        if (array) {
            for ( let i in array ) {
                const obj = array[i];
                let newGroup = new FormGroup({});
                for ( let key in obj ) {
                    newGroup.addControl(key, new FormControl(obj[key]));
                }
                ret.push(newGroup);
            }
        }
        return ret;
    }

}
