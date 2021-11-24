"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    RoboGame.objects = new ƒ.Node("Objects");
    class Object extends QuadNode {
        constructor(_name, _pos) {
            let scale = new ƒ.Vector2(1, 1);
            super(_name, _pos, scale);
            let material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), texturePlains));
            this.addComponent(new ƒ.ComponentMaterial(material));
        }
    }
    RoboGame.Object = Object;
    /* export function checkObjectCollision(): void {
        for (let object of objects.getChildren() as Object[]) {
            if (object.checkCollision(player)) {
                console.log("Collision");
            }
        }
    } */
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=Object.js.map