namespace RoboGameNamespace {
    import ƒ = FudgeCore;
    export class OpenRiddle extends ƒ.Node {

        public riddleUI: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        private easy: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private hard: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private text: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private labyrinth: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private submit: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private tempDiff: string = "easy";
        private tempType: string = "text";

        constructor() {
            super("RiddleWindow");
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
                riddleUI.removeChild(this);
                document.getElementById("Riddles").removeChild(this.riddleUI);
                let newRiddle: Riddles = new Riddles(this.tempDiff, this.tempType);
                riddleHandler.addChild(newRiddle);
            });
            this.submit.className = "submitRiddle";
        }


    }
}