"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let gameNode = new ƒ.Node("Game");
    let viewportNode = new ƒ.Node("Viewport");
    let viewport = new ƒ.Viewport();
    let player;
    let harvestModuleIndex;
    RoboGame.movementSpeed = 10;
    RoboGame.robots = new ƒ.Node("Robots");
    RoboGame.worldTilesNode = new ƒ.Node("Worldmap");
    RoboGame.mapHelperArray = [];
    gameNode.appendChild(viewportNode);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        player = RoboGame.Player.getInstance();
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
        document.getElementById("modHover").addEventListener("click", () => {
            RoboGame.setHoverMode(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1));
        });
        document.getElementById("modFighter").addEventListener("click", () => {
            RoboGame.setFightMode(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "fight");
        });
        document.getElementById("modRetreat").addEventListener("click", () => {
            RoboGame.setFightMode(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "retreat");
        });
        document.getElementById("createRobot").addEventListener("click", () => {
            RoboGame.createRobot();
            chooseHarvestModule(harvestModuleIndex);
            openRobotCustomization();
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
            console.log(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1));
        }
    }
    function update(_event) {
        hndKey();
        RoboGame.movementTimer++;
        RoboGame.harvestTimer++;
        if (RoboGame.harvestTimer == 60) {
            RoboGame.harvestTimer = 0;
            for (let robotEntity of RoboGame.robots.getChildren()) {
                if (!robotEntity.isAlive) {
                    RoboGame.removeRobot(robotEntity);
                }
                if (robotEntity.isInteracting) {
                    robotEntity.collectRessource(RoboGame.mapHelperArray[robotEntity.mtxLocal.translation.x][robotEntity.mtxLocal.translation.y]);
                }
            }
        }
        if (RoboGame.movementTimer == 120) {
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
        RoboGame.bioMassToHTML(RoboGame.ressourceBioMass);
        RoboGame.scrapToHTML(RoboGame.ressourceScrap);
        RoboGame.oilToHTML(RoboGame.ressourceOil);
        RoboGame.metalToHTML(RoboGame.ressourceMetal);
        viewport.draw();
    }
    function openRobotCustomization() {
        let customizationUI = document.createElement("div");
        customizationUI.className = "Customizer";
        document.getElementById("CustomizeWindow").appendChild(customizationUI);
        /*  let modScrapButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
         customizationUI.appendChild(modScrapButton);
         modScrapButton.addEventListener("click", () => {
             setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "scrapper");
         });
         modScrapButton.className = "modScrapButton";
 
         let modLumbererButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
         customizationUI.appendChild(modLumbererButton);
         modLumbererButton.addEventListener("click", () => {
             setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "lumberer");
         });
         modLumbererButton.className = "modLumbererButton";
 
         let modMinerButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
         customizationUI.appendChild(modMinerButton);
         modMinerButton.addEventListener("click", () => {
             setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "miner");
         });
         modMinerButton.className = "modMinerButton";
 
         let modOilerButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
         customizationUI.appendChild(modOilerButton);
         modOilerButton.addEventListener("click", () => {
             setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "oiler");
         });
         modOilerButton.className = "modOilerButton"; */
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
            RoboGame.setFightMode(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "fight");
        });
        buttonFighting.className = "buttonFighting";
        let buttonRetreat = document.createElement("button");
        customizationUI.appendChild(buttonRetreat);
        buttonRetreat.addEventListener("click", () => {
            RoboGame.setFightMode(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "retreat");
        });
        buttonRetreat.className = "buttonRetreat";
        //Declare hovering
        let buttonHovering = document.createElement("button");
        customizationUI.appendChild(buttonHovering);
        buttonHovering.addEventListener("click", () => {
            RoboGame.setHoverMode(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1));
        });
        buttonHovering.className = "buttonHovering";
        //Spawn Robot into world
        let spawnNewRobot = document.createElement("button");
        customizationUI.appendChild(spawnNewRobot);
        spawnNewRobot.addEventListener("click", () => {
            RoboGame.spawnRobot(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1));
            document.getElementById("CustomizeWindow").removeChild(customizationUI);
        });
        spawnNewRobot.className = "spawnNewRobot";
    }
    function chooseHarvestModule(index) {
        switch (index) {
            case 1: {
                RoboGame.setCollectionModule(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "lumberer");
                break;
            }
            case 2: {
                RoboGame.setCollectionModule(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "miner");
                break;
            }
            case 3: {
                RoboGame.setCollectionModule(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "oiler");
                break;
            }
            case 4: {
                RoboGame.setCollectionModule(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "scrapper");
                break;
            }
            case 5: {
                RoboGame.setCollectionModule(RoboGame.robots.getChild(RoboGame.robots.getChildren().length - 1), "none");
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