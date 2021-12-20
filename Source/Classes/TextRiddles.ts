namespace RoboGameNamespace {



    export class TextRiddles {
        public textRiddleFrame: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        public message: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
        private answerHelperArray: string[];

        constructor(header: string, wordbank: string, textBeforeInput: string[], answers: string[], textAfterInput: string[]) {
            this.answerHelperArray = answers;
            this.textRiddleFrame.id = "textRiddleFrame";
            document.getElementById("Riddles").appendChild(this.textRiddleFrame);
            let textRiddleCenter: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            textRiddleCenter.id = "textRiddleCenter";
            this.textRiddleFrame.appendChild(textRiddleCenter);
            textRiddleCenter.innerHTML = header;
            textRiddleCenter.innerHTML += "<br/>";
            textRiddleCenter.innerHTML += wordbank;
            for (let i: number = 0; i < answers.length; i++) {
                textRiddleCenter.innerHTML += "<br/>";
                textRiddleCenter.innerHTML += textBeforeInput[i];
                let input: HTMLInputElement = <HTMLInputElement>document.createElement("input");
                input.id = "input" + i;
                textRiddleCenter.appendChild(input);
                input.size = 15;
                textRiddleCenter.innerHTML += "<span id = 'check" + i + "' ></span>";
                textRiddleCenter.innerHTML += textAfterInput[i];
            }
            textRiddleCenter.innerHTML += "<br/> blub <br/> ";
            textRiddleCenter.innerHTML += "blab <br/> ";
            textRiddleCenter.innerHTML += "blub <br/> ";

            let submitButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            textRiddleCenter.appendChild(submitButton);
            submitButton.addEventListener("click", () => {
                this.solveTextRiddle();
            });
            submitButton.textContent = "submit";
            let messageBox: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            messageBox.id = "messageBox";
            textRiddleCenter.appendChild(messageBox);
            messageBox.appendChild(this.message);
        }

        solveTextRiddle(): void {
            console.log("worked");
            let correctAnswers: boolean[] = [];
            for (let i: number = 0; i < this.answerHelperArray.length; i++) {
                let input: string = (document.getElementById("input" + i) as HTMLInputElement).value.toLowerCase();

                if (input == this.answerHelperArray[i]) { //answers[i]
                    correctAnswers[i] = true;
                    (document.getElementById("input" + i) as HTMLInputElement).value = input;
                    document.getElementById("check" + i).textContent = "✔";
                } else {
                    correctAnswers[i] = false;
                    (document.getElementById("input" + i) as HTMLInputElement).value = input;
                    document.getElementById("check" + i).textContent = "✖";
                }
                console.log(input == this.answerHelperArray[i]);
            }
            let correctAnswersHelper: number = 0;
            for (let i: number = 0; i < correctAnswers.length; i++) {
                if (correctAnswers[i] == true) {
                    correctAnswersHelper++;
                }
            }
            if (correctAnswersHelper == correctAnswers.length) {
                this.message.innerHTML = "Quest complete!";
                riddleCounter++;
                //Belohnung vergeben und Rätselobjekt löschen
                let closeRiddle: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
                this.textRiddleFrame.appendChild(closeRiddle);
                closeRiddle.textContent = "close";
                closeRiddle.addEventListener("click", () => {
                    riddleHandler.removeAllChildren();
                    document.getElementById("Riddles").removeChild(this.textRiddleFrame);   
                });

            } else {
                console.log(correctAnswers.length);
                console.log(correctAnswersHelper);
                this.message.innerHTML = "Wrong answers!";
            }

        }
    }
}