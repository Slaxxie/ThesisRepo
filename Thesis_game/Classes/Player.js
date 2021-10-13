"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    class Player extends RoboGame.QuadNode {
        constructor() {
            let pos = new ƒ.Vector2(0, 1);
            let scale = new ƒ.Vector2(1, 1);
            super("Player", pos, scale);
            let material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(new ƒ.Color(56, 56, 56, 1)));
            this.addComponent(new ƒ.ComponentMaterial(material));
        }
        static getInstance() {
            if (this.instance == null)
                this.instance = new Player();
            return this.instance;
        }
        moveRight() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateX((RoboGame.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        moveLeft() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateX((-RoboGame.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        moveUp() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateY((RoboGame.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        moveDown() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateY((-RoboGame.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
    }
    RoboGame.Player = Player;
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=Player.js.map