namespace RoboGame {
    import ƒ = FudgeCore;

    export function changeMasterVolume(_event: Event): void {
        let slider: HTMLInputElement = <HTMLInputElement>_event.target;
        masterVolume = parseInt(slider.value) / 100;
        ƒ.AudioManager.default.volume = masterVolume;
        ƒ.AudioManager.default.gain.gain.value = masterVolume;
    }
}