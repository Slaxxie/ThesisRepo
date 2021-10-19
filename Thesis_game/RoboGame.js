"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let gameNode = new ƒ.Node("Game");
    let viewportNode = new ƒ.Node("Viewport");
    let viewport = new ƒ.Viewport();
    RoboGame.movementSpeed = 10;
    gameNode.appendChild(viewportNode);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        spawnWorld();
        viewportNode.addChild(RoboGame.objects);
        viewportNode.addChild(RoboGame.robots);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(31);
        cmpCamera.mtxPivot.translateY(10);
        cmpCamera.mtxPivot.rotateY(180);
        viewport.initialize("Viewport", viewportNode, cmpCamera, canvas);
        console.log(gameNode);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        RoboGame.movementTimer++;
        if (RoboGame.movementTimer == 300) {
            RoboGame.movementTimer = 0;
            for (let robotEntity of RoboGame.robots.getChildren()) {
                robotEntity.moveToNewField(); //move every robot to new field
                if (!RoboGame.robotAlive) {
                    RoboGame.robots.removeChild(robotEntity);
                }
            }
        }
        viewport.draw();
    }
    function spawnWorld() {
        let posObject = new ƒ.Vector2();
        let terminal = new RoboGame.Object("Terminal", posObject);
        posObject.x = 10;
        posObject.y = 22;
        RoboGame.objects.addChild(terminal);
        console.log(viewportNode);
    }
    RoboGame.spawnWorld = spawnWorld;
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