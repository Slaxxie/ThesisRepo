namespace RoboGameNamespace {

    export let riddleBooleanTemp: boolean = false;
    export class TextRiddles {
        public textRiddleFrame: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        public message: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
        
        public riddleImageTemp: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        public finalRiddle: boolean;
        private answerHelperArray: string[];

        constructor(header: string, wordbank: string, textBeforeInput: string[], answers: string[], textAfterInput: string[], riddleImage: string, lastRiddle: boolean) {
            this.answerHelperArray = answers;
            this.finalRiddle = lastRiddle;
            this.textRiddleFrame.id = "textRiddleFrame";
            document.getElementById("riddles").appendChild(this.textRiddleFrame);
            let textRiddleHeader: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            let textRiddleCenter: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            textRiddleHeader.id = "textRiddleHeader";
            textRiddleCenter.id = "textRiddleCenter";
            this.riddleImageTemp.src = riddleImage;
            this.riddleImageTemp.id = "riddleImage";
            this.textRiddleFrame.appendChild(textRiddleHeader);
            this.textRiddleFrame.appendChild(this.riddleImageTemp);
            this.textRiddleFrame.appendChild(textRiddleCenter);


            textRiddleHeader.innerHTML = header;
            textRiddleCenter.innerHTML += "<br/>";
            textRiddleCenter.innerHTML += wordbank;
            for (let i: number = 0; i < answers.length; i++) {
                textRiddleCenter.innerHTML += "<br/>";
                textRiddleCenter.innerHTML += textBeforeInput[i];
                let input: HTMLInputElement = <HTMLInputElement>document.createElement("input");
                input.id = "input" + i;
                input.className = "inputRiddle";
                textRiddleCenter.appendChild(input);
                input.size = 15;
                textRiddleCenter.innerHTML += "<span id = 'check" + i + "' ></span>";
                textRiddleCenter.innerHTML += textAfterInput[i];
            }

            let submitButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            submitButton.className = "buttonDesignClass";
            textRiddleCenter.appendChild(submitButton);
            submitButton.textContent = "submit";
            submitButton.id = "riddleSubmit";
            submitButton.addEventListener("click", () => {
                this.solveTextRiddle();
                document.getElementById("blocker").style.display = "none";
            });

            let closeButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            closeButton.className = "buttonDesignClass";
            textRiddleCenter.appendChild(closeButton);
            closeButton.textContent = "close";
            closeButton.id = "riddleClose";
            closeButton.addEventListener("click", () => {
                riddleHandler.removeAllChildren();
                document.getElementById("textRiddleFrame").remove();
                document.getElementById("blocker").style.display = "none";
            });

            let messageBox: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            messageBox.id = "messageBox";
            textRiddleCenter.appendChild(messageBox);
            messageBox.appendChild(this.message);
        }

        solveTextRiddle(): void {
            if (this.finalRiddle == true) {
                riddleBooleanTemp = true;
                questContentFinished = true;
            }
            let correctAnswers: boolean[] = [];
            for (let i: number = 0; i < this.answerHelperArray.length; i++) {
                let input: string = (document.getElementById("input" + i) as HTMLInputElement).value.toLowerCase();

                if (input == this.answerHelperArray[i]) {
                    correctAnswers[i] = true;
                    (document.getElementById("input" + i) as HTMLInputElement).value = input;
                    document.getElementById("check" + i).textContent = "✔";
                } else {
                    correctAnswers[i] = false;
                    (document.getElementById("input" + i) as HTMLInputElement).value = input;
                    document.getElementById("check" + i).textContent = "✖";
                }
            }
            let correctAnswersHelper: number = 0;
            for (let i: number = 0; i < correctAnswers.length; i++) {
                if (correctAnswers[i] == true) {
                    correctAnswersHelper++;
                }
            }
            if (correctAnswersHelper == correctAnswers.length) {
                
                this.message.innerHTML = "Riddle complete!";
                riddleCounter++;
                riddleIndex++;
            } else {
                this.message.innerHTML = "Wrong answers!";
            }

        }
    }
}