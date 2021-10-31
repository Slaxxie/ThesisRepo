"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    RoboGame.movementTimer = 0;
    RoboGame.harvestTimer = 0;
    class Robot extends RoboGame.QuadNode {
        constructor(_name, _pos) {
            super("Robot: ", _pos, Robot.scale);
            this.moduleMovement = true;
            this.moduleFlying = false;
            this.moduleScrapper = true;
            this.collectsScrap = false;
            this.moduleLumberjack = true;
            this.collectsBioMass = false;
            this.moduleMiner = false;
            this.collectsOre = false;
            this.moduleOil = false;
            this.collectsOil = false;
            this.moduleFighter = false;
            this.moduleRetreat = false;
            this.moduleScout = false;
            this.isInteracting = false;
            this.robotAlive = true;
            this.fieldOfView = 1; //switch case für andere köpfe einbauen
            let robotMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureRobot));
            this.addComponent(new ƒ.ComponentMaterial(robotMaterial));
        }
        moveToNewField() {
            let thisX = this.mtxLocal.translation.x;
            let thisY = this.mtxLocal.translation.y;
            let nextDirection;
            this.previousField = new ƒ.Vector2(thisX, thisY);
            if (!this.isInteracting) {
                if (this.moduleMovement || this.moduleFlying) {
                    nextDirection = Math.floor((Math.random() * 8)) + 1;
                    switch (nextDirection) {
                        case 1: {
                            if (RoboGame.mapHelperArray[thisX - 1][thisY + 1].attribute != RoboGame.FIELDATTRIBUTE.WORLDBORDER) {
                                this.mtxLocal.translateX(-1);
                                this.mtxLocal.translateY(+1);
                            }
                            break;
                        }
                        case 2: {
                            if (RoboGame.mapHelperArray[thisX][thisY + 1].attribute != RoboGame.FIELDATTRIBUTE.WORLDBORDER) {
                                this.mtxLocal.translateY(+1);
                            }
                            break;
                        }
                        case 3: {
                            if (RoboGame.mapHelperArray[thisX + 1][thisY + 1].attribute != RoboGame.FIELDATTRIBUTE.WORLDBORDER) {
                                this.mtxLocal.translateX(+1);
                                this.mtxLocal.translateY(+1);
                            }
                            break;
                        }
                        case 4: {
                            if (RoboGame.mapHelperArray[thisX - 1][thisY].attribute != RoboGame.FIELDATTRIBUTE.WORLDBORDER) {
                                this.mtxLocal.translateX(-1);
                            }
                            break;
                        }
                        case 5: {
                            if (RoboGame.mapHelperArray[thisX + 1][thisY].attribute != RoboGame.FIELDATTRIBUTE.WORLDBORDER) {
                                this.mtxLocal.translateX(+1);
                            }
                            break;
                        }
                        case 6: {
                            if (RoboGame.mapHelperArray[thisX - 1][thisY - 1].attribute != RoboGame.FIELDATTRIBUTE.WORLDBORDER) {
                                this.mtxLocal.translateX(-1);
                                this.mtxLocal.translateY(-1);
                            }
                            break;
                        }
                        case 7: {
                            if (RoboGame.mapHelperArray[thisX][thisY - 1].attribute != RoboGame.FIELDATTRIBUTE.WORLDBORDER) {
                                this.mtxLocal.translateY(-1);
                            }
                            break;
                        }
                        case 8: {
                            if (RoboGame.mapHelperArray[thisX + 1][thisY - 1].attribute != RoboGame.FIELDATTRIBUTE.WORLDBORDER) {
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
        moveToPreviousField() {
            this.mtxLocal.translation = new ƒ.Vector3(this.previousField.x, this.previousField.y, 0);
        }
        obtainQuest() {
            console.log("placeholder");
        }
        collectRessource(_tile) {
            if (this.collectsBioMass == true) {
                RoboGame.ressourceBioMass += RoboGame.increaseBioMass;
                _tile.ressourceAmount -= RoboGame.increaseBioMass;
                if (_tile.ressourceAmount <= 0) {
                    console.log("im empty");
                    this.isInteracting = false;
                    this.collectsBioMass = false;
                    _tile.refreshTile();
                }
            }
            if (this.collectsOre == true) {
                RoboGame.ressourceMetal += RoboGame.increaseMetal;
                _tile.ressourceAmount -= RoboGame.increaseMetal;
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsOre = false;
                    _tile.refreshTile();
                }
            }
            if (this.collectsOil == true) {
                RoboGame.ressourceOil += RoboGame.increaseOil;
                _tile.ressourceAmount -= RoboGame.increaseOil;
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsOil = false;
                    _tile.refreshTile();
                }
            }
            if (this.collectsScrap == true) {
                RoboGame.ressourceScrap += RoboGame.increaseScrap;
                _tile.ressourceAmount -= RoboGame.increaseScrap;
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsScrap = false;
                    _tile.refreshTile();
                }
            }
        }
        fightEnemy() {
            if (this.moduleRetreat) {
                this.moveToPreviousField();
            }
            else {
                let newEnemy = new RoboGame.Enemy(5);
                if (this.damageValue > newEnemy.damageOfEnemy) {
                    //ressouceScrap += newEnemy.scrapsDropped;
                    this.isInteracting = false;
                }
                else {
                    this.robotAlive = false;
                }
            }
        }
        interactWithField(_tile) {
            switch (_tile.attribute) {
                case RoboGame.FIELDATTRIBUTE.FOREST: {
                    if (!this.moduleScout) {
                        if (this.moduleLumberjack) {
                            this.isInteracting = true;
                            this.collectsBioMass = true;
                        }
                    }
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.PLAINS: {
                    //statements; 
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.MOUNTAIN: {
                    if (!this.moduleFlying) {
                        this.moveToPreviousField();
                    }
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.ORE: {
                    if (!this.moduleScout) {
                        if (this.moduleMiner) {
                            this.isInteracting = true;
                            this.collectsOre = true;
                        }
                    }
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.OIL: {
                    if (!this.moduleScout) {
                        if (this.moduleOil) {
                            this.isInteracting = true;
                            this.collectsOil = true;
                        }
                    }
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.WATER: {
                    if (!this.moduleFlying) {
                        this.moveToPreviousField();
                    }
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.WRECKAGE: {
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
    Robot.scale = new ƒ.Vector2(1, 1);
    RoboGame.Robot = Robot;
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=Robot.js.map