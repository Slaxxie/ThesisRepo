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
                riddleUI.removeChild(this);
                document.getElementById("RiddleMenu").removeChild(this.riddleUI);
                let newRiddle: Riddles = new Riddles(this.tempDiff, this.tempType);
                riddleHandler.addChild(newRiddle);
            });
            this.submit.id = "submitRiddle";
        }


    }
}