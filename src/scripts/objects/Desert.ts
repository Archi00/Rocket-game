import Phaser from 'phaser';

export default class Desert extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'desert');
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
  onCollide(dir: Phaser.Math.Vector2) {
    this.setVelocity(dir.x, dir.y);
    this.disableBody(true, true);
  }
}
