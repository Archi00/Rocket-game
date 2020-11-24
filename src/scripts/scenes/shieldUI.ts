import Phaser from 'phaser';
import { sceneEvents } from '../Events/MainEvent';
export default class ShieldUI extends Phaser.Scene {
  private shields: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'shieldUI' });
  }

  create() {
    this.shields = this.add.group({
      classType: Phaser.GameObjects.Image,
    });

    this.shields.createMultiple({
      key: 'emitter',
      setScale: { x: 0.2, y: 0.2 },
      quantity: 3,
      setXY: {
        x: this.cameras.main.width * 0.5,
        y: this.cameras.main.height - 10,
        stepX: 40,
      },
    });
    sceneEvents.on('shield-state', this.onShieldStateChange, this);
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off('shield-state', this.onShieldStateChange, this);
    });
  }

  private onShieldStateChange(health: number) {
    this.shields.children.each((go, idx) => {
      const shield = go as Phaser.GameObjects.Image;
      if (idx < health) {
        shield.visible = true;
      } else {
        shield.visible = false;
      }
    });
  }
}
