namespace RoboGameNamespace {
    export let riddleCounter: number = 0;
    export let questIndex: number = 0;
    export let riddleIndex: number = 0;
    export let questContentFinished: boolean = false;
    import ƒ = FudgeCore;
    export class Riddles extends ƒ.Node {
        // tslint:disable-next-line: no-any
        public riddleCollection: any;
        constructor() {
            super("Riddle");
            this.loadRiddleCollection();

        }
        async loadRiddleCollection(): Promise<void> {
            this.riddleCollection = await (await fetch("RiddleCollection.json")).json();
            this.createRiddle();
        }

        createRiddle(): void {

            // tslint:disable-next-line: no-any
            let questArray: any = this.riddleCollection.riddles;
            let questKey: any = Object.keys(questArray)[questIndex];
            console.log(questArray[questKey]);
            let riddleKey: any = Object.keys(questArray[questKey])[riddleIndex];
            let currentRiddle: any = questArray[questKey][riddleKey];
            console.log(currentRiddle); 

            console.log(questKey);
            let header: string = currentRiddle.header;
            let wordbank: string = currentRiddle.wordbank;
            let textBeforeInput: string[] = currentRiddle.textBeforeInput;
            let answers: string[] = currentRiddle.answers;
            let textAfterInput: string[] = currentRiddle.textAfterInput;
            let currentRiddleImage: string = currentRiddle.riddleImage;
            let lastRiddle: boolean = currentRiddle.finalRiddle;
            let riddle: TextRiddles = new TextRiddles(header, wordbank, textBeforeInput, answers, textAfterInput, currentRiddleImage, lastRiddle);
            console.log(riddle);

        }
    }
}