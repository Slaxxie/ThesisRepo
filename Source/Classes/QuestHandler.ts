namespace RoboGameNamespace {
    // tslint:disable: no-any
    export enum QUESTSTAGE {
        TUTORIAL,
        EARLYGAME,
        MIDGAME,
        LATEGAME,
        ENDGAME
    }

    let currentQuest: Quest;

    export class QuestHandler {
        public questUI: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        public questImage: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        public quests: any;
        public chapterQuest: any;
        public questTitleTemp: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        public questInstructionTemp: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        public questImageTemp: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        constructor() {
            this.loadQuests();
        }

        async loadQuests(): Promise<void> {
            this.quests = await (await fetch("Quests.json")).json();
            this.progressQuestChapter(currentQuestStage);
        }

        createCurrentQuest(): void {
            currentQuest = new Quest(
                this.chapterQuest[0].questTitle,
                this.chapterQuest[0].instruction,
                this.chapterQuest[0].learningTopic,
                this.chapterQuest[0].requirements,
                this.chapterQuest[0].evaluateRequirement[0].ressource,
                this.chapterQuest[0].evaluateRequirement[0].ressourceAmountRequired,
                this.chapterQuest[0].evaluateRequirement[0].robotAmountRequired,
                this.chapterQuest[0].evaluateRequirement[0].riddleAmountRequired,
                this.chapterQuest[0].evaluateRequirement[0].moduleRequired,
                this.chapterQuest[0].reward,
                this.chapterQuest[0].evaluateReward
            );
            this.buildQuestHTML(currentQuest);
        }

        buildQuestHTML(currentQuest: Quest): void {

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
            this.questUI.innerHTML += "Conditions: " + currentQuest.requirements;
            this.questUI.innerHTML += "<br/>";
            this.questUI.innerHTML += "Reward: " + currentQuest.reward;
            this.questUI.innerHTML += "<br/>";
            this.questUI.innerHTML += "<br/>";
            this.questTitleTemp.innerHTML = currentQuest.questTitle;
            this.questInstructionTemp.innerHTML = currentQuest.instruction;
            let finishQuest: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            finishQuest.className = "buttonDesignClass";
            this.questUI.appendChild(finishQuest);
            finishQuest.textContent = "finish Quest";
            finishQuest.id = "finishQuest";
            document.getElementById("finishQuest").addEventListener("click", () => {
                console.log(questContentFinished);
                console.log(this.checkQuest());
                console.log("works1");
                if (this.checkQuest() == true) {
                    console.log("works2");
                    this.finishQuest();
                    document.getElementById("blocker").style.display = "none";
                }
                console.log("works3");
            });
            let showHide: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            showHide.className = "buttonDesignClass";
            this.questUI.appendChild(showHide);
            let imageContainer: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            imageContainer.id = "questImageContainer";
            imageContainer.style.display = "none";
            showHide.textContent = "Topic Content";
            showHide.id = "showHideQuest";
            let hideQuest: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            hideQuest.className = "buttonDesignClass";
            hideQuest.textContent = "X";
            hideQuest.id = "hideQuestButton";
            this.questUI.appendChild(hideQuest);
            let closeImage: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            closeImage.className = "buttonDesignClass";
            closeImage.id = "questCloseImage";
            closeImage.textContent = "close image";
            imageContainer.appendChild(closeImage);
            this.questUI.appendChild(imageContainer);
            imageContainer.appendChild(this.questImage);
            showHide.addEventListener("click", () => {
                if (imageContainer.style.display == "none") {
                    imageContainer.style.display = "block";
                } else if (imageContainer.style.display == "block") {
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

        saveQuestIntoLog(): void {
            let newChapter: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            newChapter.appendChild(this.questTitleTemp);
            newChapter.appendChild(this.questInstructionTemp);
            newChapter.appendChild(this.questImageTemp);
            document.getElementById("logbook-quest").appendChild(newChapter);
            let showHide: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            showHide.className = "buttonDesignClass";
            newChapter.appendChild(showHide);
            showHide.id = "showHideQuest";
            showHide.textContent = "Show/Hide";
            let imageContainer: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            imageContainer.id = "questImageContainerLog";
            imageContainer.style.display = "none";
            newChapter.appendChild(imageContainer);
            let closeImage: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            closeImage.className = "buttonDesignClass";
            imageContainer.appendChild(closeImage);
            imageContainer.appendChild(this.questImageTemp);
            closeImage.id = "questCloseImage";
            closeImage.textContent = "close image";
            showHide.addEventListener("click", () => {
                if (imageContainer.style.display == "none") {
                    imageContainer.style.display = "block";
                } else if (imageContainer.style.display == "block") {
                    imageContainer.style.display = "none";
                }
            });
            closeImage.addEventListener("click", () => {
                imageContainer.style.display = "none";

            });

        }

        finishQuest(): void {
            if (currentQuestStage == QUESTSTAGE.ENDGAME) {
                this.playEpilogue();
            } else {
                currentQuestStage++;
                this.progressQuestChapter(currentQuestStage);
                questIndex++;
                storyHandler.progressStoryChapter(currentQuestStage);
                this.rewardQuest();
            }
        }
        rewardQuest(): void {
            let ressourceKey: any = Object.keys(currentQuest.evaluateReward[0]);
            ressourceBioMass += parseInt(currentQuest.evaluateReward[0][ressourceKey[0]]);
            ressourceMetal += parseInt(currentQuest.evaluateReward[0][ressourceKey[1]]);
            ressourceOil += parseInt(currentQuest.evaluateReward[0][ressourceKey[2]]);
            ressourceScrap += parseInt(currentQuest.evaluateReward[0][ressourceKey[3]]);
        }

        progressQuestChapter(questStage: QUESTSTAGE): void {
            riddleBooleanTemp = false;
            switch (questStage) {
                case QUESTSTAGE.TUTORIAL: {
                    this.chapterQuest = this.quests.tutorial;
                    this.createCurrentQuest();
                    break;
                }
                case QUESTSTAGE.EARLYGAME: {
                    this.chapterQuest = this.quests.earlyGame;
                    this.createCurrentQuest();
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
        playEpilogue(): void {
            console.log("Finito"); //mehr als n console.log
            storyHandler.playStoryEpilogue();
        }

        checkQuest(): boolean {
            if (
                currentQuest.checkCollectedRessource(currentQuest.reqRessource, currentQuest.reqRessourceAmount) &&
                currentQuest.checkInstalledModule(currentQuest.reqModule) &&
                currentQuest.checkAmountOfRobots(currentQuest.reqRobotAmount) &&
                currentQuest.checkAmountOfRiddlesSolved(currentQuest.reqRiddleAmount) &&
                questContentFinished == true
            ) {
                return true;
            } else
                return false;
        }
    }
}