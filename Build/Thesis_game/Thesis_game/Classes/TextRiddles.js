"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    let answer1;
    let answer2;
    let answer3;
    let answer4;
    let answer5;
    class TextRiddles {
        constructor(header, wordbank, answers) {
            this.textRiddleFrame = document.createElement("div");
            this.textRiddleFrame.className = "textRiddleFrame";
            document.getElementById("riddles").appendChild(this.textRiddleFrame);
            let textRiddleCenter = document.createElement("div");
            textRiddleCenter.className = "textRiddleCenter";
            this.textRiddleFrame.appendChild(textRiddleCenter);
            textRiddleCenter.innerHTML = "Texträtsel <br/> ";
            textRiddleCenter.innerHTML += "zweite Zeile <br/> ";
            let buttontest = document.createElement("button");
            textRiddleCenter.appendChild(buttontest);
            textRiddleCenter.innerHTML += "<br/> blub <br/> ";
            textRiddleCenter.innerHTML += "blab <br/> ";
            textRiddleCenter.innerHTML += "blub <br/> ";
            console.log(textRiddleCenter.textContent);
            console.log(header);
            console.log(wordbank);
            console.log(answers);
            document.getElementById("button001").addEventListener("click", () => {
                this.solveTextRiddle();
            });
        }
        solveTextRiddle() {
            console.log("worked");
            let input1 = document.getElementById("input001").value.toLowerCase();
            let input2 = document.getElementById("input002").value;
            let input3 = document.getElementById("input003").value;
            let input4 = document.getElementById("input004").value;
            let input5 = document.getElementById("input005").value;
            if (input1 == "Test1" || input1 == "test1") {
                answer1 = 1;
                document.getElementById("input001").value = input1;
                document.getElementById("input001").innerHTML = "<text class=button002>" + "✔" + "</text>";
            }
            else {
                document.getElementById("input001").value = input1;
                document.getElementById("input001").innerHTML = "<text class=button002>" + "✖" + "</text>";
            }
            if (input2 == "Test2" || input2 == "test2") {
                answer2 = 1;
                document.getElementById("input002").value = input2;
                document.getElementById("input002").innerHTML = "<text class=button002>" + "✔" + "</text>";
            }
            else {
                document.getElementById("input002").value = input2;
                document.getElementById("input002").innerHTML = "<text class=button002>" + "✖" + "</text>";
            }
            if (input3 == "Test3" || input3 == "test3") {
                answer3 = 1;
                document.getElementById("input003").value = input3;
                document.getElementById("input003").innerHTML = "<text class=button002>" + "✔" + "</text>";
            }
            else {
                document.getElementById("input003").value = input3;
                document.getElementById("input003").innerHTML = "<text class=button002>" + "✖" + "</text>";
            }
            if (input4 == "Test4" || input4 == "test4") {
                answer4 = 1;
                document.getElementById("input004").value = input4;
                document.getElementById("input004").innerHTML = "<text class=button002>" + "✔" + "</text>";
            }
            else {
                document.getElementById("input004").value = input4;
                document.getElementById("input004").innerHTML = "<text class=button002>" + "✖" + "</text>";
            }
            if (input5 == "Test5" || input5 == "test5") {
                answer5 = 1;
                document.getElementById("input005").value = input5;
                document.getElementById("input005").innerHTML = "<text class=button002>" + "✔" + "</text>";
            }
            else {
                document.getElementById("input005").value = input5;
                document.getElementById("input005").innerHTML = "<text class=button002>" + "✖" + "</text>";
            }
            if (answer1 == 1 && answer2 == 1 && answer3 == 1 && answer4 == 1 && answer5 == 1) {
                document.getElementById("message001").innerHTML = "Quest complete!";
                document.getElementById("disappear001").innerHTML = ""; //Belohnung vergeben und Rätselobjekt löschen
                RoboGameNamespace.riddleHandler.removeAllChildren();
                document.getElementById("riddles").removeChild(this.textRiddleFrame);
            }
            else {
                document.getElementById("message001").innerHTML = "Wrong answers!";
            }
        }
    }
    RoboGameNamespace.TextRiddles = TextRiddles;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=TextRiddles.js.map