"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    class Quest {
        questTitle;
        instruction;
        learningTopic;
        requirements;
        reqRessource;
        reqRessourceAmount;
        reqRobotAmount;
        reqRiddleAmount;
        reqModule;
        evaluateReward;
        reward;
        chapterFinal;
        constructor(_questTitle, _instruction, _learningTopic, _requirements, _reqRessource, _reqRessourceAmount, _reqRobotAmount, _reqRiddleAmount, _reqModule, _evaluateReward, _reward, _chapterFinal) {
            this.questTitle = _questTitle;
            this.instruction = _instruction;
            this.learningTopic = _learningTopic;
            this.requirements = _requirements;
            this.reqRessource = _reqRessource;
            this.reqRessourceAmount = _reqRessourceAmount;
            this.reqRobotAmount = _reqRobotAmount;
            this.reqRiddleAmount = _reqRiddleAmount;
            this.reqModule = _reqModule;
            this.evaluateReward = _evaluateReward;
            this.reward = _reward;
            this.chapterFinal = _chapterFinal;
        }
        checkCollectedRessource(_ressource, _amountRequired) {
            let checker = false;
            switch (_ressource) {
                case "biomass": {
                    if (RoboGameNamespace.ressourceBioMass >= _amountRequired) {
                        checker = true;
                        break;
                    }
                    else {
                        checker = false;
                    }
                }
                case "ore": {
                    if (RoboGameNamespace.ressourceOre >= _amountRequired) {
                        checker = true;
                        break;
                    }
                    else {
                        checker = false;
                    }
                }
                case "oil": {
                    if (RoboGameNamespace.ressourceOil >= _amountRequired) {
                        checker = true;
                        break;
                    }
                    else {
                        checker = false;
                    }
                }
                case "scrap": {
                    if (RoboGameNamespace.ressourceScrap >= _amountRequired) {
                        checker = true;
                        break;
                    }
                    else {
                        checker = false;
                    }
                }
            }
            return checker;
        }
        checkInstalledModule(_moduleRequired) {
            let checker = false;
            for (let robot of RoboGameNamespace.robots.getChildren()) {
                switch (_moduleRequired) {
                    case "moduleLumberjack": {
                        if (robot.moduleLumberjack) {
                            checker = true;
                            break;
                        }
                        else {
                            checker = false;
                        }
                    }
                    case "moduleMiner": {
                        if (robot.moduleMiner) {
                            checker = true;
                            break;
                        }
                        else {
                            checker = false;
                        }
                    }
                    case "moduleOil": {
                        if (robot.moduleOil) {
                            checker = true;
                            break;
                        }
                        else {
                            checker = false;
                        }
                    }
                    case "moduleScrapper": {
                        if (robot.moduleScrapper) {
                            checker = true;
                            break;
                        }
                        else {
                            checker = false;
                        }
                    }
                    case "moduleFighter": {
                        if (robot.moduleFighter) {
                            checker = true;
                            break;
                        }
                        else {
                            checker = false;
                        }
                    }
                    case "moduleRetreat": {
                        if (robot.moduleRetreat) {
                            checker = true;
                            break;
                        }
                        else {
                            checker = false;
                        }
                    }
                    case "moduleHovering": {
                        if (robot.moduleHovering) {
                            checker = true;
                            break;
                        }
                        else {
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
        checkAmountOfRobots(_amountRequired) {
            if (RoboGameNamespace.robots.getChildren().length >= _amountRequired) {
                return true;
            }
            else {
                return false;
            }
        }
        checkAmountOfRiddlesSolved(_amountRequired) {
            if (RoboGameNamespace.riddleCounter >= _amountRequired) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    RoboGameNamespace.Quest = Quest;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=Quest.js.map