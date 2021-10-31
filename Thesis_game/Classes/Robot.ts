namespace RoboGame {
    import ƒ = FudgeCore;
    export let movementTimer: number = 0;
    export let harvestTimer: number = 0;
  
    export class Robot extends QuadNode {
        private static scale: ƒ.Vector2 = new ƒ.Vector2(1, 1);
        public previousField: ƒ.Vector2;
        public moduleMovement: boolean = true;
        public moduleFlying: boolean = false;
        public moduleScrapper: boolean = true;
        public collectsScrap: boolean = false;
        public moduleLumberjack: boolean = true;
        public collectsBioMass: boolean = false;
        public moduleMiner: boolean = false;
        public collectsOre: boolean = false;
        public moduleOil: boolean = false;
        public collectsOil: boolean = false;
        public moduleFighter: boolean = false;
        public moduleRetreat: boolean = false;
        public moduleScout: boolean = false;
        public isInteracting: boolean = false;
        public robotAlive: boolean = true;
        public damageValue: number;
        public fieldOfView: number = 1; //switch case für andere köpfe einbauen

        constructor(_name: string, _pos: ƒ.Vector2) {
            super("Robot: ", _pos, Robot.scale);
            let robotMaterial: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), textureRobot));
            this.addComponent(new ƒ.ComponentMaterial(robotMaterial));
        }
        moveToNewField(): void {
            let thisX: number = this.mtxLocal.translation.x;
            let thisY: number = this.mtxLocal.translation.y;
            let nextDirection: number;
            this.previousField = new ƒ.Vector2(thisX, thisY);

            if (!this.isInteracting) {
                if (this.moduleMovement || this.moduleFlying) {
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
        }
        moveToPreviousField(): void {
            this.mtxLocal.translation = new ƒ.Vector3(this.previousField.x, this.previousField.y, 0);
        }
        obtainQuest(): void {
            console.log("placeholder");
        }
        collectRessource(_tile: WorldMapTile): void {
            if (this.collectsBioMass == true) {
                ressourceBioMass += increaseBioMass;
                _tile.ressourceAmount -= increaseBioMass;
                if (_tile.ressourceAmount <= 0) {
                    console.log("im empty");
                    this.isInteracting = false;
                    this.collectsBioMass = false;
                    _tile.refreshTile();
                }
            }
            if (this.collectsOre == true) {
                ressourceMetal += increaseMetal;
                _tile.ressourceAmount -= increaseMetal;
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsOre = false;
                    _tile.refreshTile();
                }
            }
            if (this.collectsOil == true) {
                ressourceOil += increaseOil;
                _tile.ressourceAmount -= increaseOil;
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsOil = false;
                    _tile.refreshTile(); 
                }
            }
            if (this.collectsScrap == true) {
                ressourceScrap += increaseScrap;
                _tile.ressourceAmount -= increaseScrap;
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsScrap = false;
                    _tile.refreshTile();
                }
            }
        }

        fightEnemy(): void {
            if (this.moduleRetreat) {

                this.moveToPreviousField();
            } else {
                let newEnemy: Enemy = new Enemy(5);
                if (this.damageValue > newEnemy.damageOfEnemy) {
                    //ressouceScrap += newEnemy.scrapsDropped;
                    this.isInteracting = false;
                } else {
                    this.robotAlive = false;
                }
            }
        }

        interactWithField(_tile: WorldMapTile): void {

            switch (_tile.attribute) {

                case FIELDATTRIBUTE.FOREST: {
                    if (!this.moduleScout) {
                        if (this.moduleLumberjack) {
                            this.isInteracting = true;
                            this.collectsBioMass = true;
                        }
                    }
                    break;
                }
                case FIELDATTRIBUTE.PLAINS: {
                    //statements; 
                    break;
                }
                case FIELDATTRIBUTE.MOUNTAIN: {
                    if (!this.moduleFlying) {
                        this.moveToPreviousField();
                    }
                    break;
                }
                case FIELDATTRIBUTE.ORE: {
                    if (!this.moduleScout) {
                        if (this.moduleMiner) {
                            this.isInteracting = true;
                            this.collectsOre = true;
                        }
                    }
                    break;
                }
                case FIELDATTRIBUTE.OIL: {
                    if (!this.moduleScout) {
                        if (this.moduleOil) {
                            this.isInteracting = true;
                            this.collectsOil = true;
                        }
                    }
                    break;
                }
                case FIELDATTRIBUTE.WATER: {
                    if (!this.moduleFlying) {
                        this.moveToPreviousField();
                    }
                    break;
                }
                case FIELDATTRIBUTE.WRECKAGE: {
                    if (!this.moduleScout) {
                        if (this.moduleScrapper) {
                            this.isInteracting = true;
                            this.collectsScrap = true;
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