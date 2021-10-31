"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    RoboGame.worldSize = 64;
    RoboGame.noiseMap = new ƒ.Noise2(Math.random);
    class WorldMapTile extends RoboGame.QuadNode {
        constructor(_pos) {
            super("Field: " + (_pos.x + 1) + " / " + (_pos.y + 1), _pos, WorldMapTile.scale);
            this.hasEnemy = false;
            this.enemyRnd = Math.random();
            let mapValue = JSON.parse(localStorage.getItem("Map"));
            let val = mapValue[_pos.x][_pos.y];
            if (this.mtxLocal.translation.x == 0 || this.mtxLocal.translation.x == (RoboGame.worldSize - 1) || this.mtxLocal.translation.y == 0 || this.mtxLocal.translation.y == (RoboGame.worldSize - 1)) {
                this.addComponent(new ƒ.ComponentMaterial(RoboGame.borderMaterial));
                this.attribute = RoboGame.FIELDATTRIBUTE.WORLDBORDER;
            }
            else {
                switch (true) {
                    case (-1 <= val && val < -0.5): {
                        this.addComponent(new ƒ.ComponentMaterial(RoboGame.waterMaterial));
                        this.attribute = RoboGame.FIELDATTRIBUTE.WATER;
                        break;
                    }
                    case (-0.5 <= val && val < 0.1): {
                        this.addComponent(new ƒ.ComponentMaterial(RoboGame.plainsMaterial));
                        this.attribute = RoboGame.FIELDATTRIBUTE.PLAINS;
                        break;
                    }
                    case (0.1 <= val && val < 0.45): {
                        this.addComponent(new ƒ.ComponentMaterial(RoboGame.forestMaterial));
                        this.attribute = RoboGame.FIELDATTRIBUTE.FOREST;
                        break;
                    }
                    case (0.45 <= val && val <= 1): {
                        this.addComponent(new ƒ.ComponentMaterial(RoboGame.mountainMaterial));
                        this.attribute = RoboGame.FIELDATTRIBUTE.MOUNTAIN;
                        break;
                    }
                    default: {
                        break;
                    }
                }
                if (this.enemyRnd <= 0.05) {
                    this.hasEnemy = true;
                }
            }
        }
    }
    WorldMapTile.scale = new ƒ.Vector2(1, 1);
    RoboGame.WorldMapTile = WorldMapTile;
    function createWorld() {
        for (let x = 0; x < RoboGame.worldSize; x++) {
            RoboGame.mapHelperArray[x] = [];
            for (let y = 0; y < RoboGame.worldSize; y++) {
                let currentTile = new WorldMapTile(new ƒ.Vector2(x, y));
                currentTile.activate(false);
                RoboGame.mapHelperArray[x][y] = currentTile;
                RoboGame.worldTilesNode.addChild(currentTile);
            }
        }
    }
    RoboGame.createWorld = createWorld;
    function saveNoisemap() {
        let map = [];
        for (let x = 0; x < RoboGame.worldSize; x++) {
            map[x] = [];
            for (let y = 0; y < RoboGame.worldSize; y++) {
                map[x][y] = RoboGame.noiseMap.sample(x, y);
            }
        }
        localStorage.setItem("Map", JSON.stringify(map));
    }
    RoboGame.saveNoisemap = saveNoisemap;
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=WorldMapTile.js.map