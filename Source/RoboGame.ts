namespace RoboGameNamespace {
    import ƒ = FudgeCore;

    window.addEventListener("load", init);
    let player: Player;
    let questHandler: QuestHandler;
    let gameNode: ƒ.Node = new ƒ.Node("Game");
    let viewport: ƒ.Viewport = new ƒ.Viewport();
    let viewportNode: ƒ.Node = new ƒ.Node("Viewport");
    export let newRiddle: OpenRiddle;
    export let roboGameNode: ƒ.Node = new ƒ.Node("RoboGame");
    export let harvestModuleIndex: number;
    export let storyHandler: StoryHandler;
    export let movementSpeed: number = 10;
    export let robots: ƒ.Node = new ƒ.Node("Robots");
    export let worldTilesNode: ƒ.Node = new ƒ.Node("Worldmap");
    export let mapHelperArray: WorldMapTile[][] = [];
    export let riddleUI: ƒ.Node = new ƒ.Node("Riddle UI");
    export let riddleHandler: ƒ.Node = new ƒ.Node("Riddle Handler");
    export let level: number;
    export let currentQuestStage: QUESTSTAGE = QUESTSTAGE.TUTORIAL; 

    gameNode.appendChild(viewportNode);

    function init(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        player = Player.getInstance();
        roboGameNode.addChild(robots);
        roboGameNode.addChild(worldTilesNode);
        viewportNode.addChild(player);
        viewportNode.addChild(roboGameNode);

        roboGameNode.activate(false);
        questHandler = new QuestHandler;
        storyHandler = new StoryHandler;
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
        
        
        
        document.getElementById("worldCreation").style.display = "none";
        document.getElementById("ingameMenu").style.display = "none";
        document.getElementById("robotCustomizer").style.display = "none";
        document.getElementById("robotMap").style.display = "none";
        document.getElementById("ressourceBar").style.display = "none";
        document.getElementById("Sidebar").style.display = "none";
        document.getElementById("robotMapMenu").style.display = "none";
        
        initializeButtons();

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

    

    function update(_event: Event): void {
        hndKey();
        movementTimer++;
        harvestTimer++;

        if (harvestTimer == 45) {
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
        if (movementTimer == 90) {
            movementTimer = 0;
            for (let robotEntity of robots.getChildren() as Robot[]) {
                robotEntity.renewStats();
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
    export function startGameLoop(): void {
        createWorld();
        document.getElementById("mainMenu").style.display = "none";
        document.getElementById("ingameMenu").style.display = "block";
        document.getElementById("ressourceBar").style.display = "block";
        document.getElementById("robotCustomizer").style.display = "block";
        document.getElementById("robotMap").style.display = "block";
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
    }
    

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