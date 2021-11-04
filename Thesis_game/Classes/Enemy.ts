namespace RoboGame {

    export class Enemy {
        public damageOfEnemy: number;
        public healthOfEnemy: number;
        public scrapsDropped: number;
        public isAlive: boolean = true;
        private randomInt: number = Math.round(Math.random() * 10);
        constructor(_level: number) {
            this.damageOfEnemy = _level * 2;
            this.scrapsDropped = (_level * (this.randomInt / 2)) * 5;
            this.healthOfEnemy = (_level * this.randomInt) + 15;
        }
    }
}