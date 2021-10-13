namespace RoboGame {
    import ƒ = FudgeCore;

    export class Object extends QuadNode {
        static instance: Object;
        private constructor() {
            let pos: ƒ.Vector2 = new ƒ.Vector2(0, 1);
            let scale: ƒ.Vector2 = new ƒ.Vector2(1, 1);
            super("Object", pos, scale);
            let material: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(new ƒ.Color(56, 56, 56, 1)));
            this.addComponent(new ƒ.ComponentMaterial(material));

        }
        
    }

}