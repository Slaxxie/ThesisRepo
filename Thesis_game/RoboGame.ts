namespace RoboGame {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);

    let gameNode: ƒ.Node = new ƒ.Node("Game");
    let viewportNode: ƒ.Node = new ƒ.Node("Viewport");
    let viewport: ƒ.Viewport = new ƒ.Viewport();
    export let movementSpeed: number = 10;
    export let robots: ƒ.Node = new ƒ.Node("Robots");
    export let worldTilesNode: ƒ.Node = new ƒ.Node("Worldmap");
    let player: Player;

    export let mapHelperArray: WorldMapTile[][] = [];



    gameNode.appendChild(viewportNode);

    function init(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        player = Player.getInstance();
        //createWorld();
        viewportNode.addChild(objects);
        viewportNode.addChild(robots);
        viewportNode.addChild(worldTilesNode);
        viewportNode.addChild(player);

        robots.addChild(new Robot("Robot #" + robots.getChildren.length, new ƒ.Vector2(16, 10)));
        robots.addChild(new Robot("Robot #" + robots.getChildren.length, new ƒ.Vector2(10, 16)));

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(30);
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


        viewport.draw();


        /* for (let mapTile of worldTilesNode.getChildren() as WorldMapTile[]) {
            console.log(mapTile.mtxLocal.translation.y);
        } */


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

    }

    function update(_event: Event): void {
        hndKey();
        movementTimer++;
        if (movementTimer == 120) {
            movementTimer = 0;

            // Hier alle map tiles deaktivieren

            for (let robotEntity of robots.getChildren() as Robot[]) {
                if (!robotAlive) {
                    robots.removeChild(robotEntity);
                }

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