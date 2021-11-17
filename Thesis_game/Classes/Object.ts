namespace RoboGame {
    import ƒ = FudgeCore;
    export let objects: ƒ.Node = new ƒ.Node("Objects");
    export class Object extends QuadNode {
        static instance: Object;
        constructor(_name: string, _pos: ƒ.Vector2) {
            let scale: ƒ.Vector2 = new ƒ.Vector2(1, 1);
            super(_name, _pos, scale);
            let material: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), texturePlains));
            this.addComponent(new ƒ.ComponentMaterial(material));
            
        }

    }
    
    /* export function checkObjectCollision(): void {
        for (let object of objects.getChildren() as Object[]) {
            if (object.checkCollision(player)) {
                console.log("Collision");
            }
        }
    } */
}