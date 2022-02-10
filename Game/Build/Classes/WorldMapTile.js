"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    var ƒ = FudgeCore;
    RoboGameNamespace.worldSize = 32;
    RoboGameNamespace.noiseMap = new ƒ.Noise2(Math.random);
    RoboGameNamespace.playerBase = new ƒ.Vector3(Math.floor(RoboGameNamespace.worldSize / 2), Math.floor(RoboGameNamespace.worldSize / 2), 0);
    class WorldMapTile extends RoboGameNamespace.QuadNode {
        static scale = new ƒ.Vector2(1, 1);
        attribute;
        hasEnemy = false;
        ressourceAmount = 0;
        enemyRnd;
        constructor(_pos) {
            super("Field: " + (_pos.x + 1) + " / " + (_pos.y + 1), _pos, WorldMapTile.scale);
            this.enemyRnd = Math.random();
            let mapValue = JSON.parse(localStorage.getItem("Map"));
            let val = mapValue[_pos.x][_pos.y];
            let randomizedInt = Math.random();
            if (this.mtxLocal.translation.x == 0 || this.mtxLocal.translation.x == (RoboGameNamespace.worldSize - 1) || this.mtxLocal.translation.y == 0 || this.mtxLocal.translation.y == (RoboGameNamespace.worldSize - 1)) {
                this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.borderMaterial));
                this.attribute = RoboGameNamespace.FIELDATTRIBUTE.WORLDBORDER;
            }
            else if (this.mtxLocal.translation.x == Math.floor(RoboGameNamespace.worldSize / 2) && this.mtxLocal.translation.y == Math.floor(RoboGameNamespace.worldSize / 2)) {
                //} else if (this.mtxLocal.translation == playerBase) {
                this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.factoryMaterial));
                this.attribute = RoboGameNamespace.FIELDATTRIBUTE.FACTORY;
            }
            else {
                switch (true) {
                    case (-1 <= val && val < -0.5): {
                        if (randomizedInt < 0.85) {
                            this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.waterMaterial));
                            this.attribute = RoboGameNamespace.FIELDATTRIBUTE.WATER;
                        }
                        else {
                            this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.oilMaterial));
                            this.attribute = RoboGameNamespace.FIELDATTRIBUTE.OIL;
                            this.ressourceAmount = Math.floor(Math.random() * 200) * RoboGameNamespace.increaseOil;
                        }
                        break;
                    }
                    case (-0.5 <= val && val < 0.1): {
                        if (randomizedInt <= 0.85) {
                            this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.plainsMaterial));
                            this.attribute = RoboGameNamespace.FIELDATTRIBUTE.PLAINS;
                        }
                        else if (randomizedInt > 0.85 && randomizedInt <= 0.92) {
                            this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.metalMaterial));
                            this.attribute = RoboGameNamespace.FIELDATTRIBUTE.METAL;
                            this.ressourceAmount = Math.floor(Math.random() * 100) * RoboGameNamespace.increaseRessource;
                        }
                        else if (randomizedInt > 0.92) {
                            this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.wreckageMaterial));
                            this.attribute = RoboGameNamespace.FIELDATTRIBUTE.WRECKAGE;
                            this.ressourceAmount = Math.floor(Math.random() * 10) * RoboGameNamespace.increaseScrap;
                        }
                        break;
                    }
                    case (0.1 <= val && val < 0.45): {
                        this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.forestMaterial));
                        this.attribute = RoboGameNamespace.FIELDATTRIBUTE.FOREST;
                        this.ressourceAmount = Math.floor(Math.random() * 25) * RoboGameNamespace.increaseBioMass;
                        break;
                    }
                    case (0.45 <= val && val <= 1): {
                        this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.mountainMaterial));
                        this.attribute = RoboGameNamespace.FIELDATTRIBUTE.MOUNTAIN;
                        break;
                    }
                    default: {
                        break;
                    }
                }
                if (this.enemyRnd <= 0.03) {
                    this.hasEnemy = true;
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.enemyMaterial));
                }
            }
        }
        refreshTile() {
            switch (this.attribute) {
                case RoboGameNamespace.FIELDATTRIBUTE.METAL: {
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.plainsMaterial));
                    break;
                }
                case RoboGameNamespace.FIELDATTRIBUTE.OIL: {
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.waterMaterial));
                    break;
                }
                case RoboGameNamespace.FIELDATTRIBUTE.FOREST: {
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.plainsMaterial));
                    break;
                }
                case RoboGameNamespace.FIELDATTRIBUTE.WRECKAGE: {
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(RoboGameNamespace.plainsMaterial));
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
    RoboGameNamespace.WorldMapTile = WorldMapTile;
    function createWorld() {
        for (let x = 0; x < RoboGameNamespace.worldSize; x++) {
            RoboGameNamespace.mapHelperArray[x] = [];
            for (let y = 0; y < RoboGameNamespace.worldSize; y++) {
                let currentTile = new WorldMapTile(new ƒ.Vector2(x, y));
                currentTile.activate(false);
                RoboGameNamespace.mapHelperArray[x][y] = currentTile;
                RoboGameNamespace.worldTilesNode.addChild(currentTile);
            }
        }
    }
    RoboGameNamespace.createWorld = createWorld;
    function saveNoisemap() {
        let map = [];
        for (let x = 0; x < RoboGameNamespace.worldSize; x++) {
            map[x] = [];
            for (let y = 0; y < RoboGameNamespace.worldSize; y++) {
                map[x][y] = RoboGameNamespace.noiseMap.sample(x, y);
            }
        }
        localStorage.setItem("Map", JSON.stringify(map));
    }
    RoboGameNamespace.saveNoisemap = saveNoisemap;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=WorldMapTile.js.map