namespace RoboGame {
    import ƒ = FudgeCore;

    export class Player extends QuadNode {
        static instance: Player;
        private constructor() {
            let pos: ƒ.Vector2 = new ƒ.Vector2(0, 1);
            let scale: ƒ.Vector2 = new ƒ.Vector2(1, 1);
            super("Player", pos, scale);
            let material: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(new ƒ.Color(56, 56, 56, 1)));
            this.addComponent(new ƒ.ComponentMaterial(material));

        }
        static getInstance(): Player {
            if (this.instance == null) this.instance = new Player();
            return this.instance;
        }
        public moveRight(): void {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateX((movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        public moveLeft(): void {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateX((- movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        public moveUp(): void {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateY((movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        public moveDown(): void {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateY((- movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
    }

}