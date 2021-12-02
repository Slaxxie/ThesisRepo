"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    class Enemy {
        constructor(_level) {
            this.isAlive = true;
            this.randomInt = Math.round(Math.random() * 10);
            this.damageOfEnemy = _level * 2;
            this.scrapsDropped = (_level * (this.randomInt / 2)) * 5;
            this.healthOfEnemy = (_level * this.randomInt) + 15;
        }
    }
    RoboGameNamespace.Enemy = Enemy;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=Enemy.js.map