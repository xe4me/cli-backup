import { Injectable } from "@angular/core";
@Injectable()
export class ThemeService {
    private _themes      = [
        {
            name  : 'Forms' ,
            color : '#4A148C' ,
            attr  : 'forms'
        },
        {
            name  : 'Tools' ,
            color : '#004983' ,
            attr  : 'tools'
        }
    ];
    private _activeTheme = this._themes[ 0 ];

    public get theme () {
        return this._activeTheme;
    }

    public get themes () {
        return this._themes;
    }

    public set theme ( _theme ) {
        this._activeTheme = _theme;
    }
}