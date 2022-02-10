"use strict";
var RoboGameNamespace;
(function (RoboGameNamespace) {
    // tslint:disable: no-any
    let QUESTSTAGE;
    (function (QUESTSTAGE) {
        QUESTSTAGE[QUESTSTAGE["TUTORIAL"] = 0] = "TUTORIAL";
        QUESTSTAGE[QUESTSTAGE["EARLYGAME"] = 1] = "EARLYGAME";
        QUESTSTAGE[QUESTSTAGE["MIDGAME"] = 2] = "MIDGAME";
        QUESTSTAGE[QUESTSTAGE["LATEGAME"] = 3] = "LATEGAME";
        QUESTSTAGE[QUESTSTAGE["ENDGAME"] = 4] = "ENDGAME";
    })(QUESTSTAGE = RoboGameNamespace.QUESTSTAGE || (RoboGameNamespace.QUESTSTAGE = {}));
    let currentQuest;
    class QuestHandler {
        questUI = document.createElement("div");
        questImage = document.createElement("img");
        quests;
        chapterQuest;
        questTitleTemp = document.createElement("div");
        questInstructionTemp = document.createElement("div");
        questImageTemp = document.createElement("img");
        constructor() {
            this.loadQuests();
        }
        async loadQuests() {
            this.quests = await (await fetch("Quests.json")).json();
            this.progressQuestChapter(RoboGameNamespace.currentQuestStage);
        }
        createCurrentQuest() {
            currentQuest = new RoboGameNamespace.Quest(this.chapterQuest[0].questTitle, this.chapterQuest[0].instruction, this.chapterQuest[0].learningTopic, this.chapterQuest[0].requirements, this.chapterQuest[0].evaluateRequirement[0].ressource, this.chapterQuest[0].evaluateRequirement[0].ressourceAmountRequired, this.chapterQuest[0].evaluateRequirement[0].robotAmountRequired, this.chapterQuest[0].evaluateRequirement[0].riddleAmountRequired, this.chapterQuest[0].evaluateRequirement[0].moduleRequired, this.chapterQuest[0].reward, this.chapterQuest[0].evaluateReward);
            this.buildQuestHTML(currentQuest);
        }
        buildQuestHTML(currentQuest) {
            this.questUI.id = "questUI";
            this.questImage.id = "questImage";
            this.questImage.src = currentQuest.learningTopic;
            this.questImageTemp.src = currentQuest.learningTopic;
            this.questImageTemp.id = "tempQuestImage";
            document.getElementById("questMenu").appendChild(this.questUI);
            this.questUI.innerHTML = currentQuest.questTitle;
            this.questUI.innerHTML += "<br/>";
            this.questUI.innerHTML += currentQuest.instruction;
            this.questUI.innerHTML += "<br/>";
            this.questUI.innerHTML += "Bedingungen: " + currentQuest.requirements;
            this.questUI.innerHTML += "<br/>";
            this.questUI.innerHTML += "Belohnung: " + currentQuest.reward;
            this.questUI.innerHTML += "<br/>";
            this.questUI.innerHTML += "<br/>";
            this.questTitleTemp.innerHTML = currentQuest.questTitle;
            this.questInstructionTemp.innerHTML = currentQuest.instruction;
            let finishQuest = document.createElement("button");
            this.questUI.appendChild(finishQuest);
            finishQuest.textContent = "finish Quest";
            finishQuest.id = "finishQuest";
            document.getElementById("finishQuest").addEventListener("click", () => {
                console.log(RoboGameNamespace.questContentFinished);
                console.log(this.checkQuest());
                console.log("works1");
                if (this.checkQuest() == true) {
                    console.log("works2");
                    this.finishQuest();
                    document.getElementById("blocker").style.display = "none";
                }
                console.log("works3");
            });
            let showHide = document.createElement("button");
            this.questUI.appendChild(showHide);
            let imageContainer = document.createElement("div");
            imageContainer.id = "questImageContainer";
            imageContainer.style.display = "none";
            showHide.textContent = "Show/Hide";
            showHide.id = "showHideQuest";
            let hideQuest = document.createElement("button");
            hideQuest.textContent = "X";
            hideQuest.id = "hideQuestButton";
            this.questUI.appendChild(hideQuest);
            let closeImage = document.createElement("button");
            closeImage.id = "questCloseImage";
            closeImage.textContent = "close image";
            imageContainer.appendChild(closeImage);
            this.questUI.appendChild(imageContainer);
            imageContainer.appendChild(this.questImage);
            showHide.addEventListener("click", () => {
                if (imageContainer.style.display == "none") {
                    imageContainer.style.display = "block";
                }
                else if (imageContainer.style.display == "block") {
                    imageContainer.style.display = "none";
                }
            });
            hideQuest.addEventListener("click", () => {
                document.getElementById("questMenu").style.display = "none";
                document.getElementById("blocker").style.display = "none";
            });
            closeImage.addEventListener("click", () => {
                imageContainer.style.display = "none";
            });
            this.saveQuestIntoLog();
        }
        saveQuestIntoLog() {
            let newChapter = document.createElement("div");
            newChapter.appendChild(this.questTitleTemp);
            newChapter.appendChild(this.questInstructionTemp);
            newChapter.appendChild(this.questImageTemp);
            document.getElementById("logbook-quest").appendChild(newChapter);
            let showHide = document.createElement("button");
            newChapter.appendChild(showHide);
            showHide.id = "showHideQuest";
            showHide.textContent = "Show/Hide";
            let imageContainer = document.createElement("div");
            imageContainer.id = "questImageContainerLog";
            imageContainer.style.display = "none";
            newChapter.appendChild(imageContainer);
            let closeImage = document.createElement("button");
            imageContainer.appendChild(closeImage);
            imageContainer.appendChild(this.questImageTemp);
            closeImage.id = "questCloseImage";
            closeImage.textContent = "close image";
            showHide.addEventListener("click", () => {
                if (imageContainer.style.display == "none") {
                    imageContainer.style.display = "block";
                }
                else if (imageContainer.style.display == "block") {
                    imageContainer.style.display = "none";
                }
            });
            closeImage.addEventListener("click", () => {
                imageContainer.style.display = "none";
            });
        }
        finishQuest() {
            if (RoboGameNamespace.currentQuestStage == QUESTSTAGE.ENDGAME) {
                this.playEpilogue();
            }
            else {
                RoboGameNamespace.currentQuestStage++;
                this.progressQuestChapter(RoboGameNamespace.currentQuestStage);
                RoboGameNamespace.questIndex++;
                RoboGameNamespace.storyHandler.progressStoryChapter(RoboGameNamespace.currentQuestStage);
                this.rewardQuest();
            }
        }
        rewardQuest() {
            let ressourceKey = Object.keys(currentQuest.evaluateReward[0]);
            RoboGameNamespace.ressourceBioMass += parseInt(currentQuest.evaluateReward[0][ressourceKey[0]]);
            RoboGameNamespace.ressourceMetal += parseInt(currentQuest.evaluateReward[0][ressourceKey[1]]);
            RoboGameNamespace.ressourceOil += parseInt(currentQuest.evaluateReward[0][ressourceKey[2]]);
            RoboGameNamespace.ressourceScrap += parseInt(currentQuest.evaluateReward[0][ressourceKey[3]]);
        }
        progressQuestChapter(questStage) {
            RoboGameNamespace.riddleBooleanTemp = false;
            switch (questStage) {
                case QUESTSTAGE.TUTORIAL: {
                    this.chapterQuest = this.quests.tutorial;
                    this.createCurrentQuest();
                    break;
                }
                case QUESTSTAGE.EARLYGAME: {
                    this.chapterQuest = this.quests.earlyGame;
                    this.createCurrentQuest();
                    document.getElementById("improvedMovementDiv").style.zIndex = "5";
                    document.getElementById("activateImprovedWayfinding").style.zIndex = "5";
                    break;
                }
                case QUESTSTAGE.MIDGAME: {
                    this.chapterQuest = this.quests.midGame;
                    this.createCurrentQuest();
                    break;
                }
                case QUESTSTAGE.LATEGAME: {
                    this.chapterQuest = this.quests.lateGame;
                    this.createCurrentQuest();
                    break;
                }
                case QUESTSTAGE.ENDGAME: {
                    this.chapterQuest = this.quests.endGame;
                    this.createCurrentQuest();
                    break;
                }
                default: {
                    break;
                }
            }
        }
        playEpilogue() {
            console.log("Finito"); //mehr als n console.log
            RoboGameNamespace.storyHandler.playStoryEpilogue();
        }
        checkQuest() {
            if (currentQuest.checkCollectedRessource(currentQuest.reqRessource, currentQuest.reqRessourceAmount) &&
                currentQuest.checkInstalledModule(currentQuest.reqModule) &&
                currentQuest.checkAmountOfRobots(currentQuest.reqRobotAmount) &&
                currentQuest.checkAmountOfRiddlesSolved(currentQuest.reqRiddleAmount) &&
                RoboGameNamespace.questContentFinished == true) {
                return true;
            }
            else
                return false;
        }
    }
    RoboGameNamespace.QuestHandler = QuestHandler;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=QuestHandler.js.map