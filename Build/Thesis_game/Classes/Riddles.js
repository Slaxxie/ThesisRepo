"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    class Riddles extends ƒ.Node {
        constructor(_difficulty, _type) {
            super("Riddle");
            this.loadRiddleCollection(_difficulty, _type);
        }
        async loadRiddleCollection(difficulty, type) {
            this.riddleCollection = await (await fetch("RiddleCollection.json")).json();
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
        textRiddle(difficulty) {
            if (difficulty == "easy") {
                console.log("easy");
                //Erstellung von HTML
                // tslint:disable-next-line: no-any
                let helperArray = this.riddleCollection.text.easy[Math.floor(Math.random() * this.riddleCollection.text.easy.length)];
                let header = helperArray.header;
                let wordbank = helperArray.wordbank;
                let textBeforeInput = helperArray.textBeforeInput;
                let answers = helperArray.answers;
                let textAfterInput = helperArray.textAfterInput;
                let textRiddle1 = new RoboGameNamespace.TextRiddles(header, wordbank, textBeforeInput, answers, textAfterInput);
                console.log(textRiddle1);
            }
            else if (difficulty == "hard") {
                console.log("hard");
                // tslint:disable-next-line: no-any
                let helperArray = this.riddleCollection.text.hard[Math.floor(Math.random() * this.riddleCollection.text.hard.length)];
                let header = helperArray.header;
                let wordbank = helperArray.wordbank;
                let textBeforeInput = helperArray.textBeforeInput;
                let answers = helperArray.answers;
                let textAfterInput = helperArray.textAfterInput;
                let textRiddle1 = new RoboGameNamespace.TextRiddles(header, wordbank, textBeforeInput, answers, textAfterInput);
                console.log(textRiddle1);
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