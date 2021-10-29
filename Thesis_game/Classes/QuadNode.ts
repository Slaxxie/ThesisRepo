namespace RoboGame {
  import ƒ = FudgeCore;

  export class QuadNode extends ƒ.Node {
    static mesh: ƒ.MeshSprite = new ƒ.MeshSprite("Quad");
    public rect: ƒ.Rectangle;

    constructor(_name: string, _pos: ƒ.Vector2, _scale: ƒ.Vector2) {
      super(_name);
      this.rect = new ƒ.Rectangle(_pos.x, _pos.y, _scale.x, _scale.y, ƒ.ORIGIN2D.CENTER);

      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translateX(_pos.x);
      this.mtxLocal.translateY(_pos.y);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(QuadNode.mesh);
      cmpMesh.mtxPivot.scaleX(_scale.x);
      cmpMesh.mtxPivot.scaleY(_scale.y);
      
      this.addComponent(cmpMesh);
    }

    public checkCollision(_target: QuadNode): boolean {
      return this.rect.collides(_target.rect); 
    }

    public setRectPosition(): void {
      this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.y / 2;
      this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
    }
  }
}