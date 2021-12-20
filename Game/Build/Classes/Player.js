"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    class Player extends RoboGameNamespace.QuadNode {
        static instance;
        constructor() {
            let pos = new ƒ.Vector2(0, 0);
            let scale = new ƒ.Vector2(1, 1);
            super("Player", pos, scale);
        }
        static getInstance() {
            if (this.instance == null)
                this.instance = new Player();
            return this.instance;
        }
        moveCameraRight() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateX((RoboGameNamespace.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        moveCameraLeft() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateX((-RoboGameNamespace.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        moveCameraTop() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateY((RoboGameNamespace.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        moveCameraBottom() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateY((-RoboGameNamespace.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        moveCameraDown() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateZ((-RoboGameNamespace.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        moveCameraUp() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateZ((RoboGameNamespace.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
    }
    RoboGameNamespace.Player = Player;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=Player.js.map