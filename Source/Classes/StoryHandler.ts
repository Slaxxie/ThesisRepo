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
        async loadStory(): Promise<void> {
            this.story = await (await fetch("Story.json")).json();
            this.buildStory();
        }

        playStory(): void {
            this.buildStory();
            this.storyUI.style.display = "block";
        }

        buildStory(): void {
            this.storyUI.style.display = "none";
            this.storyUI.id = "storyUI";
            document.getElementById("storyBox").appendChild(this.storyUI);
            let imageContainer: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            imageContainer.id = "storyImageContainer";
            this.storyImage.id = "storyImage";
            let closeButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            closeButton.className = "buttonDesignClass";
            this.storyUI.appendChild(closeButton);
            closeButton.id = "closeStory";
            closeButton.textContent = "X";
            closeButton.addEventListener("click", () => {
                this.storyUI.style.display = "none";
            });
            this.storyUI.appendChild(imageContainer);
            imageContainer.appendChild(this.storyImage);
            this.saveStoryIntoLog();
        }

        saveStoryIntoLog(): void {
            let newChapter: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            newChapter.appendChild(this.header);
            newChapter.appendChild(this.image);
            document.getElementById("logbook-story").appendChild(newChapter);
            let showHide: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            showHide.className = "buttonDesignClass";
            newChapter.appendChild(showHide);
            showHide.textContent = "Show/Hide";
            showHide.id = "showHideStory"
            let imageContainer: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            imageContainer.id = "storyImageContainerLog";
            imageContainer.style.display = "none";
            let closeImage: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            closeImage.className = "buttonDesignClass";
            closeImage.id = "storyCloseImage";
            imageContainer.appendChild(closeImage);
            closeImage.textContent = "close image";
            imageContainer.appendChild(this.image);
            newChapter.appendChild(imageContainer);
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

        progressStoryChapter(questStage: QUESTSTAGE): void {
            switch (questStage) {
                case QUESTSTAGE.TUTORIAL: {
                    this.chapter = this.story.tutorial; 
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
            document.getElementById("prologueDiv").style.display = "block";
            document.getElementById("nextPage").addEventListener("click", () => {
                document.getElementById("prologueImage1").style.display = "none";
                document.getElementById("prologueImage2").style.display = "block";
                document.getElementById("nextPage").style.display = "none";
                document.getElementById("closePrologue").style.display = "block";
            });
            document.getElementById("closePrologue").addEventListener("click", () => {
                document.getElementById("prologueDiv").style.display = "none";
                document.getElementById("prologueDiv").style.zIndex = "-1";
                this.storyUI.innerHTML = this.story.prologue.chapterContent;
                this.storyImage.src = this.story.prologue.chapterImage;
                this.playStory();
                this.header.innerHTML = this.story.prologue.chapterContent;
                this.image.src = this.story.prologue.chapterImage;
            });

        }

        playStoryChapter(): void {
            this.storyUI.innerHTML = this.chapter.chapterContent;
            this.storyUI.innerHTML = "<br>";
            this.storyUI.innerHTML = "<br>";
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