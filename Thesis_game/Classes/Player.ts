namespace RoboGameNamespace {
    import ƒ = FudgeCore;

    export class Player extends QuadNode {
        static instance: Player;
        private constructor() {
            let pos: ƒ.Vector2 = new ƒ.Vector2(0, 0);
            let scale: ƒ.Vector2 = new ƒ.Vector2(1, 1);
            super("Player", pos, scale);           
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
        public moveCameraDown(): void {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateZ((- movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        public moveCameraUp(): void {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateZ(( movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
    }
    
}