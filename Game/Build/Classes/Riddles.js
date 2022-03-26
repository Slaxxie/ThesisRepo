"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    RoboGameNamespace.riddleCounter = 0;
    RoboGameNamespace.questIndex = 0;
    RoboGameNamespace.riddleIndex = 0;
    RoboGameNamespace.questContentFinished = false;
    var ƒ = FudgeCore;
    class Riddles extends ƒ.Node {
        // tslint:disable-next-line: no-any
        riddleCollection;
        constructor() {
            super("Riddle");
            this.loadRiddleCollection();
        }
        async loadRiddleCollection() {
            this.riddleCollection = await (await fetch("RiddleCollection.json")).json();
            this.createRiddle();
        }
        createRiddle() {
            // tslint:disable-next-line: no-any
            let questArray = this.riddleCollection.riddles;
            let questKey = Object.keys(questArray)[RoboGameNamespace.questIndex];
            console.log(questArray[questKey]);
            let riddleKey = Object.keys(questArray[questKey])[RoboGameNamespace.riddleIndex];
            let currentRiddle = questArray[questKey][riddleKey];
            console.log(currentRiddle);
            console.log(questKey);
            let header = currentRiddle.header;
            let wordbank = currentRiddle.wordbank;
            let textBeforeInput = currentRiddle.textBeforeInput;
            let answers = currentRiddle.answers;
            let textAfterInput = currentRiddle.textAfterInput;
            let currentRiddleImage = currentRiddle.riddleImage;
            let lastRiddle = currentRiddle.finalRiddle;
            let riddle = new RoboGameNamespace.TextRiddles(header, wordbank, textBeforeInput, answers, textAfterInput, currentRiddleImage, lastRiddle);
            console.log(riddle);
        }
    }
    RoboGameNamespace.Riddles = Riddles;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=Riddles.js.map