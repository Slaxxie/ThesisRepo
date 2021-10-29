namespace RoboGame {
    import ƒ = FudgeCore;
    export let worldSize: number = 64;

    export let noiseMap: ƒ.Noise2 = new ƒ.Noise2(Math.random);

    export class WorldMapTile extends QuadNode {
        private static scale: ƒ.Vector2 = new ƒ.Vector2(1, 1);
        public attribute: FIELDATTRIBUTE;
        public hasEnemy: boolean = false;
        private enemyRnd: number;
        constructor(_pos: ƒ.Vector2) {
            //eventlistener

            super("Field: " + (_pos.x + 1) + " / " + (_pos.y + 1), _pos, WorldMapTile.scale);

            //switchcase einfügen

            //let val: number = noiseMap.sample(_pos.x, _pos.y);
            this.enemyRnd = Math.random();
            let mapValue: number[][] = JSON.parse(localStorage.getItem("Map"));
            let val: number = mapValue[_pos.x][_pos.y];
            switch (true) {
                case (-1 <= val && val < -0.5): {
                    this.addComponent(new ƒ.ComponentMaterial(waterMaterial));
                    this.attribute = FIELDATTRIBUTE.WATER;
                    break;
                }
                case (-0.5 <= val && val < 0.1): {
                    this.addComponent(new ƒ.ComponentMaterial(plainsMaterial));
                    this.attribute = FIELDATTRIBUTE.PLAINS;
                    break;
                }
                case (0.1 <= val && val < 0.45): {
                    this.addComponent(new ƒ.ComponentMaterial(forestMaterial));
                    this.attribute = FIELDATTRIBUTE.FOREST;
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





/* export function getFieldInformation(): void {
    if (!fieldRevealed) {

    }
} */