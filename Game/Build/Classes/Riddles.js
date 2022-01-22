"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    RoboGameNamespace.riddleCounter = 0;
    var ƒ = FudgeCore;
    class Riddles extends ƒ.Node {
        // tslint:disable-next-line: no-any
        riddleCollection;
        constructor(_difficulty) {
            super("Riddle");
            this.loadRiddleCollection(_difficulty);
        }
        async loadRiddleCollection(difficulty) {
            this.riddleCollection = await (await fetch("RiddleCollection.json")).json();
            this.textRiddle(difficulty);
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
    }
    RoboGameNamespace.Riddles = Riddles;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=Riddles.js.map