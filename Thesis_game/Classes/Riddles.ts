namespace RoboGameNamespace {
    import ƒ = FudgeCore;
    export class Riddles extends ƒ.Node {
        constructor(_difficulty: string, _type: string) {
            super("Riddle");
            switch (_type) {
                case "text": {
                    this.textRiddle(_difficulty);
                    break;
                }
                case "labyrinth": {
                    this.labyrinthRiddle(_difficulty);
                    break;
                }
                case "code": {
                    this.codeRiddle(_difficulty);
                    break;
                }
                default: {
                    break;
                }
            }
        }

        textRiddle(difficulty: string): void {
            if (difficulty == "easy") {
                console.log("text");
                console.log("easy");
            }
            if (difficulty == "medium") {
                console.log("text");
                console.log("medium");
            }
            if (difficulty == "hard") {
                console.log("text");
                console.log("hard");
            }
            else {
                console.log("wrong input");
            }
        }

        labyrinthRiddle(difficulty: string): void {
            if (difficulty == "easy") {
                console.log("laby");
                console.log("easy");
            }
            if (difficulty == "medium") {
                console.log("laby");
                console.log("medium");
            }
            if (difficulty == "hard") {
                console.log("laby");
                console.log("hard");
            }
            else {
                console.log("wrong input");
            }
        }

        codeRiddle(difficulty: string): void {
            if (difficulty == "easy") {
                console.log("code");
                console.log("easy");
            }
            if (difficulty == "medium") {
                console.log("code");
                console.log("medium");
            }
            if (difficulty == "hard") {
                console.log("code");
                console.log("hard");
            }
            else {
                console.log("wrong input");
            }
        }
    }
    let g: number;
    let h: number;
    let i: number;
    let j: number;
    let k: number;
    export function submit001(): void {
        let b: string = (document.getElementById("input001") as HTMLInputElement).value;
        let c: string = (document.getElementById("input002") as HTMLInputElement).value;
        let d: string = (document.getElementById("input003") as HTMLInputElement).value;
        let e: string = (document.getElementById("input004") as HTMLInputElement).value;
        let f: string = (document.getElementById("input005") as HTMLInputElement).value;
        if (b == "Test1" || b == "test1") {
            g = 1;
            (document.getElementById("input001") as HTMLInputElement).value = b;
            document.getElementById("input001").innerHTML = "<text class=button002>" + "✔" + "</text>";
        } else {
            (document.getElementById("input001") as HTMLInputElement).value = b;
            document.getElementById("input001").innerHTML = "<text class=button002>" + "✖" + "</text>";
        }

        if (c == "Test2" || c == "test2") {
            h = 1;
            (document.getElementById("input002") as HTMLInputElement).value = c;
            document.getElementById("input002").innerHTML = "<text class=button002>" + "✔" + "</text>";
        } else {
            (document.getElementById("input002") as HTMLInputElement).value = c;
            document.getElementById("input002").innerHTML = "<text class=button002>" + "✖" + "</text>";
        }

        if (d == "Test3" || d == "test3") {
            i = 1;
            (document.getElementById("input003") as HTMLInputElement).value = d;
            document.getElementById("input003").innerHTML = "<text class=button002>" + "✔" + "</text>";
        } else {
            (document.getElementById("input003") as HTMLInputElement).value = d;
            document.getElementById("input003").innerHTML = "<text class=button002>" + "✖" + "</text>";
        }

        if (e == "Test4" || e == "test4") {
            j = 1;
            (document.getElementById("input004") as HTMLInputElement).value = e;
            document.getElementById("input004").innerHTML = "<text class=button002>" + "✔" + "</text>";
        } else {
            (document.getElementById("input004") as HTMLInputElement).value = e;
            document.getElementById("input004").innerHTML = "<text class=button002>" + "✖" + "</text>";
        }

        if (f == "Test5" || f == "test5") {
            k = 1;
            (document.getElementById("input005") as HTMLInputElement).value = f;
            document.getElementById("input005").innerHTML = "<text class=button002>" + "✔" + "</text>";
        } else {
            (document.getElementById("input005") as HTMLInputElement).value = f;
            document.getElementById("input005").innerHTML = "<text class=button002>" + "✖" + "</text>";
        }

        if (g == 1 && h == 1 && i == 1 && j == 1 && k == 1) {
            document.getElementById("message001").innerHTML = "Quest complete!";
            document.getElementById("disappear001").innerHTML = "";

        }
    }
}