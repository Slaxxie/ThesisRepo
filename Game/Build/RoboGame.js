"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let gameNode = new ƒ.Node("Game");
    let viewportNode = new ƒ.Node("Viewport");
    let roboGameNode = new ƒ.Node("RoboGame");
    let viewport = new ƒ.Viewport();
    let player;
    let harvestModuleIndex;
    let questHandler;
    let newRiddle;
    RoboGameNamespace.movementSpeed = 10;
    RoboGameNamespace.robots = new ƒ.Node("Robots");
    RoboGameNamespace.worldTilesNode = new ƒ.Node("Worldmap");
    RoboGameNamespace.mapHelperArray = [];
    RoboGameNamespace.riddleUI = new ƒ.Node("Riddle UI");
    RoboGameNamespace.riddleHandler = new ƒ.Node("Riddle Handler");
    RoboGameNamespace.currentQuestStage = RoboGameNamespace.QUESTSTAGE.TUTORIAL; //bei gespeicherten spielen auf aktuellen gamestate ändern (localstorage)
    gameNode.appendChild(viewportNode);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        player = RoboGameNamespace.Player.getInstance();
        roboGameNode.addChild(RoboGameNamespace.robots);
        roboGameNode.addChild(RoboGameNamespace.worldTilesNode);
        viewportNode.addChild(player);
        viewportNode.addChild(roboGameNode);
        roboGameNode.activate(false);
        questHandler = new RoboGameNamespace.QuestHandler;
        RoboGameNamespace.storyHandler = new RoboGameNamespace.StoryHandler;
        RoboGameNamespace.createRobot();
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(50);
        cmpCamera.mtxPivot.translateY(9);
        cmpCamera.mtxPivot.translateX(16);
        cmpCamera.mtxPivot.rotateY(180);
        player.addComponent(cmpCamera);
        console.log(questHandler);
        viewport.initialize("Viewport", viewportNode, cmpCamera, canvas);
        console.log(gameNode);
        document.getElementById("newGame").addEventListener("click", () => {
            newGame();
        });
        document.getElementById("toMainMenu").addEventListener("click", () => {
            document.getElementById("mainMenu").style.display = "inline";
            document.getElementById("robotCustomizer").style.display = "none";
            document.getElementById("robotMap").style.display = "none";
            document.getElementById("ressourceBar").style.display = "none";
            document.getElementById("QuestMenu").style.display = "none";
            document.getElementById("ingameMenu").style.display = "none";
            document.getElementById("RiddleMenu").style.display = "none";
            document.getElementById("textRiddleFrame").remove();
            //document.getElementById("RiddleMenu").removeChild(document.getElementById("RiddleUI"));
            document.getElementById("RiddleUI").remove();
            newRiddle = null;
            roboGameNode.activate(false);
        });
        document.getElementById("loadGame").addEventListener("click", () => {
            loadGame();
        });
        document.getElementById("showQuest").addEventListener("click", () => {
            document.getElementById("QuestMenu").style.display = "inline";
        });
        document.getElementById("startRiddle").addEventListener("click", () => {
            document.getElementById("RiddleMenu").style.display = "inline";
            newRiddle = new RoboGameNamespace.OpenRiddle();
            console.log(newRiddle);
        });
        document.getElementById("showRobotMap").addEventListener("click", () => {
            roboGameNode.activate(true);
            document.getElementById("Sidebar").style.display = "inline";
            document.getElementById("robotMapMenu").style.display = "inline";
            document.getElementById("ingameMenu").style.display = "none";
            document.getElementById("robotCustomizer").style.display = "none";
            document.getElementById("robotMap").style.display = "none";
            document.getElementById("ressourceBar").style.display = "none";
        });
        document.getElementById("closeRobotMap").addEventListener("click", () => {
            roboGameNode.activate(false);
            document.getElementById("Sidebar").style.display = "none";
            document.getElementById("robotMapMenu").style.display = "none";
            document.getElementById("ingameMenu").style.display = "inline";
            document.getElementById("robotCustomizer").style.display = "inline";
            document.getElementById("robotMap").style.display = "inline";
            document.getElementById("ressourceBar").style.display = "inline";
        });
        document.getElementById("saveWorld").addEventListener("click", () => {
            RoboGameNamespace.saveNoisemap();
            //create image from noisemap and show
        });
        document.getElementById("createRobot").addEventListener("click", () => {
            RoboGameNamespace.createRobot();
            chooseHarvestModule(harvestModuleIndex);
            openRobotCustomization();
        });
        document.getElementById("worldCreation").style.display = "none";
        document.getElementById("ingameMenu").style.display = "none";
        document.getElementById("robotCustomizer").style.display = "none";
        document.getElementById("robotMap").style.display = "none";
        document.getElementById("ressourceBar").style.display = "none";
        document.getElementById("Sidebar").style.display = "none";
        document.getElementById("robotMapMenu").style.display = "none";
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
    }
    function newGame() {
        document.getElementById("worldCreation").style.display = "inline";
        document.getElementById("mainMenu").style.display = "none";
        RoboGameNamespace.level = 1;
        document.getElementById("createWorldButton").addEventListener("click", () => {
            startGameLoop();
            document.getElementById("worldCreation").style.display = "none";
            RoboGameNamespace.storyHandler.playStoryPrologue();
        });
    }
    function loadGame() {
        startGameLoop();
        console.log("loaded");
    }
    function startGameLoop() {
        RoboGameNamespace.createWorld();
        document.getElementById("mainMenu").style.display = "none";
        document.getElementById("ingameMenu").style.display = "inline";
        document.getElementById("ressourceBar").style.display = "inline";
        document.getElementById("robotCustomizer").style.display = "inline";
        document.getElementById("robotMap").style.display = "inline";
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
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
        customizationUI.id = "Customizer";
        document.getElementById("CustomizeWindow").appendChild(customizationUI);
        //Declare harvesting module
        let buttonLeftHarvesting = document.createElement("button");
        customizationUI.appendChild(buttonLeftHarvesting);
        buttonLeftHarvesting.addEventListener("click", () => {
            harvestModuleIndex -= 1;
            chooseHarvestModule(harvestModuleIndex);
        });
        buttonLeftHarvesting.id = "buttonLeftHarvesting";
        let buttonRightHarvesting = document.createElement("button");
        customizationUI.appendChild(buttonRightHarvesting);
        buttonRightHarvesting.addEventListener("click", () => {
            harvestModuleIndex += 1;
            chooseHarvestModule(harvestModuleIndex);
        });
        buttonRightHarvesting.id = "buttonRightHarvesting";
        //Declare fightmode
        let buttonFighting = document.createElement("button");
        customizationUI.appendChild(buttonFighting);
        buttonFighting.addEventListener("click", () => {
            RoboGameNamespace.setFightMode(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "fight");
        });
        buttonFighting.id = "buttonFighting";
        let buttonRetreat = document.createElement("button");
        customizationUI.appendChild(buttonRetreat);
        buttonRetreat.addEventListener("click", () => {
            RoboGameNamespace.setFightMode(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1), "retreat");
        });
        buttonRetreat.id = "buttonRetreat";
        //Declare hovering
        let buttonHovering = document.createElement("button");
        customizationUI.appendChild(buttonHovering);
        buttonHovering.addEventListener("click", () => {
            RoboGameNamespace.setHoverMode(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
        });
        buttonHovering.id = "buttonHovering";
        //Spawn Robot into world
        let spawnNewRobot = document.createElement("button");
        customizationUI.appendChild(spawnNewRobot);
        spawnNewRobot.addEventListener("click", () => {
            RoboGameNamespace.spawnRobot(RoboGameNamespace.robots.getChild(RoboGameNamespace.robots.getChildren().length - 1));
            document.getElementById("CustomizeWindow").removeChild(customizationUI);
        });
        spawnNewRobot.id = "spawnNewRobot";
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
    /* export function allowDrop(ev: DragEvent): void {
        console.log("test allow");
        ev.preventDefault();
    }

    export function drag(ev: DragEvent): void {
        console.log("test drag");
        console.log(ev.target);
        ev.dataTransfer.setData("text", (<HTMLImageElement>ev.target).id);
    }

    export function drop(ev: DragEvent): void {
        console.log("test drop");
        ev.preventDefault();
        let data: string = ev.dataTransfer.getData("text");
        (<HTMLDivElement>ev.target).appendChild(document.getElementById(data));
    } */
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