namespace RoboGameNamespace {
    import ƒ = FudgeCore;
    console.log("test");
    export class Riddles extends ƒ.Node {
        constructor(_difficulty: string, _type: string) {
            super("Riddle");

            switch (_type) {
                case "text": {
                    this.textRiddle(_difficulty);
                    break;
                }
                case "labyrinth": {
                    this.labyrinthRiddle(_difficulty);
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
                let textRiddle1: TextRiddles = new TextRiddles("1", "2",  ["3", "4"]);
                console.log(textRiddle1);
            } else if (difficulty == "hard") {
                console.log("hard");
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