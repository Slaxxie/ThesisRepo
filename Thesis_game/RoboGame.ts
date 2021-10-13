namespace RoboGame {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);

    let gameNode: ƒ.Node = new ƒ.Node("Game");
    let viewportNode: ƒ.Node = new ƒ.Node("Viewport");
    let viewport: ƒ.Viewport = new ƒ.Viewport();
    export let player: Player;
    export let movementSpeed: number = 15;
    export let leftBorder: number = -16.5;
    export let rightBorder: number = 16.5;
    export let topBorder: number = 19;
    export let bottomBorder: number = 1;

    gameNode.appendChild(viewportNode);

    function init(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        player = Player.getInstance();
        viewportNode.addChild(player);


        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(31);
        cmpCamera.mtxPivot.translateY(10);
        cmpCamera.mtxPivot.rotateY(180);
        viewport.initialize("Viewport", viewportNode, cmpCamera, canvas);
        console.log(gameNode);

        
        console.log(player);

        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);

    }

    function hndKey(): void {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]) && Player.getInstance().mtxLocal.translation.x <= rightBorder || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && Player.getInstance().mtxLocal.translation.x <= rightBorder ) {
            player.moveRight();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]) && Player.getInstance().mtxLocal.translation.x >= leftBorder || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]) && Player.getInstance().mtxLocal.translation.x >= leftBorder ) {
            player.moveLeft();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]) && Player.getInstance().mtxLocal.translation.y <= topBorder || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP]) && Player.getInstance().mtxLocal.translation.y <= topBorder ) {
            player.moveUp();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S]) && Player.getInstance().mtxLocal.translation.y >= bottomBorder || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN]) && Player.getInstance().mtxLocal.translation.y >= bottomBorder ) {
            player.moveDown();
        }
    }

    function update(_event: Event): void {
        hndKey();
        //checkCollision();

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