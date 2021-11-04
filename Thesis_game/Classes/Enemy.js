"use strict";
var RoboGame;
(function (RoboGame) {
    class Enemy {
        constructor(_level) {
            this.isAlive = true;
            this.randomInt = Math.round(Math.random() * 10);
            this.damageOfEnemy = _level * 2;
            this.scrapsDropped = (_level * (this.randomInt / 2)) * 5;
            this.healthOfEnemy = (_level * this.randomInt) + 15;
        }
    }
    RoboGame.Enemy = Enemy;
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=Enemy.js.map