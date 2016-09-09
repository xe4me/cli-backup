import { Injectable } from '@angular/core';
import { Control, ControlArray, ControlGroup, FormBuilder } from '@angular/common';

@Injectable()
export class MockUIControlService {

    public logging: boolean = false;

    private model: ControlGroup;

    constructor(private builder: FormBuilder) {
        this.model = builder.group({});
    }

/*
    Control
*/
    public createControl(path : string[],
                         name: string,
                         defaultValue?: string | number): Control {

        let ctrlgroup = this.createControlGroup(path);
        if (this.logging) { console.info('createControl:', path, name, defaultValue, ctrlgroup); }
        let newControl = null;
        if (!ctrlgroup.contains(name)) {
            newControl = new Control(defaultValue);
            ctrlgroup.addControl(name, newControl);
        } else {
            if (this.logging) { console.info('Control already exists:', name); }
            newControl = ctrlgroup.controls[name];
        }
        return newControl;
    }

    public getControl(path : string[], name: string ): Control {

      return null;
    }

/*
    Control Group
*/
    public getControlGroup(path? : string[]): ControlGroup {
        let root = this.model;
        if (path) {
            for (let i in path) {
                const group = path[i];
                if ( root.contains(group) ) {
                    root = <ControlGroup>root.controls[group];
                } else {
                    if (this.logging) { console.info('ControlGroup doesn\'t exists:', group); }
                    return null;
                }
            }
        }
        return root;
    }

    public createControlGroup(path : string[]): ControlGroup {
        let root = this.model;
        for (let i in path) {
            const group = path[i];
            let newRoot = null;
            if ( root.contains(group) ) {
                newRoot = root.controls[group];
            } else {
                newRoot = new ControlGroup({});
                root.addControl(group, newRoot);
            }
            root = newRoot;
        }
        return root;
    }

/*
    Control Array
*/
    public createControlArray(path: string[], name: string, defaultValues?): ControlArray {
        let ctrlgroup = this.createControlGroup(path);
        let newControlArray = null;
        if (!ctrlgroup.contains(name)) {
            newControlArray = new ControlArray( this.createControlGroupsFromArray(defaultValues) );
            ctrlgroup.addControl(name, newControlArray);
        } else {
            if (this.logging) { console.info('ControlArray already exists:', name); }
            newControlArray = ctrlgroup.controls[name];
        }
        return newControlArray;
    }

    public getControlArray(path: string[], name: string): ControlArray {
        let ctrlgroup = this.getControlGroup(path);
        if (ctrlgroup && ctrlgroup.contains(name)) {
            return <ControlArray>ctrlgroup.controls[name];
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

    private createControlGroupsFromArray(array?) {
        let ret = [];
        if (array) {
            for ( let i in array ) {
                const obj = array[i];
                let newGroup = new ControlGroup({});
                for ( let key in obj ) {
                    newGroup.addControl(key, new Control(obj[key]));
                }
                ret.push(newGroup);
            }
        }
        return ret;
    }
}
