namespace RoboGame {
    import ƒ = FudgeCore;
    export let movementTimer: number = 0;
    export let harvestTimer: number = 0;
    let newRobot: Robot;

    export class Robot extends QuadNode {
        private static scale: ƒ.Vector2 = new ƒ.Vector2(1, 1);
        public previousField: ƒ.Vector2;
        public moduleMovement: boolean = true;
        public moduleHovering: boolean = false;
        public moduleScrapper: boolean = false;
        public moduleLumberjack: boolean = true;
        public moduleMiner: boolean = false;
        public moduleOil: boolean = false;
        public moduleFighter: boolean = true;
        public moduleRetreat: boolean = false;
        public isInteracting: boolean = false;
        public robotAlive: boolean = true;
        public isAutomated: boolean = false;
        public damageValue: number = 0;
        public ressourceCapacity: number = 200;
        public isWaiting: boolean = true;
        public fieldOfView: number = 1; //switch case für andere köpfe einbauen
        public robotUI: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        private activateRobot: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private callRobotBack: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private disassembleRobot: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private automateRobot: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        private bioMassLoaded: number = 0;
        private oreLoaded: number = 0;
        private oilLoaded: number = 0;
        private scrapLoaded: number = 0;
        private collectsBioMass: boolean = false;
        private collectsOre: boolean = false;
        private collectsOil: boolean = false;
        private collectsScrap: boolean = false;

        constructor(_name: string, _pos: ƒ.Vector2) {
            super(_name, _pos, Robot.scale);
            this.robotUI.className = "RobotUI";
            document.getElementById("Robots").appendChild(this.robotUI);
            this.robotUI.appendChild(this.activateRobot);
            this.activateRobot.addEventListener("click", () => {
                activateRobot(this);
            });
            this.activateRobot.className = "activateRobot";
            this.robotUI.appendChild(this.callRobotBack);
            this.callRobotBack.addEventListener("click", () => {
                this.returnTimer();
            });
            this.callRobotBack.className = "callRobotBack";
            this.robotUI.appendChild(this.disassembleRobot);
            this.disassembleRobot.addEventListener("click", () => {
                disassembleRobot(this);
            });
            this.disassembleRobot.className = "disassembleRobot";
            this.robotUI.appendChild(this.automateRobot);
            this.automateRobot.addEventListener("click", () => {
                setAutoMode(this);
            });
            this.automateRobot.className = "automateRobot";

            let robotMaterial: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), textureRobot));
            this.addComponent(new ƒ.ComponentMaterial(robotMaterial));
        }

        moveToNewField(): void {
            let thisX: number = this.mtxLocal.translation.x;
            let thisY: number = this.mtxLocal.translation.y;
            let nextDirection: number;
            this.previousField = new ƒ.Vector2(thisX, thisY);

            if (!this.isWaiting) {
                if (!this.isInteracting) {
                    if (this.moduleMovement || this.moduleHovering) {
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
        }

        interactWithField(_tile: WorldMapTile): void {

            switch (_tile.attribute) {

                case FIELDATTRIBUTE.FOREST: {

                    if (this.moduleLumberjack) {
                        this.isInteracting = true;
                        this.collectsBioMass = true;
                    }
                    break;
                }
                case FIELDATTRIBUTE.MOUNTAIN: {
                    if (!this.moduleHovering) {
                        this.moveToPreviousField();
                    }
                    break;
                }
                case FIELDATTRIBUTE.ORE: {
                    if (this.moduleMiner) {
                        this.isInteracting = true;
                        this.collectsOre = true;
                    }
                    break;
                }
                case FIELDATTRIBUTE.OIL: {
                    if (this.moduleOil) {
                        this.isInteracting = true;
                        this.collectsOil = true;
                    }

                    break;
                }
                case FIELDATTRIBUTE.WATER: {
                    if (!this.moduleHovering) {
                        this.moveToPreviousField();
                    }
                    break;
                }
                case FIELDATTRIBUTE.WRECKAGE: {
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

        moveToPreviousField(): void {
            this.mtxLocal.translation = new ƒ.Vector3(this.previousField.x, this.previousField.y, 0);
        }

        collectRessource(_tile: WorldMapTile): void {
            if (this.collectsBioMass == true) {
                this.bioMassLoaded += increaseBioMass;
                _tile.ressourceAmount -= increaseBioMass;
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
                this.oreLoaded += increaseMetal;
                _tile.ressourceAmount -= increaseMetal;
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
                this.oilLoaded += increaseOil;
                _tile.ressourceAmount -= increaseOil;
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
                this.scrapLoaded += increaseScrap;
                _tile.ressourceAmount -= increaseScrap;
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

        returnTimer(): void {
            this.isWaiting = true;
            ƒ.Time.game.setTimer(6000, 1, () => {
                this.returnToBase();
            });
        }

        returnToBase(): void {
            this.isInteracting = false;
            this.mtxLocal.translation = playerBase;
            ressourceBioMass += this.bioMassLoaded;
            this.bioMassLoaded = 0;
            ressourceMetal += this.oreLoaded;
            this.oreLoaded = 0;
            ressourceOil += this.oilLoaded;
            this.oilLoaded = 0;
            ressourceScrap += this.scrapLoaded;
            this.scrapLoaded = 0;
            if (!this.isAutomated) {
                this.isWaiting = true;
            } else {
                this.isWaiting = false;
            }
        }

        fightEnemy(): void {
            if (this.moduleRetreat) {

                this.moveToPreviousField();
            } else {
                let newEnemy: Enemy = new Enemy(5);
                if (this.damageValue > newEnemy.damageOfEnemy) {
                    this.isInteracting = false;
                } else {
                    this.robotAlive = false;
                }
            }
        }
    }

    export function createRobot(): void {
        newRobot = new Robot("Robot #" + (robots.getChildren().length + 1), new ƒ.Vector2(worldSize / 2, worldSize / 2));
        robots.addChild(newRobot);
    }

    export function spawnRobot(robot: Robot): void {
        if (ressourceScrap >= 30 && ressourceBioMass >= 300) {
            ressourceScrap -= 30;
            ressourceBioMass -= 300;
        } else {
            removeRobot(robot);
        }
    }

    export function removeRobot(robot: Robot): void {
        robots.removeChild(robot);
        document.getElementById("Robots").removeChild(robot.robotUI);
    }

    function activateRobot(robot: Robot): void {
        robot.isWaiting = false;
    }

    function disassembleRobot(robot: Robot): void {
        removeRobot(robot);
        ressourceScrap += 25;
    }

    export function setCollectionModule(robot: Robot, module: string): void {
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

    export function setFightMode(robot: Robot, module: string): void {
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

    export function setAutoMode(robot: Robot): void {
        if (robot.isAutomated == true) {
            robot.isAutomated = false;
            console.log("i am in non-auto mode");
        } else if (robot.isAutomated == false) {
            robot.isAutomated = true;
            console.log("i am in auto mode");
        }
    }

    export function setHoverMode(robot: Robot): void {
        if (robot.moduleHovering) {
            robot.moduleHovering = false;
        }
        if (!robot.moduleHovering) {
            robot.moduleHovering = true;
        }
    }
}