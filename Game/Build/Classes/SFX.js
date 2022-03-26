"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    let SFXs;
    (function (SFXs) {
        SFXs[SFXs["buttonSound"] = 0] = "buttonSound";
        SFXs[SFXs["gameSound"] = 1] = "gameSound";
    })(SFXs = RoboGameNamespace.SFXs || (RoboGameNamespace.SFXs = {}));
    RoboGameNamespace.masterVolume = 1;
    class SFX {
        cmpAudioSoundtrack;
        buttonClick;
        audioSoundtrack;
        cmpButtonClick;
        constructor() {
            this.buttonClick = new ƒ.Audio("./Sounds/buttonClick.wav");
            this.cmpButtonClick = new ƒ.ComponentAudio(this.buttonClick, false, false);
            this.cmpButtonClick.connect(true);
            this.cmpButtonClick.volume = 1 * RoboGameNamespace.masterVolume;
            this.audioSoundtrack = new ƒ.Audio("./Sounds/soundtrack.mp3");
            this.cmpAudioSoundtrack = new ƒ.ComponentAudio(this.audioSoundtrack, false, false);
            this.cmpAudioSoundtrack.connect(true);
            this.cmpAudioSoundtrack.volume = 0.6 * RoboGameNamespace.masterVolume;
        }
        playButtonSound() {
            this.cmpButtonClick.play(true);
        }
        soundTrack(_OnOff) {
            if (this.cmpAudioSoundtrack.isPlaying && _OnOff == false) {
                this.cmpAudioSoundtrack.play(_OnOff);
            }
            else if (this.cmpAudioSoundtrack.isPlaying == false && _OnOff) {
                this.cmpAudioSoundtrack.play(_OnOff);
            }
        }
    }
    RoboGameNamespace.SFX = SFX;
    function changeMasterVolume(_event) {
        let slider = _event.target;
        RoboGameNamespace.masterVolume = parseInt(slider.value) / 100;
        ƒ.AudioManager.default.volume = RoboGameNamespace.masterVolume;
        ƒ.AudioManager.default.gain.gain.value = RoboGameNamespace.masterVolume;
    }
    RoboGameNamespace.changeMasterVolume = changeMasterVolume;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=SFX.js.map