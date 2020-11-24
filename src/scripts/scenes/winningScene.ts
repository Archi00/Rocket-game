import Phaser from 'phaser';
import { createBarrenAnims } from '../anims/barrenAnims';
import { createTerranAnims } from '../anims/terranAnims';
import Barren from '../objects/Barren';
import Terran from '../objects/Terran';
export default class WinningScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WinningScene' });
  }
  private terran: Terran;
  private barren: Barren;
  preload() {
    this.load.atlas(
      'terran',
      'assets/img/Terran/Terran.png',
      '/assets/img/Terran/Terran.json'
    );
    this.load.atlas(
      'barren',
      'assets/img/Barren/Barren.png',
      '/assets/img/Barren/Barren.json'
    );
    this.load.atlas(
      'desert',
      '/assets/img/Desert/Desert.png',
      'assets/img/Desert/Desert.json'
    );
    this.load.atlas('lava', '/assets/img/Lava/Lava.png', 'assets/img/Lava/Lava.json');
    this.load.image('background', 'assets/img/Stars/strars.png');
    this.load.image('background2', 'assets/img/Stars/background.png');
    this.load.image('spaceship', 'assets/img/Spaceship/spaceship.png');
  }

  create() {
    this.add
      .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background2')
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    this.add
      .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    this.add
      .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
      .setScale(3);
    this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'background'
    );

    this.terran = new Terran(this, 0, this.cameras.main.height).setGravityY(-400);
    this.barren = new Barren(this, this.cameras.main.width, 0)
      .setGravityY(-400)
      .setImmovable(true);
    createTerranAnims(this.anims);
    createBarrenAnims(this.anims);
    this.add.text(
      this.cameras.main.width * 0.43,
      this.cameras.main.height * 0.5,
      'Well done!',
      {
        fontSize: '32px',
      }
    );
    this.add.text(
      this.cameras.main.width / 2.7,
      this.cameras.main.height * 0.6,
      `Want to try again?`,
      {
        fontSize: '32px',
      }
    );

    this.input.keyboard.on('keydown-' + 'SPACE', () => this.scene.start('PreloadScene'));
  }

  update() {
    this.barren.anims.play('barrenAnims', true);
    this.terran.anims.play('terranAnims', true);
  }
}
