import Phaser from 'phaser';

export default class Terran extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'terran');

    this.anims.play('terranAnims');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(4);
  }
}
