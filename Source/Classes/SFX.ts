namespace RoboGameNamespace {
    import ƒ = FudgeCore;
    export enum SFXs {
        buttonSound,
        gameSound
    }
    export let masterVolume: number = 1;
    export class SFX {
        public cmpAudioSoundtrack: ƒ.ComponentAudio;

        private buttonClick: ƒ.Audio;
        private audioSoundtrack: ƒ.Audio;

        private cmpButtonClick: ƒ.ComponentAudio;

        constructor() {
            this.buttonClick = new ƒ.Audio("./Sounds/buttonClick.wav");
            this.cmpButtonClick = new ƒ.ComponentAudio(this.buttonClick, false, false);
            this.cmpButtonClick.connect(true);
            this.cmpButtonClick.volume = 1 * masterVolume;

            this.audioSoundtrack = new ƒ.Audio("./Sounds/soundtrack.mp3");
            this.cmpAudioSoundtrack = new ƒ.ComponentAudio(this.audioSoundtrack, false, false);
            this.cmpAudioSoundtrack.connect(true);
            this.cmpAudioSoundtrack.volume = 0.6 * masterVolume;
        }
        public playButtonSound(): void {
                    this.cmpButtonClick.play(true);  
        }
        public soundTrack(_OnOff: boolean): void {

            if (this.cmpAudioSoundtrack.isPlaying && _OnOff == false) {
                this.cmpAudioSoundtrack.play(_OnOff);
            } else if (this.cmpAudioSoundtrack.isPlaying == false && _OnOff) {
                this.cmpAudioSoundtrack.play(_OnOff);
            }
        }
    }
    export function changeMasterVolume(_event: Event): void {
        let slider: HTMLInputElement = <HTMLInputElement>_event.target;
        masterVolume = parseInt(slider.value) / 100;
        ƒ.AudioManager.default.volume = masterVolume;
        ƒ.AudioManager.default.gain.gain.value = masterVolume;
    }
}