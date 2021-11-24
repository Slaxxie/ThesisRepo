namespace RoboGameNamespace {
    
    let answer1: number;
    let answer2: number;
    let answer3: number;
    let answer4: number;
    let answer5: number;
    export class TextRiddles {
        public textRiddleFrame: HTMLDivElement = <HTMLDivElement>document.createElement("div");

        constructor(header: string, wordbank: string, answers: string[]) {
            this.textRiddleFrame.className = "textRiddleFrame";
            document.getElementById("riddles").appendChild(this.textRiddleFrame);
            let textRiddleCenter: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            textRiddleCenter.className = "textRiddleCenter";
            this.textRiddleFrame.appendChild(textRiddleCenter);
            textRiddleCenter.innerHTML = "Texträtsel <br/> ";
            textRiddleCenter.innerHTML += "zweite Zeile <br/> ";
            let buttontest: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
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

        solveTextRiddle(): void {
            console.log("worked");
            let input1: string = (document.getElementById("input001") as HTMLInputElement).value.toLowerCase();
            let input2: string = (document.getElementById("input002") as HTMLInputElement).value;
            let input3: string = (document.getElementById("input003") as HTMLInputElement).value;
            let input4: string = (document.getElementById("input004") as HTMLInputElement).value;
            let input5: string = (document.getElementById("input005") as HTMLInputElement).value;
            if (input1 == "Test1" || input1 == "test1") {
                answer1 = 1;
                (document.getElementById("input001") as HTMLInputElement).value = input1;
                document.getElementById("input001").innerHTML = "<text class=button002>" + "✔" + "</text>";
            } else {
                (document.getElementById("input001") as HTMLInputElement).value = input1;
                document.getElementById("input001").innerHTML = "<text class=button002>" + "✖" + "</text>";
            }

            if (input2 == "Test2" || input2 == "test2") {
                answer2 = 1;
                (document.getElementById("input002") as HTMLInputElement).value = input2;
                document.getElementById("input002").innerHTML = "<text class=button002>" + "✔" + "</text>";
            } else {
                (document.getElementById("input002") as HTMLInputElement).value = input2;
                document.getElementById("input002").innerHTML = "<text class=button002>" + "✖" + "</text>";
            }

            if (input3 == "Test3" || input3 == "test3") {
                answer3 = 1;
                (document.getElementById("input003") as HTMLInputElement).value = input3;
                document.getElementById("input003").innerHTML = "<text class=button002>" + "✔" + "</text>";
            } else {
                (document.getElementById("input003") as HTMLInputElement).value = input3;
                document.getElementById("input003").innerHTML = "<text class=button002>" + "✖" + "</text>";
            }

            if (input4 == "Test4" || input4 == "test4") {
                answer4 = 1;
                (document.getElementById("input004") as HTMLInputElement).value = input4;
                document.getElementById("input004").innerHTML = "<text class=button002>" + "✔" + "</text>";
            } else {
                (document.getElementById("input004") as HTMLInputElement).value = input4;
                document.getElementById("input004").innerHTML = "<text class=button002>" + "✖" + "</text>";
            }

            if (input5 == "Test5" || input5 == "test5") {
                answer5 = 1;
                (document.getElementById("input005") as HTMLInputElement).value = input5;
                document.getElementById("input005").innerHTML = "<text class=button002>" + "✔" + "</text>";
            } else {
                (document.getElementById("input005") as HTMLInputElement).value = input5;
                document.getElementById("input005").innerHTML = "<text class=button002>" + "✖" + "</text>";
            }

            if (answer1 == 1 && answer2 == 1 && answer3 == 1 && answer4 == 1 && answer5 == 1) {
                document.getElementById("message001").innerHTML = "Quest complete!";
                document.getElementById("disappear001").innerHTML = ""; //Belohnung vergeben und Rätselobjekt löschen
                riddleHandler.removeAllChildren();
                document.getElementById("riddles").removeChild(this.textRiddleFrame);

            } else {
                document.getElementById("message001").innerHTML = "Wrong answers!";
            }
        }
    }
}