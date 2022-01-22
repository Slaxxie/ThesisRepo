namespace RoboGameNamespace {
    // tslint:disable: no-any
    export class StoryHandler {
        public storyUI: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        public storyImage: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        public story: any;
        public chapter: any;
        public header: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        public image: HTMLImageElement = <HTMLImageElement>document.createElement("img");
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
            this.storyUI.style.display = "block";
            this.saveStoryIntoLog();
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
        
        saveStoryIntoLog(): void {
            let newChapter: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            newChapter.appendChild(this.header);
            newChapter.appendChild(this.image);
            document.getElementById("logbook-story").appendChild(newChapter);
            let showHide: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            newChapter.appendChild(showHide);
            showHide.textContent = "Show/Hide";
            let imageContainer: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            imageContainer.id = "ImageContainer";
            imageContainer.style.display = "none";
            imageContainer.appendChild(this.image);
            newChapter.appendChild(imageContainer);
            showHide.addEventListener("click", () => {
                console.log("click");
                if (imageContainer.style.display == "none") {
                    imageContainer.style.display = "block";
                } else if (imageContainer.style.display == "block") {
                    imageContainer.style.display = "none";
                }
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
            this.header.innerHTML = this.story.prologue.chapterContent;
            this.image.src = this.story.prologue.chapterImage;
            
        }
        
        playStoryChapter(): void {
            this.storyUI.innerHTML = this.chapter.chapterContent;
            this.storyImage.src = this.chapter.chapterImage;
            this.playStory();
            this.header.innerHTML = this.chapter.chapterContent;
            this.image.src = this.chapter.chapterImage;
            
        }
        
        playStoryEpilogue(): void {
            this.storyUI.innerHTML = this.story.epilogue.chapterContent;
            this.storyImage.src = this.story.epilogue.chapterImage;
            this.playStory();
            this.header.innerHTML = this.story.epilogue.chapterContent;
            this.image.src = this.story.epilogue.chapterImage;
            
        }
    }
}