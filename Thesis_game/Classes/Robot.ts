namespace RoboGame {
    import ƒ = FudgeCore;
    export let movementTimer: number = 0;
    let moduleMovement: boolean = true;
    let moduleFlying: boolean = false;
    let moduleInteraction: boolean = true;
    let moduleLumberjack: boolean = false;
    let moduleMiner: boolean = false;
    let moduleOil: boolean = false;
    let moduleFighter: boolean = false;
    let moduleRetreat: boolean = false;
    let moduleScout: boolean = false;
    let moduleBuild: boolean = false;
    let isInteracting: boolean = false;
    let previousField: ƒ.Vector2;
    export let robotAlive: boolean = true;
    export let damageValue: number;
    let nextDirection: number;
    let scale: ƒ.Vector2 = new ƒ.Vector2(1, 1);

    //let ressouceScrap: number; // austauschen


    export class Robot extends QuadNode {
        public fieldOfView: number = 1; //switch case für andere köpfe einbauen
        constructor(_name: string, _pos: ƒ.Vector2) {
            super("Robot: ", _pos, scale);
            let robotMaterial: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), textureRobot));
            this.addComponent(new ƒ.ComponentMaterial(robotMaterial));
        }
        moveToNewField(): void {
            let thisX: number = this.mtxLocal.translation.x;
            let thisY: number = this.mtxLocal.translation.y;
            previousField = new ƒ.Vector2(thisX, thisY);
            if (moduleMovement || moduleFlying) {
                nextDirection = Math.floor((Math.random() * 8)) + 1;
                switch (nextDirection) {
                    case 1: {
                        if (mapHelperArray[thisX - 1][thisY + 1].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                            this.mtxLocal.translateX(-1);
                            this.mtxLocal.translateY(+1);
                        }
                        break;
                    }
                    case 2: {
                        if (mapHelperArray[thisX][thisY + 1].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                            this.mtxLocal.translateY(+1);
                        }
                        break;
                    }
                    case 3: {
                        if (mapHelperArray[thisX + 1][thisY + 1].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                            this.mtxLocal.translateX(+1);
                            this.mtxLocal.translateY(+1);
                        }
                        break;
                    }
                    case 4: {
                        if (mapHelperArray[thisX - 1][thisY].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                            this.mtxLocal.translateX(-1);
                        }
                        break;
                    }
                    case 5: {
                        if (mapHelperArray[thisX + 1][thisY].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                            this.mtxLocal.translateX(+1);
                        }
                        break;
                    }
                    case 6: {
                        if (mapHelperArray[thisX - 1][thisY - 1].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                            this.mtxLocal.translateX(-1);
                            this.mtxLocal.translateY(-1);
                        }
                        break;
                    }
                    case 7: {
                        if (mapHelperArray[thisX][thisY - 1].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                            this.mtxLocal.translateY(-1);
                        }
                        break;
                    }
                    case 8: {
                        if (mapHelperArray[thisX + 1][thisY - 1].attribute != FIELDATTRIBUTE.WORLDBORDER) {
                            this.mtxLocal.translateX(+1);
                            this.mtxLocal.translateY(-1);
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }
        moveToPreviousField(): void {
            this.mtxLocal.translation = new ƒ.Vector3(previousField.x, previousField.y, 0);
        }
        obtainQuest(): void {
            console.log("placeholder" + moduleBuild);
        }
        collectWood(): void {
            console.log("placeholder" + moduleFighter);
        }
        collectOre(): void {
            console.log("placeholder");
        }
        collectOil(): void {
            console.log("placeholder");
        }
        collectScrap(): void {
            console.log("placeholder");
        }

        fightEnemy(): void {
            if (moduleRetreat) {

                this.moveToPreviousField();
            } else {
                let newEnemy: Enemy = new Enemy(5);
                if (damageValue > newEnemy.damageOfEnemy) {
                    //ressouceScrap += newEnemy.scrapsDropped;
                    isInteracting = false;
                } else {
                    robotAlive = false;
                }
            }
        }

        interactWithField(_tile: WorldMapTile): void {
            if (!isInteracting) {
                switch (_tile.attribute) {

                    case FIELDATTRIBUTE.FOREST: {
                        if (!moduleScout) {
                            if (moduleLumberjack) {
                                this.collectWood();
                            }
                        }
                        break;
                    }
                    case FIELDATTRIBUTE.PLAINS: {
                        //statements; 
                        break;
                    }
                    case FIELDATTRIBUTE.MOUNTAIN: {
                        if (!moduleFlying) {
                            this.moveToPreviousField();
                        }
                        break;
                    }
                    case FIELDATTRIBUTE.ORE: {
                        if (!moduleScout) {
                            if (moduleMiner) {
                                this.collectOre();
                            }
                        }
                        break;
                    }
                    case FIELDATTRIBUTE.OIL: {
                        if (!moduleScout) {
                            if (moduleOil) {
                                this.collectOil();
                            }
                        }
                        break;
                    }
                    case FIELDATTRIBUTE.WATER: {
                        if (!moduleFlying) {
                            this.moveToPreviousField();
                        }
                        break;
                    }
                    case FIELDATTRIBUTE.WRECKAGE: {
                        if (!moduleScout) {
                            if (moduleInteraction) {
                                this.collectScrap();
                            }
                        }
                        break;
                    }
                    default: {
                        //statements; 
                        break;
                    }
                }
            }
        }
    }
}