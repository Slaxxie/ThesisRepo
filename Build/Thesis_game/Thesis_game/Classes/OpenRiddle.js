"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    class OpenRiddle extends ƒ.Node {
        constructor() {
            super("RiddleWindow");
            this.riddleUI = document.createElement("div");
            this.easy = document.createElement("button");
            this.hard = document.createElement("button");
            this.text = document.createElement("button");
            this.labyrinth = document.createElement("button");
            this.submit = document.createElement("button");
            this.tempDiff = "easy";
            this.tempType = "text";
            this.riddleUI.className = "RiddleUI";
            document.getElementById("Riddles").appendChild(this.riddleUI);
            this.riddleUI.appendChild(this.easy);
            this.easy.addEventListener("click", () => {
                this.tempDiff = "easy";
                console.log(this.tempDiff);
            });
            this.easy.className = "easyRiddle";
            this.riddleUI.appendChild(this.hard);
            this.hard.addEventListener("click", () => {
                this.tempDiff = "hard";
            });
            this.hard.className = "hardRiddle";
            this.riddleUI.appendChild(this.text);
            this.text.addEventListener("click", () => {
                this.tempType = "text";
                console.log(this.tempType);
            });
            this.text.className = "textRiddle";
            this.riddleUI.appendChild(this.labyrinth);
            this.labyrinth.addEventListener("click", () => {
                this.tempType = "labyrinth";
            });
            this.labyrinth.className = "labyrinthRiddle";
            this.riddleUI.appendChild(this.submit);
            this.submit.addEventListener("click", () => {
                RoboGameNamespace.riddleUI.removeChild(this);
                document.getElementById("Riddles").removeChild(this.riddleUI);
                let newRiddle = new RoboGameNamespace.Riddles(this.tempDiff, this.tempType);
                RoboGameNamespace.riddleHandler.addChild(newRiddle);
            });
            this.submit.className = "submitRiddle";
        }
    }
    RoboGameNamespace.OpenRiddle = OpenRiddle;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=OpenRiddle.js.map