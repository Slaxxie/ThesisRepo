"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    class QuadNode extends ƒ.Node {
        static mesh = new ƒ.MeshSprite("Quad");
        rect;
        constructor(_name, _pos, _scale) {
            super(_name);
            this.rect = new ƒ.Rectangle(_pos.x, _pos.y, _scale.x, _scale.y, ƒ.ORIGIN2D.CENTER);
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            let cmpMesh = new ƒ.ComponentMesh(QuadNode.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            this.addComponent(cmpMesh);
        }
        setRectPosition() {
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.y / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
        }
    }
    RoboGameNamespace.QuadNode = QuadNode;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=QuadNode.js.map