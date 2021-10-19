"use strict";
var RoboGame;
(function (RoboGame) {
    class Enemy {
        constructor(_level) {
            this.damageOfEnemy = _level * 2;
            this.scrapsDropped = _level * 5;
        }
    }
    RoboGame.Enemy = Enemy;
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=Enemy.js.map