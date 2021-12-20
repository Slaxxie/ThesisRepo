"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    class OpenRiddle extends ƒ.Node {
        riddleUI = document.createElement("div");
        easy = document.createElement("button");
        hard = document.createElement("button");
        text = document.createElement("button");
        labyrinth = document.createElement("button");
        submit = document.createElement("button");
        tempDiff = "easy";
        tempType = "text";
        constructor() {
            super("RiddleWindow");
            this.riddleUI.id = "RiddleUI";
            document.getElementById("RiddleMenu").appendChild(this.riddleUI);
            this.riddleUI.appendChild(this.easy);
            this.easy.addEventListener("click", () => {
                this.tempDiff = "easy";
                console.log(this.tempDiff);
            });
            this.easy.id = "easyRiddle";
            this.riddleUI.appendChild(this.hard);
            this.hard.addEventListener("click", () => {
                this.tempDiff = "hard";
            });
            this.hard.id = "hardRiddle";
            this.riddleUI.appendChild(this.text);
            this.text.addEventListener("click", () => {
                this.tempType = "text";
                console.log(this.tempType);
            });
            this.text.id = "textRiddle";
            this.riddleUI.appendChild(this.labyrinth);
            this.labyrinth.addEventListener("click", () => {
                this.tempType = "labyrinth";
            });
            this.labyrinth.id = "labyrinthRiddle";
            this.riddleUI.appendChild(this.submit);
            this.submit.addEventListener("click", () => {
                RoboGameNamespace.riddleUI.removeChild(this);
                document.getElementById("RiddleMenu").removeChild(this.riddleUI);
                let newRiddle = new RoboGameNamespace.Riddles(this.tempDiff, this.tempType);
                RoboGameNamespace.riddleHandler.addChild(newRiddle);
            });
            this.submit.id = "submitRiddle";
        }
    }
    RoboGameNamespace.OpenRiddle = OpenRiddle;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=OpenRiddle.js.map