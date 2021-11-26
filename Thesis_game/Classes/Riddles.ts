namespace RoboGameNamespace {
    import ƒ = FudgeCore;
    export class Riddles extends ƒ.Node {
        // tslint:disable-next-line: no-any
        public riddleCollection: any;
        constructor(_difficulty: string, _type: string) {
            super("Riddle");
            this.loadRiddleCollection(_difficulty, _type);
            
        }
        async loadRiddleCollection(difficulty: string, type: string): Promise<void> {
            this.riddleCollection = await(await fetch("RiddleCollection.json")).json();
            switch (type) {
                case "text": {
                    this.textRiddle(difficulty);
                    break;
                }
                case "labyrinth": {
                    this.labyrinthRiddle(difficulty);
                    break;
                }
                default: {
                    break;
                }
            }
        }

        textRiddle(difficulty: string): void {
            if (difficulty == "easy") {
                console.log("easy");
                //Erstellung von HTML
                // tslint:disable-next-line: no-any
                let helperArray: any = this.riddleCollection.text.easy[Math.floor(Math.random() * this.riddleCollection.text.easy.length)];
                let header: string = helperArray.header;
                let wordbank: string = helperArray.wordbank;
                let textBeforeInput: string[] = helperArray.textBeforeInput;
                let answers: string[] = helperArray.answers;
                let textAfterInput: string[] = helperArray.textAfterInput;
                let textRiddle1: TextRiddles = new TextRiddles(header, wordbank, textBeforeInput, answers, textAfterInput);
                console.log(textRiddle1);
                
            } else if (difficulty == "hard") {
                console.log("hard");
                // tslint:disable-next-line: no-any
                let helperArray: any = this.riddleCollection.text.hard[Math.floor(Math.random() * this.riddleCollection.text.hard.length)];
                let header: string = helperArray.header;
                let wordbank: string = helperArray.wordbank;
                let textBeforeInput: string[] = helperArray.textBeforeInput;
                let answers: string[] = helperArray.answers;
                let textAfterInput: string[] = helperArray.textAfterInput;
                let textRiddle1: TextRiddles = new TextRiddles(header, wordbank, textBeforeInput, answers, textAfterInput);
                console.log(textRiddle1);
            }
            else {
                console.log(difficulty);
                console.log("wrong input");
            }
        }

        labyrinthRiddle(difficulty: string): void {
            if (difficulty == "easy") {
                console.log("laby");
                console.log("easy");
            }
            if (difficulty == "hard") {
                console.log("laby");
                console.log("hard");
            }
            else {
                console.log("wrong input");
            }
        }
    }
}