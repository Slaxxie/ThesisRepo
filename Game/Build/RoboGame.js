"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let player;
    let gameNode = new ƒ.Node("Game");
    let viewport = new ƒ.Viewport();
    let viewportNode = new ƒ.Node("Viewport");
    RoboGameNamespace.roboGameNode = new ƒ.Node("RoboGame");
    RoboGameNamespace.robots = new ƒ.Node("Robots");
    RoboGameNamespace.worldTilesNode = new ƒ.Node("Worldmap");
    RoboGameNamespace.mapHelperArray = [];
    RoboGameNamespace.riddleUI = new ƒ.Node("Riddle UI");
    RoboGameNamespace.riddleHandler = new ƒ.Node("Riddle Handler");
    RoboGameNamespace.currentQuestStage = RoboGameNamespace.QUESTSTAGE.TUTORIAL;
    gameNode.appendChild(viewportNode);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        player = RoboGameNamespace.Player.getInstance();
        RoboGameNamespace.roboGameNode.addChild(RoboGameNamespace.robots);
        RoboGameNamespace.roboGameNode.addChild(RoboGameNamespace.worldTilesNode);
        viewportNode.addChild(player);
        viewportNode.addChild(RoboGameNamespace.roboGameNode);
        RoboGameNamespace.roboGameNode.activate(false);
        RoboGameNamespace.questHandler = new RoboGameNamespace.QuestHandler;
        console.log(RoboGameNamespace.questHandler);
        RoboGameNamespace.storyHandler = new RoboGameNamespace.StoryHandler;
        RoboGameNamespace.createRobot();
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(50);
        cmpCamera.mtxPivot.translateY(9);
        cmpCamera.mtxPivot.translateX(16);
        cmpCamera.mtxPivot.rotateY(180);
        player.addComponent(cmpCamera);
        viewport.initialize("Viewport", viewportNode, cmpCamera, canvas);
        console.log(gameNode);
        document.getElementById("worldCreation").style.display = "none";
        document.getElementById("ingameMenu").style.display = "none";
        document.getElementById("robotCustomizer").style.display = "none";
        document.getElementById("robotMap").style.display = "none";
        document.getElementById("ressourceBar").style.display = "none";
        document.getElementById("sidebar").style.display = "none";
        document.getElementById("robotMapMenu").style.display = "none";
        RoboGameNamespace.initializeButtons();
        viewport.draw();
    }
    function hndKey() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
            player.moveCameraRight();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
            player.moveCameraLeft();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
            player.moveCameraTop();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S])) {
            player.moveCameraBottom();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {
            player.moveCameraUp();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
            player.moveCameraDown();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.C])) {
            RoboGameNamespace.robots.activate(true);
            RoboGameNamespace.worldTilesNode.activate(true);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.X])) {
            RoboGameNamespace.robots.activate(false);
            RoboGameNamespace.worldTilesNode.activate(false);
        }
    }
    function update(_event) {
        hndKey();
        RoboGameNamespace.movementTimer++;
        RoboGameNamespace.harvestTimer++;
        if (RoboGameNamespace.harvestTimer == 45) {
            RoboGameNamespace.harvestTimer = 0;
            for (let robotEntity of RoboGameNamespace.robots.getChildren()) {
                if (!robotEntity.isAlive) {
                    RoboGameNamespace.removeRobot(robotEntity);
                }
                if (robotEntity.isInteracting) {
                    robotEntity.collectRessource(RoboGameNamespace.mapHelperArray[robotEntity.mtxLocal.translation.x][robotEntity.mtxLocal.translation.y]);
                }
            }
        }
        if (RoboGameNamespace.movementTimer == 90) {
            RoboGameNamespace.movementTimer = 0;
            for (let robotEntity of RoboGameNamespace.robots.getChildren()) {
                robotEntity.renewStats();
                if (!robotEntity.isInteracting) {
                    robotEntity.moveToNewField();
                    let minX = robotEntity.mtxLocal.translation.x - robotEntity.fieldOfView;
                    if (minX < 0) {
                        minX = 0;
                    }
                    let maxX = robotEntity.mtxLocal.translation.x + robotEntity.fieldOfView;
                    if (maxX > RoboGameNamespace.worldSize) {
                        maxX = RoboGameNamespace.worldSize;
                    }
                    let minY = robotEntity.mtxLocal.translation.y - robotEntity.fieldOfView;
                    if (minY < 0) {
                        minY = 0;
                    }
                    let maxY = robotEntity.mtxLocal.translation.y + robotEntity.fieldOfView;
                    if (maxY > RoboGameNamespace.worldSize) {
                        maxY = RoboGameNamespace.worldSize;
                    }
                    robotEntity.surroundingFields = [];
                    for (let x = minX; x <= maxX; x++) {
                        for (let y = minY; y <= maxY; y++) {
                            let tile = RoboGameNamespace.mapHelperArray[x][y];
                            tile.activate(true);
                            robotEntity.surroundingFields.push(tile);
                            if (tile.mtxLocal.translation.x == robotEntity.mtxLocal.translation.x && tile.mtxLocal.translation.y == robotEntity.mtxLocal.translation.y) {
                                robotEntity.interactWithField(tile);
                            }
                        }
                    }
                }
            }
        }
        RoboGameNamespace.bioMassToHTML(RoboGameNamespace.ressourceBioMass);
        RoboGameNamespace.scrapToHTML(RoboGameNamespace.ressourceScrap);
        RoboGameNamespace.oilToHTML(RoboGameNamespace.ressourceOil);
        RoboGameNamespace.metalToHTML(RoboGameNamespace.ressourceMetal);
        viewport.draw();
    }
    function startGameLoop() {
        RoboGameNamespace.createWorld();
        document.getElementById("mainMenu").style.display = "none";
        document.getElementById("ingameMenu").style.display = "block";
        document.getElementById("ressourceBar").style.display = "block";
        document.getElementById("robotCustomizer").style.display = "block";
        document.getElementById("robotMap").style.display = "block";
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
    }
    RoboGameNamespace.startGameLoop = startGameLoop;
})(RoboGameNamespace || (RoboGameNamespace = {}));
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