namespace RoboGame {
    import ƒ = FudgeCore;
    export enum SFXs {
        gameOverSound,
        gameStartSound,
        lootingSound,
        levelUpSound,
        shieldReloadedSound,
        timewarpActiveSound,
        hitSound
    }
    export let masterVolume: number = 1;
    export class SFX {
        public cmpAudioSoundtrack: ƒ.ComponentAudio;
        
        private audioExplosion: ƒ.Audio;
        private audioGameStart: ƒ.Audio;
        private audioLooting: ƒ.Audio;
        private audioLvlUp: ƒ.Audio;
        private audioMainMenu: ƒ.Audio;
        private audioShieldReload: ƒ.Audio;
        private audioTimewarpActive: ƒ.Audio;
        private audioSoundtrack: ƒ.Audio;
        private audioHit: ƒ.Audio;

        private cmpAudioExplosion: ƒ.ComponentAudio;
        private cmpAudioGameStart: ƒ.ComponentAudio;
        private cmpAudioLooting: ƒ.ComponentAudio;
        private cmpAudioLvlUp: ƒ.ComponentAudio;
        private cmpAudioMainMenu: ƒ.ComponentAudio;
        private cmpAudioShieldReload: ƒ.ComponentAudio;
        private cmpAudioTimewarpActive: ƒ.ComponentAudio;
        private cmpAudioHit: ƒ.ComponentAudio;

        constructor() {
            this.audioExplosion = new ƒ.Audio("./sounds/explosion.wav");
            this.cmpAudioExplosion = new ƒ.ComponentAudio(this.audioExplosion, false, false);
            this.cmpAudioExplosion.connect(true);
            this.cmpAudioExplosion.volume = 1 * masterVolume;

            this.audioGameStart = new ƒ.Audio("./sounds/game_start.wav");
            this.cmpAudioGameStart = new ƒ.ComponentAudio(this.audioGameStart, false, false);
            this.cmpAudioGameStart.connect(true);
            this.cmpAudioGameStart.volume = 1 * masterVolume;

            this.audioLooting = new ƒ.Audio("./sounds/looting.wav");
            this.cmpAudioLooting = new ƒ.ComponentAudio(this.audioLooting, false, false);
            this.cmpAudioLooting.connect(true);
            this.cmpAudioLooting.volume = 1 * masterVolume;

            this.audioLvlUp = new ƒ.Audio("./sounds/lvl_up.wav");
            this.cmpAudioLvlUp = new ƒ.ComponentAudio(this.audioLvlUp, false, false);
            this.cmpAudioLvlUp.connect(true);
            this.cmpAudioLvlUp.volume = 1 * masterVolume;

            this.audioMainMenu = new ƒ.Audio("./sounds/main_menu.mp3");
            this.cmpAudioMainMenu = new ƒ.ComponentAudio(this.audioMainMenu, false, false);
            this.cmpAudioMainMenu.connect(true);
            this.cmpAudioMainMenu.volume = 0.6 * masterVolume;

            this.audioShieldReload = new ƒ.Audio("./sounds/shield_reload.wav");
            this.cmpAudioShieldReload = new ƒ.ComponentAudio(this.audioShieldReload, false, false);
            this.cmpAudioShieldReload.connect(true);
            this.cmpAudioShieldReload.volume = 1 * masterVolume;

            this.audioTimewarpActive = new ƒ.Audio("./sounds/timewarp_active.wav");
            this.cmpAudioTimewarpActive = new ƒ.ComponentAudio(this.audioTimewarpActive, false, false);
            this.cmpAudioTimewarpActive.connect(true);
            this.cmpAudioTimewarpActive.volume = 1 * masterVolume;

            this.audioSoundtrack = new ƒ.Audio("./sounds/soundtrack.mp3");
            this.cmpAudioSoundtrack = new ƒ.ComponentAudio(this.audioSoundtrack, false, false);
            this.cmpAudioSoundtrack.connect(true);
            this.cmpAudioSoundtrack.volume = 0.6 * masterVolume;
            
            this.audioHit = new ƒ.Audio("./sounds/hit.wav");
            this.cmpAudioHit = new ƒ.ComponentAudio(this.audioHit, false, false);
            this.cmpAudioHit.connect(true);
            this.cmpAudioHit.volume = 0.6 * masterVolume;

        }
        public playSFX(_sfx: SFXs): void {
            switch (_sfx) {
                case SFXs.gameOverSound:
                    this.cmpAudioExplosion.play(true);
                    break;
                case SFXs.gameStartSound:
                    this.cmpAudioGameStart.play(true);
                    break;
                case SFXs.lootingSound:
                    this.cmpAudioLooting.play(true);
                    break;
                case SFXs.levelUpSound:
                    this.cmpAudioLvlUp.play(true);
                    break;
                case SFXs.shieldReloadedSound:
                    this.cmpAudioShieldReload.play(true);
                    break;
                case SFXs.timewarpActiveSound:
                    this.cmpAudioTimewarpActive.play(true);
                    break;
                case SFXs.hitSound:
                    this.cmpAudioHit.play(true);
                    break;
            
            }
        }
        public soundTrack(_OnOff: boolean): void {

            if (this.cmpAudioSoundtrack.isPlaying && _OnOff == false) {
                this.cmpAudioSoundtrack.play(_OnOff);
            } else if (this.cmpAudioSoundtrack.isPlaying == false && _OnOff) {
                this.cmpAudioSoundtrack.play(_OnOff);
            }
        }

        public menuSound(_OnOff: boolean): void {
            if (this.cmpAudioMainMenu.isPlaying && _OnOff == false) {
                this.cmpAudioMainMenu.play(_OnOff);
            } else if (this.cmpAudioMainMenu.isPlaying == false && _OnOff) {
                this.cmpAudioMainMenu.play(_OnOff);
            }
        }
    }
}