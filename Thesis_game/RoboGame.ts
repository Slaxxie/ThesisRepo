namespace RoboGame {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);

    let gameNode: ƒ.Node = new ƒ.Node("Game");
    let viewportNode: ƒ.Node = new ƒ.Node("Viewport");
    let viewport: ƒ.Viewport = new ƒ.Viewport();
    let player: Player;
    export let movementSpeed: number = 10;
    export let robots: ƒ.Node = new ƒ.Node("Robots");
    export let worldTilesNode: ƒ.Node = new ƒ.Node("Worldmap");
    export let mapHelperArray: WorldMapTile[][] = [];

    gameNode.appendChild(viewportNode);

    function init(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        player = Player.getInstance();
        viewportNode.addChild(objects);
        viewportNode.addChild(robots);
        viewportNode.addChild(worldTilesNode);
        viewportNode.addChild(player);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(50);
        cmpCamera.mtxPivot.translateY(9);
        cmpCamera.mtxPivot.translateX(16);
        cmpCamera.mtxPivot.rotateY(180);

        player.addComponent(cmpCamera);

        viewport.initialize("Viewport", viewportNode, cmpCamera, canvas);
        console.log(gameNode);

        document.getElementById("createWorld").addEventListener("click", () => {
            createWorld();
            console.log(mapHelperArray);
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        });
        document.getElementById("saveWorld").addEventListener("click", () => {
            saveNoisemap();
        });
        document.getElementById("modHover").addEventListener("click", () => {
            setHoverMode(<Robot>robots.getChild(robots.getChildren().length - 1));
        });
        document.getElementById("modScrap").addEventListener("click", () => {
            setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "scrapper");
        });
        document.getElementById("modLumberer").addEventListener("click", () => {
            setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "lumberer");
        });
        document.getElementById("modMiner").addEventListener("click", () => {
            setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "miner");
        });
        document.getElementById("modOil").addEventListener("click", () => {
            setCollectionModule(<Robot>robots.getChild(robots.getChildren().length - 1), "oiler");
        });
        document.getElementById("modFighter").addEventListener("click", () => {
            setFightMode(<Robot>robots.getChild(robots.getChildren().length - 1), "fight");
        });
        document.getElementById("modRetreat").addEventListener("click", () => {
            setFightMode(<Robot>robots.getChild(robots.getChildren().length - 1), "retreat");
        });
        document.getElementById("isAuto").addEventListener("click", () => {
            setAutoMode(<Robot>robots.getChild(robots.getChildren().length - 1));
        });
        document.getElementById("createRobot").addEventListener("click", () => {
            createRobot();
        });
        document.getElementById("spawnRobot").addEventListener("click", () => {
            spawnRobot();
        });
        document.getElementById("activateRobot").addEventListener("click", () => {
            activateRobot(<Robot>robots.getChild(robots.getChildren().length - 1));
        });
        viewport.draw();
    }

    function hndKey(): void {
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

    function update(_event: Event): void {
        hndKey();
        movementTimer++;
        harvestTimer++;

        if (harvestTimer == 2) {
            harvestTimer = 0;

            // Hier alle map tiles deaktivieren

            for (let robotEntity of robots.getChildren() as Robot[]) {
                if (!robotEntity.robotAlive) {
                    robots.removeChild(robotEntity);
                }
                if (robotEntity.isInteracting) {
                    robotEntity.collectRessource(mapHelperArray[robotEntity.mtxLocal.translation.x][robotEntity.mtxLocal.translation.y]);

                    //console.log("i'm harvesting");
                }
                //console.log(mapHelperArray[robotEntity.mtxLocal.translation.x][robotEntity.mtxLocal.translation.y]);
            }
        }
        if (movementTimer == 4) {
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
        viewport.draw();
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