namespace RoboGame {
    
    export class Enemy {
        public damageOfEnemy: number;
        public scrapsDropped: number;
        constructor(_level: number) {
            this.damageOfEnemy = _level * 2;
            this.scrapsDropped = _level * 5;
        }
    }
}