namespace RoboGameNamespace {
    import ƒ = FudgeCore;
    
    window.addEventListener("load", init);
    let gameNode: ƒ.Node = new ƒ.Node("Game");
    let viewportNode: ƒ.Node = new ƒ.Node("Viewport");
    let roboGameNode: ƒ.Node = new ƒ.Node("RoboGame");
    let viewport: ƒ.Viewport = new ƒ.Viewport();
    let player: Player;
    let harvestModuleIndex: number;
    let questHandler: QuestHandler;
    export let movementSpeed: number = 10;
    export let robots: ƒ.Node = new ƒ.Node("Robots");
    export let worldTilesNode: ƒ.Node = new ƒ.Node("Worldmap");
    export let mapHelperArray: WorldMapTile[][] = [];
    export let riddleUI: ƒ.Node = new ƒ.Node("Riddle UI");
    export let riddleHandler: ƒ.Node = new ƒ.Node("Riddle Handler");
    export let level: number;
    export let currentQuestStage: QUESTSTAGE = QUESTSTAGE.TUTORIAL; //bei gespeicherten spielen auf aktuellen gamestate ändern (localstorage)

    gameNode.appendChild(viewportNode);

    function init(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        player = Player.getInstance();
        roboGameNode.addChild(robots);
        roboGameNode.addChild(worldTilesNode);
        viewportNode.addChild(player);
        viewportNode.addChild(roboGameNode);
        
        roboGameNode.activate(false);
        questHandler = new QuestHandler();
        createRobot();

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
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
            document.getElementById("questMenu").style.display = "none";
            document.getElementById("robotCustomizer").style.display = "none";
            document.getElementById("ressourceBar").style.display = "none";
            roboGameNode.activate(false);
        });

        document.getElementById("loadGame").addEventListener("click", () => {
            loadGame();
        });

        document.getElementById("startRiddle").addEventListener("click", () => {
            let newRiddle: OpenRiddle = new OpenRiddle();
            console.log(newRiddle);
        });

        document.getElementById("saveWorld").addEventListener("click", () => {
            saveNoisemap();
            //create image from noisemap and show
        });
        document.getElementById("createRobot").addEventListener("click", () => {
            createRobot();
            chooseHarvestModule(harvestModuleIndex);
            openRobotCustomization();
        });

        document.getElementById("worldCreation").style.display = "none";
        document.getElementById("questMenu").style.display = "none";
        document.getElementById("robotCustomizer").style.display = "none";
        document.getElementById("ressourceBar").style.display = "none";
        

        viewport.draw();

    }

    function hndKey(): void {
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
            console.log(<Robot>robots.getChild(robots.getChildren().length - 1));
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.C])) {
            robots.activate(true);
            worldTilesNode.activate(true);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.X])) {
            robots.activate(false);
            worldTilesNode.activate(false);
        }

    }

    function newGame(): void {
        document.getElementById("worldCreation").style.display = "inline";
        document.getElementById("mainMenu").style.display = "none";
        level = 1;
        document.getElementById("createWorldButton").addEventListener("click", () => {
            startGameLoop();
        });

    }
    function loadGame(): void {


        startGameLoop();
        console.log("loaded");
    }

    function startGameLoop(): void {
        createWorld();
        roboGameNode.activate(true);
        document.getElementById("mainMenu").style.display = "none";
        document.getElementById("questMenu").style.display = "inline";
        document.getElementById("robotCustomizer").style.display = "inline";
        document.getElementById("ressourceBar").style.display = "inline";
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    }

    function update(_event: Event): void {
        hndKey();
        movementTimer++;
        harvestTimer++;

        if (harvestTimer == 60) {
            harvestTimer = 0;

            for (let robotEntity of robots.getChildren() as Robot[]) {
                if (!robotEntity.isAlive) {
                    removeRobot(robotEntity);
                }
                if (robotEntity.isInteracting) {
                    robotEntity.collectRessource(mapHelperArray[robotEntity.mtxLocal.translation.x][robotEntity.mtxLocal.translation.y]);
                }
            }
        }
        if (movementTimer == 120) {
            movementTimer = 0;
            for (let robotEntity of robots.getChildren() as Robot[]) {
                if (!robotEntity.isInteracting) {
                    robotEntity.moveToNewField();

                    let minX: number = robotEntity.mtxLocal.translation.x - robotEntity.fieldOfView;
                    if (minX < 0) {
                        minX = 0;
                    }
                    let maxX: number = robotEntity.mtxLocal.translation.x + robotEntity.fieldOfView;
                    if (maxX > worldSize) {
                        maxX = worldSize;
                    }
                    let minY: number = robotEntity.mtxLocal.translation.y - robotEntity.fieldOfView;
                    if (minY < 0) {
                        minY = 0;
                    }
                    let maxY: number = robotEntity.mtxLocal.translation.y + robotEntity.fieldOfView;
                    if (maxY > worldSize) {
                        maxY = worldSize;
                    }

                    for (let x: number = minX; x <= maxX; x++) {
                        for (let y: number = minY; y <= maxY; y++) {
                            let tile: WorldMapTile = mapHelperArray[x][y];
                            tile.activate(true);
                            if (tile.mtxLocal.translation.x == robotEntity.mtxLocal.translation.x && tile.mtxLocal.translation.y == robotEntity.mtxLocal.translation.y) {
                                robotEntity.interactWithField(tile);
                            }
                        }
                    }
                }
            }
        }
        bioMassToHTML(ressourceBioMass);
        scrapToHTML(ressourceScrap);
        oilToHTML(ressourceOil);
        metalToHTML(ressourceOre);
        viewport.draw();
    }

    function openRobotCustomization(): void {
        let customizationUI: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        customizationUI.className = "Customizer";
        document.getElementById("CustomizeWindow").appendChild(customizationUI);

        //Declare harvesting module
        let buttonLeftHarvesting: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        customizationUI.appendChild(buttonLeftHarvesting);
        buttonLeftHarvesting.addEventListener("click", () => {
            harvestModuleIndex -= 1;
            chooseHarvestModule(harvestModuleIndex);
        });
        buttonLeftHarvesting.className = "buttonLeftHarvesting";

        let buttonRightHarvesting: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        customizationUI.appendChild(buttonRightHarvesting);
        buttonRightHarvesting.addEventListener("click", () => {
            harvestModuleIndex += 1;
            chooseHarvestModule(harvestModuleIndex);
        });
        buttonRightHarvesting.className = "buttonRightHarvesting";


        //Declare fightmode
        let buttonFighting: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        customizationUI.appendChild(buttonFighting);
        buttonFighting.addEventListener("click", () => {
            setFightMode(<Robot>robots.getChild(robots.getChildren().length - 1), "fight");
        });
        buttonFighting.className = "buttonFighting";

        let buttonRetreat: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        customizationUI.appendChild(buttonRetreat);
        buttonRetreat.addEventListener("click", () => {
            setFightMode(<Robot>robots.getChild(robots.getChildren().length - 1), "retreat");
        });
        buttonRetreat.className = "buttonRetreat";


        //Declare hovering
        let buttonHovering: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        customizationUI.appendChild(buttonHovering);
        buttonHovering.addEventListener("click", () => {
            setHoverMode(<Robot>robots.getChild(robots.getChildren().length - 1));
        });
        buttonHovering.className = "buttonHovering";



        //Spawn Robot into world
        let spawnNewRobot: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        customizationUI.appendChild(spawnNewRobot);
        spawnNewRobot.addEventListener("click", () => {
            spawnRobot(<Robot>robots.getChild(robots.getChildren().length - 1));
            document.getElementById("CustomizeWindow").removeChild(customizationUI);
        });
        spawnNewRobot.className = "spawnNewRobot";
    }

    function chooseHarvestModule(index: number): void {
        switch (index) {
            case 1: {
                setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "lumberer");
                break;
            }
            case 2: {
                setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "miner");
                break;
            }
            case 3: {
                setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "oiler");
                break;
            }
            case 4: {
                setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "scrapper");
                break;
            }
            case 5: {
                setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "none");
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

}



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