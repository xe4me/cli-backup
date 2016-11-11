export abstract class KeyCodes {
    static LEFT             = 37;
    static UP               = 38;
    static RIGHT            = 39;
    static DOWN             = 40;
    static BACKSPACE        = 8;
    static SPACE            = 32;
    static ENTER            = 13;
    static ESCAPE           = 27;
    static TAB              = 9;
    static ARROWS           = [ 37 , 38 , 39 , 40 ];
    static LEFT_WINDOW_KEY  = 91;
    static RIGHT_WINDOW_KEY = 92;
    static NAVIGATION_KEYS  = [ KeyCodes.SPACE , KeyCodes.ENTER , KeyCodes.UP , KeyCodes.DOWN ];

    static isInputKey ( e : KeyboardEvent ) {
        return (e.keyCode >= 31 && e.keyCode <= 90);
    }

    static isNumPadKey ( e : KeyboardEvent ) {
        return (3 === e.location && e.keyCode >= 97 && e.keyCode <= 105);
    }

    static isNavigationKey ( e : KeyboardEvent ) {
        return (KeyCodes.NAVIGATION_KEYS.indexOf( e.keyCode ) !== - 1);
    }
}
