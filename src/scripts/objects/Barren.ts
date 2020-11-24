import Phaser from 'phaser';

export default class Barren extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'barren');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(2);
  }
  onCollide(dir: Phaser.Math.Vector2) {
    this.setVelocity(dir.x, dir.y);
  }
}
