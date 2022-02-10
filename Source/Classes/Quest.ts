namespace RoboGameNamespace {
    export class Quest {
        public questTitle: string;
        public instruction: string;
        public learningTopic: string;
        public requirements: string;
        public reqRessource: string;
        public reqRessourceAmount: number;
        public reqRobotAmount: number;
        public reqRiddleAmount: number;
        public reqModule: string;
        public evaluateReward: string;
        public reward: string;
        constructor(_questTitle: string, _instruction: string, _learningTopic: string, _requirements: string, _reqRessource: string, _reqRessourceAmount: number, _reqRobotAmount: number, _reqRiddleAmount: number, _reqModule: string, _reward: string, _evaluateReward: string) {
            this.questTitle = _questTitle;
            this.instruction = _instruction;
            this.learningTopic = _learningTopic;
            this.requirements = _requirements;
            this.reqRessource = _reqRessource;
            this.reqRessourceAmount = _reqRessourceAmount;
            this.reqRobotAmount = _reqRobotAmount;
            this.reqRiddleAmount = _reqRiddleAmount;
            this.reqModule = _reqModule;
            this.reward = _reward;
            this.evaluateReward = _evaluateReward;
        }

        checkCollectedRessource(_ressource: string, _amountRequired: number): boolean {
            let checker: boolean = false;
            switch (_ressource) {
                case "biomass": {
                    if (ressourceBioMass >= _amountRequired) {
                        checker = true;
                        break;
                    } else {
                        checker = false;
                    }
                }
                case "metal": {
                    if (ressourceMetal >= _amountRequired) {
                        checker = true;
                        break;
                    } else {
                        checker = false;
                    }
                }
                case "oil": {
                    if (ressourceOil >= _amountRequired) {
                        checker = true;
                        break;
                    } else {
                        checker = false;
                    }
                }
                case "scrap": {
                    if (ressourceScrap >= _amountRequired) {
                        checker = true;
                        break;
                    } else {
                        checker = false;
                    }
                }
            }
            return checker;

        }

        checkInstalledModule(_moduleRequired: string): boolean {
            let checker: boolean = false;
            for (let robot of robots.getChildren() as Robot[]) {
                switch (_moduleRequired) {
                    case "moduleLumberjack": {
                        if (robot.moduleLumberjack) {
                            checker = true;
                            break;
                        } else {
                            checker = false;
                        }
                    }
                    case "moduleMiner": {
                        if (robot.moduleMiner) {
                            checker = true;
                            break;
                        } else {
                            checker = false;
                        }
                    }
                    case "moduleOil": {
                        if (robot.moduleOil) {
                            checker = true;
                            break;
                        } else {
                            checker = false;
                        }
                    }
                    case "moduleScrapper": {
                        if (robot.moduleScrapper) {
                            checker = true;
                            break;
                        } else {
                            checker = false;
                        }
                    }
                    case "moduleFighter": {
                        if (robot.moduleFighter) {
                            checker = true;
                            break;
                        } else {
                            checker = false;
                        }
                    }
                    case "moduleRetreat": {
                        if (robot.moduleRetreat) {
                            checker = true;
                            break;
                        } else {
                            checker = false;
                        }
                    }
                    case "moduleHovering": {
                        if (robot.moduleHovering) {
                            checker = true;
                            break;
                        } else {
                            checker = false;
                        }
                    }
                    case "notRequired": {
                        checker = true;
                        break;
                    }
                    default:
                        break;
                }
                if (checker) {
                    break;
                }
            }
            return checker;
        }

        checkAmountOfRobots(_amountRequired: number): boolean {
            if (robots.getChildren().length >= _amountRequired) {
                return true;
            } else {
                return false;
            }
        }

        checkAmountOfRiddlesSolved(_amountRequired: number): boolean {
            if (riddleCounter >= _amountRequired) {
                return true;
            } else {
                return false;
            }
        }
    }
}