export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

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
    this.load.atlas('ice', '/assets/img/Ice/Ice.png', 'assets/img/Ice/Ice.json');
    this.load.atlas(
      'gasGiant',
      '/assets/img/GasGiant/GasGiant.png',
      'assets/img/GasGiant/GasGiant.json'
    );
    this.load.image('background2', 'assets/img/Stars/background.png');
    this.load.image('spaceship', 'assets/img/Spaceship/spaceship.png');
    this.load.image('emitter', 'assets/img/Emitter/blue.png');
  }

  create() {
    this.scene.start('MainScene');
  }
}
