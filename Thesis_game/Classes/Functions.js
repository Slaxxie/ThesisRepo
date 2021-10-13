"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    function changeMasterVolume(_event) {
        let slider = _event.target;
        RoboGame.masterVolume = parseInt(slider.value) / 100;
        ƒ.AudioManager.default.volume = RoboGame.masterVolume;
        ƒ.AudioManager.default.gain.gain.value = RoboGame.masterVolume;
    }
    RoboGame.changeMasterVolume = changeMasterVolume;
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=Functions.js.map