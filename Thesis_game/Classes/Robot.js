"use strict";
var RoboGame;
(function (RoboGame) {
    var ƒ = FudgeCore;
    RoboGame.movementTimer = 0;
    RoboGame.harvestTimer = 0;
    let newRobot;
    class Robot extends RoboGame.QuadNode {
        constructor(_name, _pos) {
            super(_name, _pos, Robot.scale);
            this.moduleMovement = true;
            this.moduleHovering = false;
            this.moduleScrapper = false;
            this.moduleLumberjack = true;
            this.moduleMiner = false;
            this.moduleOil = false;
            this.moduleFighter = true;
            this.moduleRetreat = false;
            this.isInteracting = false;
            this.robotAlive = true;
            this.isAutomated = false;
            this.damageValue = 0;
            this.ressourceCapacity = 200;
            this.isWaiting = true;
            this.fieldOfView = 1; //switch case für andere köpfe einbauen
            this.robotUI = document.createElement("div");
            this.activateRobot = document.createElement("button");
            /*  private callRobotBack: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
             private disassembleRobot: HTMLButtonElement = <HTMLButtonElement>document.createElement("button"); */
            this.bioMassLoaded = 0;
            this.oreLoaded = 0;
            this.oilLoaded = 0;
            this.scrapLoaded = 0;
            this.collectsBioMass = false;
            this.collectsOre = false;
            this.collectsOil = false;
            this.collectsScrap = false;
            this.robotUI.className = "RobotUI";
            document.getElementById("Robots").appendChild(this.robotUI);
            this.robotUI.appendChild(this.activateRobot);
            this.activateRobot.addEventListener("click", () => {
                activateRobot(this);
            });
            this.activateRobot.className = "activateRobot";
            let robotMaterial = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), RoboGame.textureRobot));
            this.addComponent(new ƒ.ComponentMaterial(robotMaterial));
        }
        moveToNewField() {
            let thisX = this.mtxLocal.translation.x;
            let thisY = this.mtxLocal.translation.y;
            let nextDirection;
            this.previousField = new ƒ.Vector2(thisX, thisY);
            if (!this.isWaiting) {
                if (!this.isInteracting) {
                    if (this.moduleMovement || this.moduleHovering) {
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
        }
        interactWithField(_tile) {
            switch (_tile.attribute) {
                case RoboGame.FIELDATTRIBUTE.FOREST: {
                    if (this.moduleLumberjack) {
                        this.isInteracting = true;
                        this.collectsBioMass = true;
                    }
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.MOUNTAIN: {
                    if (!this.moduleHovering) {
                        this.moveToPreviousField();
                    }
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.ORE: {
                    if (this.moduleMiner) {
                        this.isInteracting = true;
                        this.collectsOre = true;
                    }
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.OIL: {
                    if (this.moduleOil) {
                        this.isInteracting = true;
                        this.collectsOil = true;
                    }
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.WATER: {
                    if (!this.moduleHovering) {
                        this.moveToPreviousField();
                    }
                    break;
                }
                case RoboGame.FIELDATTRIBUTE.WRECKAGE: {
                    if (this.moduleScrapper) {
                        this.isInteracting = true;
                        this.collectsScrap = true;
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
        moveToPreviousField() {
            this.mtxLocal.translation = new ƒ.Vector3(this.previousField.x, this.previousField.y, 0);
        }
        collectRessource(_tile) {
            if (this.collectsBioMass == true) {
                this.bioMassLoaded += RoboGame.increaseBioMass;
                _tile.ressourceAmount -= RoboGame.increaseBioMass;
                if (this.bioMassLoaded >= this.ressourceCapacity) {
                    this.collectsBioMass = false;
                    this.returnTimer();
                }
                if (_tile.ressourceAmount <= 0) {
                    console.log("im empty");
                    this.isInteracting = false;
                    this.collectsBioMass = false;
                    _tile.refreshTile();
                }
            }
            if (this.collectsOre == true) {
                this.oreLoaded += RoboGame.increaseMetal;
                _tile.ressourceAmount -= RoboGame.increaseMetal;
                if (this.oreLoaded >= this.ressourceCapacity) {
                    this.collectsOre = false;
                    this.returnTimer();
                }
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsOre = false;
                    _tile.refreshTile();
                }
            }
            if (this.collectsOil == true) {
                this.oilLoaded += RoboGame.increaseOil;
                _tile.ressourceAmount -= RoboGame.increaseOil;
                if (this.oilLoaded >= this.ressourceCapacity) {
                    this.collectsOil = false;
                    this.returnTimer();
                }
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsOil = false;
                    _tile.refreshTile();
                }
            }
            if (this.collectsScrap == true) {
                this.scrapLoaded += RoboGame.increaseScrap;
                _tile.ressourceAmount -= RoboGame.increaseScrap;
                if (this.scrapLoaded >= this.ressourceCapacity) {
                    this.collectsScrap = false;
                    this.returnTimer();
                }
                if (_tile.ressourceAmount <= 0) {
                    this.isInteracting = false;
                    this.collectsScrap = false;
                    _tile.refreshTile();
                }
            }
        }
        returnTimer() {
            ƒ.Time.game.setTimer(6000, 1, () => {
                this.returnToBase();
            });
        }
        returnToBase() {
            this.isInteracting = false;
            this.mtxLocal.translation = RoboGame.playerBase;
            RoboGame.ressourceBioMass += this.bioMassLoaded;
            this.bioMassLoaded = 0;
            RoboGame.ressourceMetal += this.oreLoaded;
            this.oreLoaded = 0;
            RoboGame.ressourceOil += this.oilLoaded;
            this.oilLoaded = 0;
            RoboGame.ressourceScrap += this.scrapLoaded;
            this.scrapLoaded = 0;
            if (!this.isAutomated) {
                this.isWaiting = true;
            }
        }
        fightEnemy() {
            if (this.moduleRetreat) {
                this.moveToPreviousField();
            }
            else {
                let newEnemy = new RoboGame.Enemy(5);
                if (this.damageValue > newEnemy.damageOfEnemy) {
                    this.isInteracting = false;
                }
                else {
                    this.robotAlive = false;
                }
            }
        }
    }
    Robot.scale = new ƒ.Vector2(1, 1);
    RoboGame.Robot = Robot;
    function createRobot() {
        newRobot = new Robot("Robot #" + (RoboGame.robots.getChildren().length + 1), new ƒ.Vector2(RoboGame.worldSize / 2, RoboGame.worldSize / 2));
    }
    RoboGame.createRobot = createRobot;
    function spawnRobot() {
        RoboGame.robots.addChild(newRobot);
    }
    RoboGame.spawnRobot = spawnRobot;
    function activateRobot(robot) {
        robot.isWaiting = false;
    }
    RoboGame.activateRobot = activateRobot;
    function setCollectionModule(robot, module) {
        switch (module) {
            case "lumberer": {
                robot.moduleLumberjack = true;
                robot.moduleMiner = false;
                robot.moduleOil = false;
                robot.moduleScrapper = false;
                break;
            }
            case "miner": {
                robot.moduleLumberjack = false;
                robot.moduleMiner = true;
                robot.moduleOil = false;
                robot.moduleScrapper = false;
                break;
            }
            case "oiler": {
                robot.moduleLumberjack = false;
                robot.moduleMiner = false;
                robot.moduleOil = true;
                robot.moduleScrapper = false;
                break;
            }
            case "scrapper": {
                robot.moduleLumberjack = false;
                robot.moduleMiner = false;
                robot.moduleOil = false;
                robot.moduleScrapper = true;
                break;
            }
            case "none": {
                robot.moduleLumberjack = false;
                robot.moduleMiner = false;
                robot.moduleOil = false;
                robot.moduleScrapper = false;
                break;
            }
            default:
                break;
        }
    }
    RoboGame.setCollectionModule = setCollectionModule;
    function setFightMode(robot, module) {
        switch (module) {
            case "fight": {
                robot.moduleFighter = true;
                robot.moduleRetreat = false;
                break;
            }
            case "retreat": {
                robot.moduleFighter = false;
                robot.moduleRetreat = true;
                break;
            }
        }
    }
    RoboGame.setFightMode = setFightMode;
    function setAutoMode(robot) {
        if (robot.isAutomated) {
            robot.isAutomated = false;
        }
        if (!robot.isAutomated) {
            robot.isAutomated = true;
        }
    }
    RoboGame.setAutoMode = setAutoMode;
    function setHoverMode(robot) {
        if (robot.moduleHovering) {
            robot.moduleHovering = false;
        }
        if (!robot.moduleHovering) {
            robot.moduleHovering = true;
        }
    }
    RoboGame.setHoverMode = setHoverMode;
})(RoboGame || (RoboGame = {}));
//# sourceMappingURL=Robot.js.map