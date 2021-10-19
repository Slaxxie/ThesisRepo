namespace RoboGame {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);

    let gameNode: ƒ.Node = new ƒ.Node("Game");
    let viewportNode: ƒ.Node = new ƒ.Node("Viewport");
    let viewport: ƒ.Viewport = new ƒ.Viewport();
    export let movementSpeed: number = 10;
    export let robots: Robot;


    gameNode.appendChild(viewportNode);

    function init(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        spawnWorld();
        viewportNode.addChild(objects);
        viewportNode.addChild(robots);




        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(31);
        cmpCamera.mtxPivot.translateY(10);
        cmpCamera.mtxPivot.rotateY(180);
        viewport.initialize("Viewport", viewportNode, cmpCamera, canvas);
        console.log(gameNode);


        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);

    }


    function update(_event: Event): void {
        movementTimer++;
        if (movementTimer == 300) {
            movementTimer = 0;

            for (let robotEntity of robots.getChildren() as Robot[]) {
                robotEntity.moveToNewField(); //move every robot to new field
                if (!robotAlive) {
                    robots.removeChild(robotEntity);
                }
            }
        }
        viewport.draw();
    }

    export function spawnWorld(): void {
        let posObject: ƒ.Vector2 = new ƒ.Vector2();
        let terminal: ƒ.Node = new Object("Terminal", posObject);
        posObject.x = 10;
        posObject.y = 22;
        objects.addChild(terminal);
        console.log(viewportNode);
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