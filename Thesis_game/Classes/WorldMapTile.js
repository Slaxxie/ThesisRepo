"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    RoboGame.worldSize = 32;
    RoboGame.noiseMap = new ƒ.Noise2(Math.random);
    RoboGame.playerBase = new ƒ.Vector3(Math.floor(RoboGame.worldSize / 2), Math.floor(RoboGame.worldSize / 2), 0);
    class WorldMapTile extends RoboGame.QuadNode {
        constructor(_pos) {
            super("Field: " + (_pos.x + 1) + " / " + (_pos.y + 1), _pos, WorldMapTile.scale);
            this.hasEnemy = false;
            this.ressourceAmount = 0;
            this.enemyRnd = Math.random();
            let mapValue = JSON.parse(localStorage.getItem("Map"));
            let val = mapValue[_pos.x][_pos.y];
            let randomizedInt = Math.random();
            if (this.mtxLocal.translation.x == 0 || this.mtxLocal.translation.x == (RoboGame.worldSize - 1) || this.mtxLocal.translation.y == 0 || this.mtxLocal.translation.y == (RoboGame.worldSize - 1)) {
                this.addComponent(new ƒ.ComponentMaterial(RoboGame.borderMaterial));
                this.attribute = RoboGame.FIELDATTRIBUTE.WORLDBORDER;
            }
            else if (this.mtxLocal.translation.x == Math.floor(RoboGame.worldSize / 2) && this.mtxLocal.translation.y == Math.floor(RoboGame.worldSize / 2)) {
                //} else if (this.mtxLocal.translation == playerBase) {
                this.addComponent(new ƒ.ComponentMaterial(RoboGame.factoryMaterial));
                this.attribute = RoboGame.FIELDATTRIBUTE.FACTORY;
            }
            else {
                switch (true) {
                    case (-1 <= val && val < -0.5): {
                        if (randomizedInt < 0.85) {
                            this.addComponent(new ƒ.ComponentMaterial(RoboGame.waterMaterial));
                            this.attribute = RoboGame.FIELDATTRIBUTE.WATER;
                        }
                        else {
                            this.addComponent(new ƒ.ComponentMaterial(RoboGame.oilMaterial));
                            this.attribute = RoboGame.FIELDATTRIBUTE.OIL;
                            this.ressourceAmount = Math.floor(Math.random() * 200) * RoboGame.increaseOil;
                        }
                        break;
                    }
                    case (-0.5 <= val && val < 0.1): {
                        if (randomizedInt <= 0.85) {
                            this.addComponent(new ƒ.ComponentMaterial(RoboGame.plainsMaterial));
                            this.attribute = RoboGame.FIELDATTRIBUTE.PLAINS;
                        }
                        else if (randomizedInt > 0.85 && randomizedInt <= 0.92) {
                            this.addComponent(new ƒ.ComponentMaterial(RoboGame.oreMaterial));
                            this.attribute = RoboGame.FIELDATTRIBUTE.ORE;
                            this.ressourceAmount = Math.floor(Math.random() * 100) * RoboGame.increaseMetal;
                        }
                        else if (randomizedInt > 0.92) {
                            this.addComponent(new ƒ.ComponentMaterial(RoboGame.wreckageMaterial));
                            this.attribute = RoboGame.FIELDATTRIBUTE.WRECKAGE;
                            this.ressourceAmount = Math.floor(Math.random() * 10) * RoboGame.increaseScrap;
                        }
                        break;
                    }
                    case (0.1 <= val && val < 0.45): {
                        this.addComponent(new ƒ.ComponentMaterial(RoboGame.forestMaterial));
                        this.attribute = RoboGame.FIELDATTRIBUTE.FOREST;
                        this.ressourceAmount = Math.floor(Math.random() * 25) * RoboGame.increaseBioMass;
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
        refreshTile() {
            switch (this.attribute) {
                case RoboGame.FIELDATTRIBUTE.ORE: {
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(RoboGame.plainsMaterial));
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.OIL: {
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(RoboGame.waterMaterial));
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.FOREST: {
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(RoboGame.plainsMaterial));
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.WRECKAGE: {
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(RoboGame.plainsMaterial));
                    break;
                }
                default: {
                    break;
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