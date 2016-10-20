/*
 * Utils based class for dom manipulation, its worth noting that you can add or search single classes, multiple classes will need to be added
 *
 */
export class DomUtils {

    public addClass (el : any, className : string) {
        if (el.classList) {
            el.classList.add(className);
        } else if (!this.hasClass(el, className)) {
            el.className += ' ' + className;
        }
    }

    public removeClass (el : any, className : string) {
        if (el.classList) {
            el.classList.remove(className);
        } else if (this.hasClass(el, className)) {
            let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }

    public hasClass (el : any, className : string) {
        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    }

    public isVisible (el : any) {
        return  el.clientWidth !== 0 &&
                el.clientHeight !== 0 &&
                el.style.opacity !== 0 &&
                el.style.opacity !== '0' &&
                el.style.visibility !== 'hidden';
    }
}
