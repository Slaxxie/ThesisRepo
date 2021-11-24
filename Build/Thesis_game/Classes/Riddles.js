"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    class Riddles extends ƒ.Node {
        constructor(_difficulty, _type) {
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
        textRiddle(difficulty) {
            if (difficulty == "easy") {
                console.log("easy");
                let textRiddle1 = new RoboGameNamespace.TextRiddles("1", "2", ["3", "4"]);
                console.log(textRiddle1);
            }
            else if (difficulty == "hard") {
                console.log("hard");
            }
            else {
                console.log(difficulty);
                console.log("wrong input");
            }
        }
        labyrinthRiddle(difficulty) {
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
    RoboGameNamespace.Riddles = Riddles;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=Riddles.js.map