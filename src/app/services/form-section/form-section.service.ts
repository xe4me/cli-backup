import { Injectable , EventEmitter }     from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class FormSectionService {
    public currentSection : string[];
    public $onRegisterSection : EventEmitter<any> = new EventEmitter<any>();
    public currentSectionFdn : string[]           = [];
    public currentSectionIndex : number;
    // Scope of the section this service is initialized to.
    private sectionScopeFDN : string[];
    // List of sections formDef accord to the sectionScopeFDN
    // P.S. currently the ordering of the sections comes from the FormDef, it is forseeable that the order might not be static
    // in which case, we will need to add an index that dictates the order.
    private _formDefSections = [];

    public isCurrentSection ( sectionFullyDistinguishedName : string[] ) : boolean {
        if ( sectionFullyDistinguishedName && sectionFullyDistinguishedName.length && this.currentSectionFdn && this.currentSectionFdn.length ) {
            return sectionFullyDistinguishedName.join() === this.currentSectionFdn.join();
        }
        return false;
    }

    get sections () {
        return this._formDefSections;
    }

    goToNextSection () {
        if ( this.currentSectionIndex < (this._formDefSections.length - 1) ) {
            this.currentSectionIndex ++;
            this.currentSectionFdn = this._formDefSections[ this.currentSectionIndex ]._fdn;
        }
    }

    goToPrevSection () {
        if ( this.currentSectionIndex > 0 ) {
            this.currentSectionIndex --;
            this.currentSectionFdn = this._formDefSections[ this.currentSectionIndex ]._fdn;
        }
    }

    public registerSection ( _section ) {
        setTimeout( () => {
            if ( this.currentSectionFdn.length === 0 ) { // The first section who registers would be the first current
                // section
                this.currentSectionFdn   = _section._fdn;
                this.currentSectionIndex = 0;
            }
            this._formDefSections.push( _section );
            this.$onRegisterSection.emit( _section );
        } );
    }

    public setCurrentActiveSection ( _section , _index ) {
        if ( this.currentSectionIndex === _index ) {
            return;
        }
        this.currentSectionIndex = _index;
        this.currentSectionFdn   = _section._fdn;
    }
}
