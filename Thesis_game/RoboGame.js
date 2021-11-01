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
        document.getElementById("modMovement").addEventListener("click", () => {
            RoboGame.saveNoisemap();
        });
        document.getElementById("modHover").addEventListener("click", () => {
            RoboGame.saveNoisemap();
        });
        document.getElementById("modScrap").addEventListener("click", () => {
            RoboGame.setCollectionModule(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "scrapper");
        });
        document.getElementById("modLumberer").addEventListener("click", () => {
            RoboGame.setCollectionModule(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "lumberer");
        });
        document.getElementById("modMiner").addEventListener("click", () => {
            RoboGame.setCollectionModule(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "miner");
        });
        document.getElementById("modOil").addEventListener("click", () => {
            RoboGame.setCollectionModule(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "oiler");
        });
        document.getElementById("modFighter").addEventListener("click", () => {
            RoboGame.setFightMode(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "fight");
        });
        document.getElementById("modRetreat").addEventListener("click", () => {
            RoboGame.setFightMode(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "retreat");
        });
        document.getElementById("modScout").addEventListener("click", () => {
            RoboGame.saveNoisemap();
        });
        document.getElementById("isAuto").addEventListener("click", () => {
            RoboGame.saveNoisemap();
        });
        document.getElementById("createRobot").addEventListener("click", () => {
            RoboGame.createRobot();
        });
        document.getElementById("spawnRobot").addEventListener("click", () => {
            RoboGame.spawnRobot();
        });
        document.getElementById("activateRobot").addEventListener("click", () => {
            RoboGame.activateRobot(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1));
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
        RoboGame.harvestTimer++;
        if (RoboGame.harvestTimer == 2) {
            RoboGame.harvestTimer = 0;
            // Hier alle map tiles deaktivieren
            for (let robotEntity of RoboGame.robots.getChildren()) {
                if (!robotEntity.robotAlive) {
                    RoboGame.robots.removeChild(robotEntity);
                }
                if (robotEntity.isInteracting) {
                    robotEntity.collectRessource(RoboGame.mapHelperArray[robotEntity.mtxLocal.translation.x][robotEntity.mtxLocal.translation.y]);
                    //console.log("i'm harvesting");
                }
                //console.log(mapHelperArray[robotEntity.mtxLocal.translation.x][robotEntity.mtxLocal.translation.y]);
            }
        }
        if (RoboGame.movementTimer == 4) {
            RoboGame.movementTimer = 0;
            for (let robotEntity of RoboGame.robots.getChildren()) {
                if (!robotEntity.isInteracting) {
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