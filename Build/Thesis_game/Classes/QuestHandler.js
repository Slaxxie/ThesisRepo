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
        index = 0; //hochzählen, wenn quest abgeschlossen
        quests;
        questArray;
        constructor() {
            this.loadQuests();
        }
        async loadQuests() {
            this.quests = await (await fetch("Quests.json")).json();
            this.progressChapter(RoboGameNamespace.currentQuestStage);
        }
        createCurrentQuest() {
            currentQuest = new RoboGameNamespace.Quest(this.questArray[this.index].questTitle, this.questArray[this.index].instruction, this.questArray[this.index].learningTopic, this.questArray[this.index].requirements, this.questArray[this.index].evaluateRequirement[0].ressource, this.questArray[this.index].evaluateRequirement[0].ressourceAmountRequired, this.questArray[this.index].evaluateRequirement[0].robotAmountRequired, this.questArray[this.index].evaluateRequirement[0].riddleAmountRequired, this.questArray[this.index].evaluateRequirement[0].moduleRequired, this.questArray[this.index].reward, this.questArray[this.index].evaluateReward, this.questArray[this.index].chapterFinal);
            this.buildQuestHTML(currentQuest);
        }
        buildQuestHTML(currentQuest) {
            console.log(currentQuest);
            this.questUI.className = "QuestUI";
            this.questImage.id = "QuestImage";
            this.questImage.src = currentQuest.learningTopic;
            document.getElementById("QuestMenu").appendChild(this.questUI);
            this.questUI.innerHTML = currentQuest.questTitle;
            this.questUI.innerHTML += "<br/>";
            this.questUI.innerHTML += currentQuest.instruction;
            this.questUI.innerHTML += "<br/>";
            this.questUI.innerHTML += "Bedingungen: " + currentQuest.requirements;
            this.questUI.innerHTML += "<br/>";
            this.questUI.innerHTML += "Belohnung: " + currentQuest.reward;
            this.questUI.innerHTML += "<br/>";
            let finishQuest = document.createElement("button");
            this.questUI.appendChild(finishQuest);
            finishQuest.textContent = "finish Quest";
            finishQuest.id = "finishQuest";
            document.getElementById("finishQuest").addEventListener("click", () => {
                if (this.checkQuest()) {
                    this.finishQuest();
                }
                else {
                    console.log("noch mehr biomasse");
                }
            });
            let showHide = document.createElement("button");
            this.questUI.appendChild(showHide);
            let imageContainer = document.createElement("div");
            imageContainer.className = "ImageContainer";
            imageContainer.style.display = "none";
            showHide.textContent = "Show/Hide";
            this.questUI.appendChild(imageContainer);
            imageContainer.appendChild(this.questImage);
            showHide.addEventListener("click", () => {
                console.log("click");
                if (imageContainer.style.display == "none") {
                    imageContainer.style.display = "block";
                }
                else if (imageContainer.style.display == "block") {
                    imageContainer.style.display = "none";
                }
            });
        }
        finishQuest() {
            if (currentQuest.chapterFinal && RoboGameNamespace.currentQuestStage == QUESTSTAGE.ENDGAME) {
                this.playEpilogue();
            }
            else if (currentQuest.chapterFinal) {
                RoboGameNamespace.currentQuestStage++;
                this.index = 0;
                this.progressChapter(RoboGameNamespace.currentQuestStage);
            }
            else {
                this.index++;
                this.createCurrentQuest();
            }
        }
        progressChapter(questStage) {
            switch (questStage) {
                case QUESTSTAGE.TUTORIAL: {
                    this.questArray = this.quests.tutorial;
                    this.createCurrentQuest();
                    break;
                }
                case QUESTSTAGE.EARLYGAME: {
                    this.questArray = this.quests.earlyGame;
                    this.createCurrentQuest();
                    break;
                }
                case QUESTSTAGE.MIDGAME: {
                    this.questArray = this.quests.midGame;
                    this.createCurrentQuest();
                    break;
                }
                case QUESTSTAGE.LATEGAME: {
                    this.questArray = this.quests.lateGame;
                    this.createCurrentQuest();
                    break;
                }
                case QUESTSTAGE.ENDGAME: {
                    this.questArray = this.quests.endGame;
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
        }
        checkQuest() {
            if (currentQuest.checkCollectedRessource(currentQuest.reqRessource, currentQuest.reqRessourceAmount) &&
                currentQuest.checkInstalledModule(currentQuest.reqModule) &&
                currentQuest.checkAmountOfRobots(currentQuest.reqRobotAmount) &&
                currentQuest.checkAmountOfRiddlesSolved(currentQuest.reqRiddleAmount)) {
                return true;
            }
            else
                return false;
        }
    }
    RoboGameNamespace.QuestHandler = QuestHandler;
})(RoboGameNamespace || (RoboGameNamespace = {}));
//# sourceMappingURL=QuestHandler.js.map