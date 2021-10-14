"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    RoboGame.objects = new ƒ.Node("Objects");
    class Object extends RoboGame.QuadNode {
        constructor() {
            let pos = new ƒ.Vector2(0, 1);
            let scale = new ƒ.Vector2(1, 1);
            super("Object", pos, scale);
            let material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(new ƒ.Color(56, 56, 56, 1)));
            this.addComponent(new ƒ.ComponentMaterial(material));
        }
    }
    RoboGame.Object = Object;
    function checkCollision() {
        for (let object of RoboGame.objects.getChildren()) {
            if (object.checkCollision(RoboGame.player)) {
                console.log("Collision");
            }
        }
    }
    RoboGame.checkCollision = checkCollision;
    function checkInteraction() {
        for (let interact of RoboGame.objects.getChildren()) {
            if (interact.checkCollision(RoboGame.player)) {
                console.log("Interaction");
            }
        }
    }
    RoboGame.checkInteraction = checkInteraction;
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=Object.js.map