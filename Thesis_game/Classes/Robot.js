"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    RoboGame.movementTimer = 0;
    let moduleMovement = true;
    let moduleFlying = false;
    let moduleInteraction = true;
    let moduleLumberjack = false;
    let moduleMiner = false;
    let moduleOil = false;
    let moduleFighter = false;
    let moduleRetreat = false;
    let moduleScout = false;
    let moduleBuild = false;
    let isInteracting = false;
    let previousField;
    RoboGame.robotAlive = true;
    let nextDirection;
    let scale = new ƒ.Vector2(1, 1);
    //let ressouceScrap: number; // austauschen
    class Robot extends RoboGame.QuadNode {
        constructor(_name, _pos) {
            super("Robot: ", _pos, scale);
            this.fieldOfView = 1; //switch case für andere köpfe einbauen
            let robotMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureRobot));
            this.addComponent(new ƒ.ComponentMaterial(robotMaterial));
        }
        moveToNewField() {
            if (moduleMovement || moduleFlying) {
                //getFieldInformation();
                previousField = new ƒ.Vector2(this.mtxLocal.translation.x, this.mtxLocal.translation.y);
                nextDirection = Math.floor((Math.random() * 8)) + 1;
                switch (nextDirection) {
                    case 1: {
                        this.mtxLocal.translateX(-1);
                        this.mtxLocal.translateY(+1);
                        break;
                    }
                    case 2: {
                        this.mtxLocal.translateY(+1);
                        break;
                    }
                    case 3: {
                        this.mtxLocal.translateX(+1);
                        this.mtxLocal.translateY(+1);
                        break;
                    }
                    case 4: {
                        this.mtxLocal.translateX(-1);
                        break;
                    }
                    case 5: {
                        this.mtxLocal.translateX(+1);
                        break;
                    }
                    case 6: {
                        this.mtxLocal.translateX(-1);
                        this.mtxLocal.translateY(-1);
                        break;
                    }
                    case 7: {
                        this.mtxLocal.translateY(-1);
                        break;
                    }
                    case 8: {
                        this.mtxLocal.translateX(1);
                        this.mtxLocal.translateY(-1);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }
        moveToPreviousField() {
            this.mtxLocal.translation = new ƒ.Vector3(previousField.x, previousField.y, 0);
        }
        obtainQuest() {
            console.log("placeholder" + moduleBuild);
        }
        collectWood() {
            console.log("placeholder" + moduleFighter);
        }
        collectOre() {
            console.log("placeholder");
        }
        collectOil() {
            console.log("placeholder");
        }
        collectScrap() {
            console.log("placeholder");
        }
        fightEnemy() {
            if (moduleRetreat) {
                this.moveToPreviousField();
            }
            else {
                let newEnemy = new RoboGame.Enemy(5);
                if (RoboGame.damageValue > newEnemy.damageOfEnemy) {
                    //ressouceScrap += newEnemy.scrapsDropped;
                    isInteracting = false;
                }
                else {
                    RoboGame.robotAlive = false;
                }
            }
        }
        interactWithField(_tile) {
            if (!isInteracting) {
                switch (_tile.attribute) {
                    case RoboGame.FIELDATTRIBUTE.FOREST: {
                        if (!moduleScout) {
                            if (moduleLumberjack) {
                                this.collectWood();
                            }
                        }
                        break;
                    }
                    case RoboGame.FIELDATTRIBUTE.PLAINS: {
                        //statements; 
                        break;
                    }
                    case RoboGame.FIELDATTRIBUTE.MOUNTAIN: {
                        if (!moduleFlying) {
                            this.moveToPreviousField();
                        }
                        break;
                    }
                    case RoboGame.FIELDATTRIBUTE.ORE: {
                        if (!moduleScout) {
                            if (moduleMiner) {
                                this.collectOre();
                            }
                        }
                        break;
                    }
                    case RoboGame.FIELDATTRIBUTE.OIL: {
                        if (!moduleScout) {
                            if (moduleOil) {
                                this.collectOil();
                            }
                        }
                        break;
                    }
                    case RoboGame.FIELDATTRIBUTE.WATER: {
                        if (!moduleFlying) {
                            this.moveToPreviousField();
                        }
                        break;
                    }
                    case RoboGame.FIELDATTRIBUTE.WRECKAGE: {
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
    RoboGame.Robot = Robot;
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=Robot.js.map