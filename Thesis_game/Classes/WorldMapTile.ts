namespace RoboGame {
    import ƒ = FudgeCore;
    export let worldSize: number = 64;

    export let noiseMap: ƒ.Noise2 = new ƒ.Noise2(Math.random);

    export class WorldMapTile extends QuadNode {
        private static scale: ƒ.Vector2 = new ƒ.Vector2(1, 1);
        public attribute: FIELDATTRIBUTE;
        public hasEnemy: boolean = false;
        public ressourceAmount: number = 0;
        private enemyRnd: number;
        constructor(_pos: ƒ.Vector2) {
            super("Field: " + (_pos.x + 1) + " / " + (_pos.y + 1), _pos, WorldMapTile.scale);

            this.enemyRnd = Math.random();
            let mapValue: number[][] = JSON.parse(localStorage.getItem("Map"));
            let val: number = mapValue[_pos.x][_pos.y];
            let randomizedInt: number = Math.random();

            if (this.mtxLocal.translation.x == 0 || this.mtxLocal.translation.x == (worldSize - 1) || this.mtxLocal.translation.y == 0 || this.mtxLocal.translation.y == (worldSize - 1)) {
                this.addComponent(new ƒ.ComponentMaterial(borderMaterial));
                this.attribute = FIELDATTRIBUTE.WORLDBORDER;
            } else if (this.mtxLocal.translation.x == Math.floor(worldSize / 2) && this.mtxLocal.translation.y == Math.floor(worldSize / 2)) {
                this.addComponent(new ƒ.ComponentMaterial(factoryMaterial));
                this.attribute = FIELDATTRIBUTE.FACTORY;
            } else {
                switch (true) {
                    case (-1 <= val && val < -0.5): {
                        if (randomizedInt < 0.9) {
                            this.addComponent(new ƒ.ComponentMaterial(waterMaterial));
                            this.attribute = FIELDATTRIBUTE.WATER;
                        } else {
                            this.addComponent(new ƒ.ComponentMaterial(oilMaterial));
                            this.attribute = FIELDATTRIBUTE.OIL;
                            this.ressourceAmount = Math.floor(Math.random() * 200) * increaseOil;
                        }
                        break;
                    }
                    case (-0.5 <= val && val < 0.1): {
                        if (randomizedInt <= 0.7) {
                            this.addComponent(new ƒ.ComponentMaterial(plainsMaterial));
                            this.attribute = FIELDATTRIBUTE.PLAINS;
                        } else if (randomizedInt > 0.7 && randomizedInt <= 0.9) {
                            this.addComponent(new ƒ.ComponentMaterial(oreMaterial));
                            this.attribute = FIELDATTRIBUTE.ORE;
                            this.ressourceAmount = Math.floor(Math.random() * 100) * increaseMetal;
                        } else {
                            this.addComponent(new ƒ.ComponentMaterial(wreckageMaterial));
                            this.attribute = FIELDATTRIBUTE.WRECKAGE;
                            this.ressourceAmount = Math.floor(Math.random() * 10) * increaseScrap;

                        }
                        break;
                    }
                    case (0.1 <= val && val < 0.45): {
                        this.addComponent(new ƒ.ComponentMaterial(forestMaterial));
                        this.attribute = FIELDATTRIBUTE.FOREST;
                        this.ressourceAmount = Math.floor(Math.random() * 25) * increaseBioMass;

                        break;
                    }
                    case (0.45 <= val && val <= 1): {
                        this.addComponent(new ƒ.ComponentMaterial(mountainMaterial));
                        this.attribute = FIELDATTRIBUTE.MOUNTAIN;
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
        refreshTile(): void {
            switch (this.attribute) {
                case FIELDATTRIBUTE.ORE: {
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(plainsMaterial));
                    break;
                }
                case FIELDATTRIBUTE.OIL: {
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(waterMaterial));
                    break;
                }
                case FIELDATTRIBUTE.FOREST: {
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(plainsMaterial));
                    break;
                }
                case FIELDATTRIBUTE.WRECKAGE: {
                    this.removeComponent(this.getComponent(ƒ.ComponentMaterial));
                    this.addComponent(new ƒ.ComponentMaterial(plainsMaterial));
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    export function createWorld(): void {
        for (let x: number = 0; x < worldSize; x++) {
            mapHelperArray[x] = [];
            for (let y: number = 0; y < worldSize; y++) {
                let currentTile: WorldMapTile = new WorldMapTile(new ƒ.Vector2(x, y));
                currentTile.activate(false);
                mapHelperArray[x][y] = currentTile;
                worldTilesNode.addChild(currentTile);
            }
        }
    }

    export function saveNoisemap(): void {
        let map: number[][] = [];
        for (let x: number = 0; x < worldSize; x++) {
            map[x] = [];
            for (let y: number = 0; y < worldSize; y++) {
                map[x][y] = noiseMap.sample(x, y);
            }
        }
        localStorage.setItem("Map", JSON.stringify(map));
    }
}





