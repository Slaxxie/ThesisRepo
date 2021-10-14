"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let gameNode = new ƒ.Node("Game");
    let viewportNode = new ƒ.Node("Viewport");
    let viewport = new ƒ.Viewport();
    RoboGame.movementSpeed = 15;
    RoboGame.leftBorder = -16.5;
    RoboGame.rightBorder = 16.5;
    RoboGame.topBorder = 19;
    RoboGame.bottomBorder = 1;
    gameNode.appendChild(viewportNode);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        RoboGame.player = RoboGame.Player.getInstance();
        viewportNode.addChild(RoboGame.player);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(31);
        //cmpCamera.mtxPivot.translateY(10);
        cmpCamera.mtxPivot.rotateY(180);
        viewport.initialize("Viewport", viewportNode, cmpCamera, canvas);
        RoboGame.player.addComponent(cmpCamera);
        console.log(gameNode);
        console.log(RoboGame.player);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function hndKey() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]) && RoboGame.Player.getInstance().mtxLocal.translation.x <= RoboGame.rightBorder || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && RoboGame.Player.getInstance().mtxLocal.translation.x <= RoboGame.rightBorder) {
            RoboGame.player.moveRight();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]) && RoboGame.Player.getInstance().mtxLocal.translation.x >= RoboGame.leftBorder || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]) && RoboGame.Player.getInstance().mtxLocal.translation.x >= RoboGame.leftBorder) {
            RoboGame.player.moveLeft();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]) && RoboGame.Player.getInstance().mtxLocal.translation.y <= RoboGame.topBorder || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP]) && RoboGame.Player.getInstance().mtxLocal.translation.y <= RoboGame.topBorder) {
            RoboGame.player.moveUp();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S]) && RoboGame.Player.getInstance().mtxLocal.translation.y >= RoboGame.bottomBorder || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN]) && RoboGame.Player.getInstance().mtxLocal.translation.y >= RoboGame.bottomBorder) {
            RoboGame.player.moveDown();
        }
    }
    function update(_event) {
        hndKey();
        RoboGame.checkCollision();
        viewport.draw();
    }
})(RoboGame || (RoboGame = {}));
/*
Alt+Shift+F = auto-format
Koordinatensystem = Rechtshändig
x = links (-) - rechts (+)
y = unten (-) - oben (+)
z = vorne (-) - honten (+)
F2 = refactor
Strg + D = Mehrere Cursor
Strg + # = ein/auskommentieren
Alt + Shift + A = Block ein/auskommentieren
Alt + Shift + Pfeil oben/unten = Zeile kopieren
Alt + Pfeil oben/unten = Zeile verschieben
*/ 
//# sourceMappingURL=RoboGame.js.map