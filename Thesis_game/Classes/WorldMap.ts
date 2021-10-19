namespace RoboGame {
    export enum FIELDATTRIBUTE {
        PLAINS,
        ORE,
        OIL,
        FOREST,
        MOUNTAIN,
        QUEST,
        ENEMY,
        WATER,
        WRECKAGE
    }

    export class WorldMap {
        public world: FIELDATTRIBUTE[][];
    }
}