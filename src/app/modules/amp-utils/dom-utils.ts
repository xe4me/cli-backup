/*
 * Utils based class for dom manipulation, its worth noting that you can add or search single classes, multiple classes will need to be added
 *
 */
export class DomUtils {

    public static hide (el : any) {
        el.setAttribute('hidden', '');
    }

    public static show (el : any) {
        el.removeAttribute('hidden');
    }

    public static toggle (el : any) {
        if ( this.isVisible(el) ) {
            this.hide(el);
        } else {
            this.show(el);
        }
    }

    public static addClass (el : any, className : string) {
        if (el.classList) {
            el.classList.add(className);
        } else if (!this.hasClass(el, className)) {
            el.className += ' ' + className;
        }
    }

    public static removeClass (el : any, className : string) {
        if (el.classList) {
            el.classList.remove(className);
        } else if (this.hasClass(el, className)) {
            let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }

    public static hasClass (el : any, className : string) {
        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    }

    public static isVisible (el : any) {
        return  el.clientWidth !== 0 &&
                el.clientHeight !== 0 &&
                el.style.opacity !== 0 &&
                el.style.opacity !== '0' &&
                el.style.visibility !== 'hidden';
    }

    public static closest (el : any, selector : string) {
        let matches = el.webkitMatchesSelector ? 'webkitMatchesSelector' : (el.msMatchesSelector ? 'msMatchesSelector' : 'matches');

        while (el.parentElement) {
            if (el[matches](selector)) {
                return el;
            }
            el = el.parentElement;
        }

        return null;
    }
}
