"use strict";
var FudgeCore;
(function (FudgeCore) {
    /**
     * Attaches a {@link Material} to the node
     * @authors Jirka Dell'Oro-Friedl, HFU, 2019 - 2021
     */
    class ComponentMaterial extends FudgeCore.Component {
        // public mutatorCoat: MutatorForComponent;
        constructor(_material = null) {
            super();
            this.clrPrimary = FudgeCore.Color.CSS("white");
            this.clrSecondary = FudgeCore.Color.CSS("white");
            this.mtxPivot = FudgeCore.Matrix3x3.IDENTITY();
            //** support sorting of objects with transparency when rendering, render objects in the back first */
            this.sortForAlpha = false;
            this.material = _material;
            // this.mutatorCoat = _material.getCoat().getMutatorForComponent();
        }
        //#region Transfer
        serialize() {
            let serialization = {
                sortForAlpha: this.sortForAlpha,
                clrPrimary: this.clrPrimary.serialize(),
                clrSecondary: this.clrSecondary.serialize(),
                pivot: this.mtxPivot.serialize(),
                [super.constructor.name]: super.serialize(),
                idMaterial: this.material.idResource
            };
            return serialization;
        }
        async deserialize(_serialization) {
            this.material = await FudgeCore.Project.getResource(_serialization.idMaterial);
            await this.clrPrimary.deserialize(_serialization.clrPrimary);
            await this.clrSecondary.deserialize(_serialization.clrSecondary);
            this.sortForAlpha = _serialization.sortForAlpha;
            await this.mtxPivot.deserialize(_serialization.pivot);
            await super.deserialize(_serialization[super.constructor.name]);
            return this;
        }
    }
    ComponentMaterial.iSubclass = FudgeCore.Component.registerSubclass(ComponentMaterial);
    FudgeCore.ComponentMaterial = ComponentMaterial;
})(FudgeCore || (FudgeCore = {}));
//# sourceMappingURL=ComponentMaterial.js.map