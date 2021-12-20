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
        public index: number = 0; //hochzählen, wenn quest abgeschlossen
        public quests: any;
        public questArray: any[];
        constructor() {
            this.loadQuests();
        }

        async loadQuests(): Promise<void> {
            this.quests = await (await fetch("Quests.json")).json();
            this.progressQuestChapter(currentQuestStage);
        }

        createCurrentQuest(): void {
            currentQuest = new Quest(
                this.questArray[this.index].questTitle,
                this.questArray[this.index].instruction,
                this.questArray[this.index].learningTopic,
                this.questArray[this.index].requirements,
                this.questArray[this.index].evaluateRequirement[0].ressource,
                this.questArray[this.index].evaluateRequirement[0].ressourceAmountRequired,
                this.questArray[this.index].evaluateRequirement[0].robotAmountRequired,
                this.questArray[this.index].evaluateRequirement[0].riddleAmountRequired,
                this.questArray[this.index].evaluateRequirement[0].moduleRequired,
                this.questArray[this.index].reward,
                this.questArray[this.index].evaluateReward,
                this.questArray[this.index].chapterFinal
            );
            this.buildQuestHTML(currentQuest);
        }

        buildQuestHTML(currentQuest: Quest): void {
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
            let finishQuest: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            this.questUI.appendChild(finishQuest);
            finishQuest.textContent = "finish Quest";
            finishQuest.id = "finishQuest";
            document.getElementById("finishQuest").addEventListener("click", () => { 
                if (this.checkQuest()) {
                    this.finishQuest();
                } else {
                    console.log("noch mehr biomasse");
                }
            });
            let showHide: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            this.questUI.appendChild(showHide);
            let imageContainer: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            imageContainer.className = "ImageContainer";
            imageContainer.style.display = "none";
            showHide.textContent = "Show/Hide";
            this.questUI.appendChild(imageContainer);
            imageContainer.appendChild(this.questImage);
            showHide.addEventListener("click", () => {
                console.log("click");
                if (imageContainer.style.display == "none") {
                    imageContainer.style.display = "block";
                } else if (imageContainer.style.display == "block") {
                    imageContainer.style.display = "none";
                }
            });
            let hideQuest: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            this.questUI.appendChild(hideQuest);
            hideQuest.textContent = "X";
            hideQuest.id = "HideQuestButton";
            hideQuest.addEventListener("click", () => {
                document.getElementById("QuestMenu").style.display = "none";
            });


        }

        finishQuest(): void {
            if (currentQuest.chapterFinal && currentQuestStage == QUESTSTAGE.ENDGAME) {
                this.playEpilogue();
            } else if (currentQuest.chapterFinal) {
                currentQuestStage++;
                this.index = 0;
                this.progressQuestChapter(currentQuestStage);
                storyHandler.progressStoryChapter(currentQuestStage);
            } else {
                this.index++;
                this.createCurrentQuest();
            }
        }

        progressQuestChapter(questStage: QUESTSTAGE): void {
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
        playEpilogue(): void {
            console.log("Finito"); //mehr als n console.log
            storyHandler.playStoryEpilogue();
        }

        checkQuest(): boolean {
            if (
                currentQuest.checkCollectedRessource(currentQuest.reqRessource, currentQuest.reqRessourceAmount) &&
                currentQuest.checkInstalledModule(currentQuest.reqModule) &&
                currentQuest.checkAmountOfRobots(currentQuest.reqRobotAmount) &&
                currentQuest.checkAmountOfRiddlesSolved(currentQuest.reqRiddleAmount)
            ) {
                return true;
            } else
                return false;
        }
    }
}