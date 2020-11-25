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
        x: 10,
        y: 10,
        stepX: 35,
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
