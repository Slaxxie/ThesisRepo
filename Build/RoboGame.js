"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let gameNode = new ƒ.Node("Game");
    let viewportNode = new ƒ.Node("Viewport");
    let viewport = new ƒ.Viewport();
    let player;
    let harvestModuleIndex;
    RoboGameNamespace.movementSpeed = 10;
    RoboGameNamespace.robots = new ƒ.Node("Robots");
    RoboGameNamespace.worldTilesNode = new ƒ.Node("Worldmap");
    RoboGameNamespace.mapHelperArray = [];
    RoboGameNamespace.riddleHandler = new ƒ.Node("Riddle Handler");
    gameNode.appendChild(viewportNode);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        player = RoboGameNamespace.Player.getInstance();
        viewportNode.addChild(RoboGameNamespace.robots);
        viewportNode.addChild(RoboGameNamespace.worldTilesNode);
        viewportNode.addChild(player);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(50);
        cmpCamera.mtxPivot.translateY(9);
        cmpCamera.mtxPivot.translateX(16);
        cmpCamera.mtxPivot.rotateY(180);
        player.addComponent(cmpCamera);
        viewport.initialize("Viewport", viewportNode, cmpCamera, canvas);
        console.log(gameNode);
        document.getElementById("newGame").addEventListener("click", () => {
            newGame();
        });
        document.getElementById("loadGame").addEventListener("click", () => {
            loadGame();
        });
        document.getElementById("createWorld").addEventListener("click", () => {
            RoboGameNamespace.createWorld();
            console.log(RoboGameNamespace.mapHelperArray);
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        });
        document.getElementById("saveWorld").addEventListener("click", () => {
            RoboGameNamespace.saveNoisemap();
        });
        document.getElementById("modHover").addEventListener("click", () => {
            RoboGameNamespace.setHoverMode(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
        });
        document.getElementById("modFighter").addEventListener("click", () => {
            RoboGameNamespace.setFightMode(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "fight");
        });
        document.getElementById("modRetreat").addEventListener("click", () => {
            RoboGameNamespace.setFightMode(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "retreat");
        });
        document.getElementById("createRobot").addEventListener("click", () => {
            RoboGameNamespace.createRobot();
            chooseHarvestModule(harvestModuleIndex);
            openRobotCustomization();
        });
        document.getElementById("drag1").addEventListener("dragstart", drag);
        document.getElementById("drag2").addEventListener("dragstart", drag);
        document.getElementById("div1").addEventListener("drop", drop);
        document.getElementById("div1").addEventListener("dragover", allowDrop);
        document.getElementById("disappear001").addEventListener("click", () => {
            RoboGameNamespace.submit001();
        });
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
            console.log(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.C])) {
            RoboGameNamespace.robots.activate(true);
            RoboGameNamespace.worldTilesNode.activate(true);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.X])) {
            RoboGameNamespace.robots.activate(false);
            RoboGameNamespace.worldTilesNode.activate(false);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.V])) {
            let riddle = new RoboGameNamespace.Riddles("easy", "text");
            RoboGameNamespace.riddleHandler.addChild(riddle);
        }
    }
    function newGame() {
        RoboGameNamespace.level = 1;
    }
    function loadGame() {
        console.log("loaded");
    }
    function update(_event) {
        hndKey();
        RoboGameNamespace.movementTimer++;
        RoboGameNamespace.harvestTimer++;
        if (RoboGameNamespace.harvestTimer == 60) {
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
        if (RoboGameNamespace.movementTimer == 120) {
            RoboGameNamespace.movementTimer = 0;
            for (let robotEntity of RoboGameNamespace.robots.getChildren()) {
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
                    for (let x = minX; x <= maxX; x++) {
                        for (let y = minY; y <= maxY; y++) {
                            let tile = RoboGameNamespace.mapHelperArray[x][y];
                            tile.activate(true);
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
        RoboGameNamespace.metalToHTML(RoboGameNamespace.ressourceOre);
        viewport.draw();
    }
    function openRobotCustomization() {
        let customizationUI = document.createElement("div");
        customizationUI.className = "Customizer";
        document.getElementById("CustomizeWindow").appendChild(customizationUI);
        //Declare harvesting module
        let buttonLeftHarvesting = document.createElement("button");
        customizationUI.appendChild(buttonLeftHarvesting);
        buttonLeftHarvesting.addEventListener("click", () => {
            harvestModuleIndex -= 1;
            chooseHarvestModule(harvestModuleIndex);
        });
        buttonLeftHarvesting.className = "buttonLeftHarvesting";
        let buttonRightHarvesting = document.createElement("button");
        customizationUI.appendChild(buttonRightHarvesting);
        buttonRightHarvesting.addEventListener("click", () => {
            harvestModuleIndex += 1;
            chooseHarvestModule(harvestModuleIndex);
        });
        buttonRightHarvesting.className = "buttonRightHarvesting";
        //Declare fightmode
        let buttonFighting = document.createElement("button");
        customizationUI.appendChild(buttonFighting);
        buttonFighting.addEventListener("click", () => {
            RoboGameNamespace.setFightMode(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "fight");
        });
        buttonFighting.className = "buttonFighting";
        let buttonRetreat = document.createElement("button");
        customizationUI.appendChild(buttonRetreat);
        buttonRetreat.addEventListener("click", () => {
            RoboGameNamespace.setFightMode(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "retreat");
        });
        buttonRetreat.className = "buttonRetreat";
        //Declare hovering
        let buttonHovering = document.createElement("button");
        customizationUI.appendChild(buttonHovering);
        buttonHovering.addEventListener("click", () => {
            RoboGameNamespace.setHoverMode(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
        });
        buttonHovering.className = "buttonHovering";
        //Spawn Robot into world
        let spawnNewRobot = document.createElement("button");
        customizationUI.appendChild(spawnNewRobot);
        spawnNewRobot.addEventListener("click", () => {
            RoboGameNamespace.spawnRobot(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
            document.getElementById("CustomizeWindow").removeChild(customizationUI);
        });
        spawnNewRobot.className = "spawnNewRobot";
    }
    function chooseHarvestModule(index) {
        switch (index) {
            case 1: {
                RoboGameNamespace.setCollectionModule(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "lumberer");
                break;
            }
            case 2: {
                RoboGameNamespace.setCollectionModule(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "miner");
                break;
            }
            case 3: {
                RoboGameNamespace.setCollectionModule(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "oiler");
                break;
            }
            case 4: {
                RoboGameNamespace.setCollectionModule(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "scrapper");
                break;
            }
            case 5: {
                RoboGameNamespace.setCollectionModule(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "none");
                break;
            }
            case 6: {
                harvestModuleIndex = 1;
                chooseHarvestModule(harvestModuleIndex);
                break;
            }
            default: {
                harvestModuleIndex = 1;
                break;
            }
        }
    }
    function allowDrop(ev) {
        console.log("test allow");
        ev.preventDefault();
    }
    RoboGameNamespace.allowDrop = allowDrop;
    function drag(ev) {
        console.log("test drag");
        console.log(ev.target);
        ev.dataTransfer.setData("text", ev.target.id);
    }
    RoboGameNamespace.drag = drag;
    function drop(ev) {
        console.log("test drop");
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
    RoboGameNamespace.drop = drop;
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