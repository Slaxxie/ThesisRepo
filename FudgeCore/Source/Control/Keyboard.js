"use strict";
var FudgeCore;
(function (FudgeCore) {
    /**
     * Collects the keys pressed on the keyboard and stores their status.
     */
    class Keyboard {
        // private static code_en: Object;
        /**
         * Returns true if one of the given keys is is currently being pressed.
         */
        static isPressedOne(_keys) {
            for (let code of _keys) {
                if (Keyboard.keysPressed[code])
                    return true;
            }
            return false;
        }
        /**
         * Returns true if all of the given keys are currently being pressed
         */
        static isPressedCombo(_keys) {
            for (let code of _keys) {
                if (!Keyboard.keysPressed[code])
                    return false;
            }
            return true;
        }
        /**
         * Returns the value given as _active if one or, when _combo is true, all of the given keys are pressed.
         * Returns the value given as _inactive if not.
         */
        static mapToValue(_active, _inactive, _keys, _combo = false) {
            if (!_combo && Keyboard.isPressedOne(_keys))
                return _active;
            if (Keyboard.isPressedCombo(_keys))
                return _active;
            return _inactive;
        }
        // public static locale(_keyboard: Object): void {
        //   if (!Keyboard.code_en) {
        //     // save original keyboard codes to be able to switch back later
        //     Keyboard.code_en = {};
        //     Object.assign(Keyboard.code_en, KEYBOARD_CODE);
        //   }
        //   for (let key in _keyboard) {
        //     let value: string = Reflect.get(_keyboard, key);
        //     for (let original in KEYBOARD_CODE)
        //       if (Reflect.get(KEYBOARD_CODE, original) == value)
        //         // remove original key the yields the value
        //         Reflect.deleteProperty(KEYBOARD_CODE, original);
        //     // add new key to yield that value
        //     Reflect.set(KEYBOARD_CODE, key, value);
        //   }
        // }
        static initialize() {
            let store = {};
            document.addEventListener("keydown", Keyboard.hndKeyInteraction);
            document.addEventListener("keyup", Keyboard.hndKeyInteraction);
            return store;
        }
        static hndKeyInteraction(_event) {
            Keyboard.keysPressed[_event.code] = (_event.type == "keydown");
        }
    }
    Keyboard.keysPressed = Keyboard.initialize();
    FudgeCore.Keyboard = Keyboard;
})(FudgeCore || (FudgeCore = {}));
//# sourceMappingURL=Keyboard.js.map