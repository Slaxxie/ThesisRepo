namespace RoboGameNamespace {
    // tslint:disable: no-any
    export class StoryHandler {
        public storyUI: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        public storyImage: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        public story: any;
        public chapter: any;
        constructor() {
            this.loadStory();
            
        }
        //tester
        async loadStory(): Promise<void> {
            this.story = await (await fetch("Story.json")).json();
            console.log("Story loaded");
            this.buildStory();
        }

        playStory(): void {
            this.buildStory();
            this.storyUI.style.display = "inline";
        }

        buildStory(): void {
            this.storyUI.style.display = "none";
            this.storyUI.id = "StoryUI";
            document.getElementById("StoryBox").appendChild(this.storyUI);
            this.storyImage.id = "StoryImage";
            //console.log(this.story);
            this.storyUI.appendChild(this.storyImage);
            let closeButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            this.storyUI.appendChild(closeButton);
            closeButton.id = "CloseStory";
            closeButton.textContent = "X";
            closeButton.addEventListener("click", () => { 
                this.storyUI.style.display = "none";
            });
        }

        progressStoryChapter(questStage: QUESTSTAGE): void {
            switch (questStage) {
                case QUESTSTAGE.TUTORIAL: {
                    this.chapter = this.story.tutorial; //komplette Quests einfügen in json, dann komplette Objekte herausladen, inklusive Belohnung etc, statt stgingArray
                    this.playStoryChapter();
                    break;
                }
                case QUESTSTAGE.EARLYGAME: {
                    this.chapter = this.story.earlyGame;
                    this.playStoryChapter();
                    break;
                }
                case QUESTSTAGE.MIDGAME: {
                    this.chapter = this.story.midGame;
                    this.playStoryChapter();
                    break;
                }
                case QUESTSTAGE.LATEGAME: {
                    this.chapter = this.story.lateGame;
                    this.playStoryChapter();
                    break;
                }
                case QUESTSTAGE.ENDGAME: {
                    this.chapter = this.story.endGame;
                    this.playStoryChapter();
                    break;
                }
                default: {
                    break;
                }
            }
        }

        playStoryPrologue(): void {
            this.storyUI.innerHTML = this.story.prologue.chapterContent;
            this.storyImage.src = this.story.prologue.chapterImage;
            this.playStory();
        }

        playStoryChapter(): void {
            this.storyUI.innerHTML = this.chapter.chapterContent;
            this.storyImage.src = this.chapter.chapterImage;
            this.playStory();
        }

        playStoryEpilogue(): void {
            this.storyUI.innerHTML = this.story.epilogue.chapterContent;
            this.storyImage.src = this.story.epilogue.chapterImage;
        }
    }
}