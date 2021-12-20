"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    class TextRiddles {
        textRiddleFrame = document.createElement("div");
        message = document.createElement("p");
        answerHelperArray;
        constructor(header, wordbank, textBeforeInput, answers, textAfterInput) {
            this.answerHelperArray = answers;
            this.textRiddleFrame.id = "textRiddleFrame";
            document.getElementById("Riddles").appendChild(this.textRiddleFrame);
            let textRiddleCenter = document.createElement("div");
            textRiddleCenter.id = "textRiddleCenter";
            this.textRiddleFrame.appendChild(textRiddleCenter);
            textRiddleCenter.innerHTML = header;
            textRiddleCenter.innerHTML += "<br/>";
            textRiddleCenter.innerHTML += wordbank;
            for (let i = 0; i < answers.length; i++) {
                textRiddleCenter.innerHTML += "<br/>";
                textRiddleCenter.innerHTML += textBeforeInput[i];
                let input = document.createElement("input");
                input.id = "input" + i;
                textRiddleCenter.appendChild(input);
                input.size = 15;
                textRiddleCenter.innerHTML += "<span id = 'check" + i + "' ></span>";
                textRiddleCenter.innerHTML += textAfterInput[i];
            }
            textRiddleCenter.innerHTML += "<br/> blub <br/> ";
            textRiddleCenter.innerHTML += "blab <br/> ";
            textRiddleCenter.innerHTML += "blub <br/> ";
            let submitButton = document.createElement("button");
            textRiddleCenter.appendChild(submitButton);
            submitButton.addEventListener("click", () => {
                this.solveTextRiddle();
            });
            submitButton.textContent = "submit";
            let messageBox = document.createElement("div");
            messageBox.id = "messageBox";
            textRiddleCenter.appendChild(messageBox);
            messageBox.appendChild(this.message);
        }
        solveTextRiddle() {
            console.log("worked");
            let correctAnswers = [];
            for (let i = 0; i < this.answerHelperArray.length; i++) {
                let input = document.getElementById("input" + i).value.toLowerCase();
                if (input == this.answerHelperArray[i]) { //answers[i]
                    correctAnswers[i] = true;
                    document.getElementById("input" + i).value = input;
                    document.getElementById("check" + i).textContent = "✔";
                }
                else {
                    correctAnswers[i] = false;
                    document.getElementById("input" + i).value = input;
                    document.getElementById("check" + i).textContent = "✖";
                }
                console.log(input == this.answerHelperArray[i]);
            }
            let correctAnswersHelper = 0;
            for (let i = 0; i < correctAnswers.length; i++) {
                if (correctAnswers[i] == true) {
                    correctAnswersHelper++;
                }
            }
            if (correctAnswersHelper == correctAnswers.length) {
                this.message.innerHTML = "Quest complete!";
                RoboGameNamespace.riddleCounter++;
                //Belohnung vergeben und Rätselobjekt löschen
                let closeRiddle = document.createElement("button");
                this.textRiddleFrame.appendChild(closeRiddle);
                closeRiddle.textContent = "close";
                closeRiddle.addEventListener("click", () => {
                    RoboGameNamespace.riddleHandler.removeAllChildren();
                    document.getElementById("Riddles").removeChild(this.textRiddleFrame);
                });
            }
            else {
                console.log(correctAnswers.length);
                console.log(correctAnswersHelper);
                this.message.innerHTML = "Wrong answers!";
            }
        }
    }
    RoboGameNamespace.TextRiddles = TextRiddles;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=TextRiddles.js.map