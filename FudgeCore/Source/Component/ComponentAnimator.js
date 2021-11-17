"use strict";
// / <reference path="../Time/Loop.ts"/>
// / <reference path="../Animation/Animation.ts"/>
var FudgeCore;
// / <reference path="../Time/Loop.ts"/>
// / <reference path="../Animation/Animation.ts"/>
(function (FudgeCore) {
    /**
     * Holds a reference to an {@link Animation} and controls it. Controls playback and playmode as well as speed.
     * @authors Lukas Scheuerle, HFU, 2019 | Jirka Dell'Oro-Friedl, HFU, 2021
     */
    class ComponentAnimator extends FudgeCore.Component {
        constructor(_animation = new FudgeCore.Animation(""), _playmode = FudgeCore.ANIMATION_PLAYMODE.LOOP, _playback = FudgeCore.ANIMATION_PLAYBACK.TIMEBASED_CONTINOUS) {
            super();
            this.scaleWithGameTime = true;
            this.#scale = 1;
            this.#previous = 0;
            //#endregion
            //#region updateAnimation
            /**
             * Updates the Animation.
             * Gets called every time the Loop fires the LOOP_FRAME Event.
             * Uses the built-in time unless a different time is specified.
             * May also be called from updateAnimation().
             */
            this.updateAnimationLoop = (_e, _time) => {
                if (this.animation.totalTime == 0)
                    return [null, 0];
                let time = _time || this.#timeLocal.get();
                if (this.playback == FudgeCore.ANIMATION_PLAYBACK.FRAMEBASED) {
                    time = this.#previous + (1000 / this.animation.fps);
                }
                let direction = this.animation.calculateDirection(time, this.playmode);
                time = this.animation.getModalTime(time, this.playmode, this.#timeLocal.getOffset());
                this.executeEvents(this.animation.getEventsToFire(this.#previous, time, this.playback, direction));
                if (this.#previous != time) {
                    this.#previous = time;
                    time = time % this.animation.totalTime;
                    let mutator = this.animation.getMutated(time, direction, this.playback);
                    if (this.node) {
                        this.node.applyAnimation(mutator);
                    }
                    return [mutator, time];
                }
                return [null, time];
            };
            /**
             * Updates the scale of the animation if the user changes it or if the global game timer changed its scale.
             */
            this.updateScale = () => {
                let newScale = this.#scale;
                if (this.scaleWithGameTime)
                    newScale *= FudgeCore.Time.game.getScale();
                this.#timeLocal.setScale(newScale);
            };
            this.animation = _animation;
            this.playmode = _playmode;
            this.playback = _playback;
            this.#timeLocal = new FudgeCore.Time();
            //TODO: update animation total time when loading a different animation?
            this.animation.calculateTotalTime();
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, () => this.activate(false));
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, () => {
                this.node.addEventListener("childRemove" /* CHILD_REMOVE */, () => this.activate(false));
                this.activate(true);
            });
        }
        #scale;
        #timeLocal;
        #previous;
        set scale(_scale) {
            this.#scale = _scale;
            this.updateScale();
        }
        get scale() {
            return this.#scale;
        }
        /**
         * Returns the current sample time of the animation
         */
        get time() {
            return this.#timeLocal.get() % this.animation.totalTime;
        }
        activate(_on) {
            super.activate(_on);
            if (!this.node)
                return;
            if (_on) {
                FudgeCore.Time.game.addEventListener("timeScaled" /* TIME_SCALED */, this.updateScale);
                this.node.addEventListener("renderPrepare" /* RENDER_PREPARE */, this.updateAnimationLoop);
            }
            else {
                FudgeCore.Time.game.addEventListener("timeScaled" /* TIME_SCALED */, this.updateScale);
                this.node.removeEventListener("renderPrepare" /* RENDER_PREPARE */, this.updateAnimationLoop);
            }
        }
        /**
         * Jumps to a certain time in the animation to play from there.
         */
        jumpTo(_time) {
            this.#timeLocal.set(_time);
            this.#previous = _time;
            _time = _time % this.animation.totalTime;
            let mutator = this.animation.getMutated(_time, this.animation.calculateDirection(_time, this.playmode), this.playback);
            this.node.applyAnimation(mutator);
        }
        /**
         * Jumps to a certain label in the animation if defined
         */
        jumpToLabel(_label) {
            let time = this.animation.labels[_label];
            if (time)
                this.jumpTo(time);
        }
        /**
         * Forces an update of the animation from outside. Used in the ViewAnimation. Shouldn't be used during the game.
         * @param _time the (unscaled) time to update the animation with.
         * @returns a Tupel containing the Mutator for Animation and the playmode corrected time.
         */
        updateAnimation(_time) {
            return this.updateAnimationLoop(null, _time);
        }
        //#region transfer
        serialize() {
            let serialization = super.serialize();
            serialization.idAnimation = this.animation.idResource;
            serialization.playmode = this.playmode;
            serialization.playback = this.playback;
            serialization.scale = this.scale;
            serialization.scaleWithGameTime = this.scaleWithGameTime;
            serialization[super.constructor.name] = super.serialize();
            return serialization;
        }
        async deserialize(_serialization) {
            await super.deserialize(_serialization[super.constructor.name]);
            this.animation = await FudgeCore.Project.getResource(_serialization.idAnimation);
            this.playback = _serialization.playback;
            this.playmode = _serialization.playmode;
            this.scale = _serialization.scale;
            this.scaleWithGameTime = _serialization.scaleWithGameTime;
            return this;
        }
        /**
         * Fires all custom events the Animation should have fired between the last frame and the current frame.
         * @param events a list of names of custom events to fire
         */
        executeEvents(events) {
            for (let i = 0; i < events.length; i++) {
                this.dispatchEvent(new Event(events[i]));
            }
        }
    }
    ComponentAnimator.iSubclass = FudgeCore.Component.registerSubclass(ComponentAnimator);
    FudgeCore.ComponentAnimator = ComponentAnimator;
})(FudgeCore || (FudgeCore = {}));
//# sourceMappingURL=ComponentAnimator.js.map