"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let gameNode = new ƒ.Node("Game");
    let viewportNode = new ƒ.Node("Viewport");
    let viewport = new ƒ.Viewport();
    let player;
    RoboGame.movementSpeed = 10;
    RoboGame.robots = new ƒ.Node("Robots");
    RoboGame.worldTilesNode = new ƒ.Node("Worldmap");
    RoboGame.mapHelperArray = [];
    gameNode.appendChild(viewportNode);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        player = RoboGame.Player.getInstance();
        viewportNode.addChild(RoboGame.objects);
        viewportNode.addChild(RoboGame.robots);
        viewportNode.addChild(RoboGame.worldTilesNode);
        viewportNode.addChild(player);
        for (let i = 0; i < 5; i++) {
            RoboGame.robots.addChild(new RoboGame.Robot("Robot #" + RoboGame.robots.getChildren.length, new ƒ.Vector2(RoboGame.worldSize / 2, RoboGame.worldSize / 2)));
        }
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(50);
        cmpCamera.mtxPivot.translateY(9);
        cmpCamera.mtxPivot.translateX(16);
        cmpCamera.mtxPivot.rotateY(180);
        player.addComponent(cmpCamera);
        viewport.initialize("Viewport", viewportNode, cmpCamera, canvas);
        console.log(gameNode);
        document.getElementById("createWorld").addEventListener("click", () => {
            RoboGame.createWorld();
            console.log(RoboGame.mapHelperArray);
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        });
        document.getElementById("saveWorld").addEventListener("click", () => {
            RoboGame.saveNoisemap();
        });
        viewport.draw();
    }
    function hndKey() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
            player.moveRight();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
            player.moveLeft();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
            player.moveUp();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S])) {
            player.moveDown();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {
            player.moveCameraUp();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
            player.moveCameraDown();
        }
    }
    function update(_event) {
        hndKey();
        RoboGame.movementTimer++;
        if (RoboGame.movementTimer == 2) {
            RoboGame.movementTimer = 0;
            // Hier alle map tiles deaktivieren
            for (let robotEntity of RoboGame.robots.getChildren()) {
                if (!RoboGame.robotAlive) {
                    RoboGame.robots.removeChild(robotEntity);
                }
                robotEntity.moveToNewField();
                let minX = robotEntity.mtxLocal.translation.x - robotEntity.fieldOfView;
                if (minX < 0) {
                    minX = 0;
                }
                let maxX = robotEntity.mtxLocal.translation.x + robotEntity.fieldOfView;
                if (maxX > RoboGame.worldSize) {
                    maxX = RoboGame.worldSize;
                }
                let minY = robotEntity.mtxLocal.translation.y - robotEntity.fieldOfView;
                if (minY < 0) {
                    minY = 0;
                }
                let maxY = robotEntity.mtxLocal.translation.y + robotEntity.fieldOfView;
                if (maxY > RoboGame.worldSize) {
                    maxY = RoboGame.worldSize;
                }
                for (let x = minX; x <= maxX; x++) {
                    for (let y = minY; y <= maxY; y++) {
                        let tile = RoboGame.mapHelperArray[x][y];
                        tile.activate(true);
                        if (tile.mtxLocal.translation.x == robotEntity.mtxLocal.translation.x && tile.mtxLocal.translation.y == robotEntity.mtxLocal.translation.y) {
                            robotEntity.interactWithField(tile);
                        }
                    }
                }
            }
        }
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