"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    RoboGameNamespace.riddleBooleanTemp = false;
    class TextRiddles {
        textRiddleFrame = document.createElement("div");
        message = document.createElement("p");
        riddleImageTemp = document.createElement("img");
        finalRiddle;
        answerHelperArray;
        constructor(header, wordbank, textBeforeInput, answers, textAfterInput, riddleImage, lastRiddle) {
            this.answerHelperArray = answers;
            this.finalRiddle = lastRiddle;
            this.textRiddleFrame.id = "textRiddleFrame";
            document.getElementById("riddles").appendChild(this.textRiddleFrame);
            let textRiddleHeader = document.createElement("div");
            let textRiddleCenter = document.createElement("div");
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
            for (let i = 0; i < answers.length; i++) {
                textRiddleCenter.innerHTML += "<br/>";
                textRiddleCenter.innerHTML += textBeforeInput[i];
                let input = document.createElement("input");
                input.id = "input" + i;
                input.className = "inputRiddle";
                textRiddleCenter.appendChild(input);
                input.size = 15;
                textRiddleCenter.innerHTML += "<span id = 'check" + i + "' ></span>";
                textRiddleCenter.innerHTML += textAfterInput[i];
            }
            let submitButton = document.createElement("button");
            textRiddleCenter.appendChild(submitButton);
            submitButton.textContent = "submit";
            submitButton.id = "riddleSubmit";
            submitButton.addEventListener("click", () => {
                this.solveTextRiddle();
                document.getElementById("blocker").style.display = "none";
            });
            let closeButton = document.createElement("button");
            textRiddleCenter.appendChild(closeButton);
            closeButton.textContent = "close";
            closeButton.id = "riddleClose";
            closeButton.addEventListener("click", () => {
                RoboGameNamespace.riddleHandler.removeAllChildren();
                document.getElementById("textRiddleFrame").remove();
                document.getElementById("blocker").style.display = "none";
            });
            let messageBox = document.createElement("div");
            messageBox.id = "messageBox";
            textRiddleCenter.appendChild(messageBox);
            messageBox.appendChild(this.message);
        }
        solveTextRiddle() {
            if (this.finalRiddle == true) {
                RoboGameNamespace.riddleBooleanTemp = true;
                RoboGameNamespace.questContentFinished = true;
            }
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
            }
            let correctAnswersHelper = 0;
            for (let i = 0; i < correctAnswers.length; i++) {
                if (correctAnswers[i] == true) {
                    correctAnswersHelper++;
                }
            }
            if (correctAnswersHelper == correctAnswers.length) {
                this.message.innerHTML = "Riddle complete!";
                RoboGameNamespace.riddleCounter++;
                RoboGameNamespace.riddleIndex++;
                //Belohnung vergeben und Rätselobjekt löschen
            }
            else {
                this.message.innerHTML = "Wrong answers!";
            }
        }
    }
    RoboGameNamespace.TextRiddles = TextRiddles;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=TextRiddles.js.map