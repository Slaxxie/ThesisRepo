namespace RoboGameNamespace {
    // tslint:disable: no-any
    class StoryHandler {
        public storyUI: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        public story: any;
        public chapter: string;
        constructor() {
            this.loadStory();
            this.storyUI.className = "StoryUI";
            document.getElementById("StoryBox").appendChild(this.storyUI);
            this.storyUI.style.display = "none";
        }

        async loadStory(): Promise<void> {
            this.story = await (await fetch("Quests.json")).json();
        }

        playStory(): void {
            this.storyUI.style.display = "inline";
        }
        progressChapter(questStage: QUESTSTAGE): void {
            switch (questStage) {
                case QUESTSTAGE.TUTORIAL: {
                    this.chapter = this.story.tutorial.chapterContent; //komplette Quests einfügen in json, dann komplette Objekte herausladen, inklusive Belohnung etc, statt stgingArray
                    break;
                }
                case QUESTSTAGE.EARLYGAME: {
                    this.chapter = this.story.earlyGame.chapterContent;
                    break;
                }
                case QUESTSTAGE.MIDGAME: {
                    this.chapter = this.story.midGame.chapterContent;
                    break;
                }
                case QUESTSTAGE.LATEGAME: {
                    this.chapter = this.story.lateGame.chapterContent;
                    break;
                }
                case QUESTSTAGE.ENDGAME: {
                    this.chapter = this.story.endGame.chapterContent;
                    break;
                }
                default: {
                    break;
                }
            }
        }
        playPrologue(): void {
            
        }
    }
}