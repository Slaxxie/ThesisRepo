"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    class Riddles extends ƒ.Node {
        constructor(_difficulty, _type) {
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
        textRiddle(difficulty) {
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
        labyrinthRiddle(difficulty) {
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
        codeRiddle(difficulty) {
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
    RoboGameNamespace.Riddles = Riddles;
    let g;
    let h;
    let i;
    let j;
    let k;
    function submit001() {
        let b = document.getElementById("input001").value;
        let c = document.getElementById("input002").value;
        let d = document.getElementById("input003").value;
        let e = document.getElementById("input004").value;
        let f = document.getElementById("input005").value;
        if (b == "Test1" || b == "test1") {
            g = 1;
            document.getElementById("input001").value = b;
            document.getElementById("input001").innerHTML = "<text class=button002>" + "✔" + "</text>";
        }
        else {
            document.getElementById("input001").value = b;
            document.getElementById("input001").innerHTML = "<text class=button002>" + "✖" + "</text>";
        }
        if (c == "Test2" || c == "test2") {
            h = 1;
            document.getElementById("input002").value = c;
            document.getElementById("input002").innerHTML = "<text class=button002>" + "✔" + "</text>";
        }
        else {
            document.getElementById("input002").value = c;
            document.getElementById("input002").innerHTML = "<text class=button002>" + "✖" + "</text>";
        }
        if (d == "Test3" || d == "test3") {
            i = 1;
            document.getElementById("input003").value = d;
            document.getElementById("input003").innerHTML = "<text class=button002>" + "✔" + "</text>";
        }
        else {
            document.getElementById("input003").value = d;
            document.getElementById("input003").innerHTML = "<text class=button002>" + "✖" + "</text>";
        }
        if (e == "Test4" || e == "test4") {
            j = 1;
            document.getElementById("input004").value = e;
            document.getElementById("input004").innerHTML = "<text class=button002>" + "✔" + "</text>";
        }
        else {
            document.getElementById("input004").value = e;
            document.getElementById("input004").innerHTML = "<text class=button002>" + "✖" + "</text>";
        }
        if (f == "Test5" || f == "test5") {
            k = 1;
            document.getElementById("input005").value = f;
            document.getElementById("input005").innerHTML = "<text class=button002>" + "✔" + "</text>";
        }
        else {
            document.getElementById("input005").value = f;
            document.getElementById("input005").innerHTML = "<text class=button002>" + "✖" + "</text>";
        }
        if (g == 1 && h == 1 && i == 1 && j == 1 && k == 1) {
            document.getElementById("message001").innerHTML = "Quest complete!";
            document.getElementById("disappear001").innerHTML = "";
        }
    }
    RoboGameNamespace.submit001 = submit001;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=Riddles.js.map