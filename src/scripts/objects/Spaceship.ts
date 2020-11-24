import Phaser from 'phaser';
import {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  restartSpeed,
} from '../functions/SpaceshipMoves';
import { debounce } from '../functions/utils';
enum Health {
  IDLE,
  DAMAGE,
  DEAD,
}

export default class Spaceship extends Phaser.Physics.Arcade.Sprite {
  private healthState = Health.IDLE;
  private damage = 0;
  public spaceship: Spaceship;
  private _health = 3;

  get health() {
    return this._health;
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'spaceship');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setGravityY(-400);
  }

  onCollide(dir: Phaser.Math.Vector2) {
    if (this._health <= 0) {
      return;
    }
    if (this.healthState === Health.DAMAGE) {
      return;
    }

    this.setVelocity(dir.x, dir.y);

    this.healthState = Health.DAMAGE;

    --this._health;

    if (this._health <= 0) {
      this.healthState = Health.DEAD;
      this.setTint(0xff0000);
      this.setGravity(0);
      restartSpeed(this);
    }
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);

    switch (this.healthState) {
      case Health.IDLE:
        break;
      case Health.DAMAGE:
        this.damage += dt;
        if (this.damage >= 250) {
          this.healthState = Health.IDLE;
          this.damage = 0;
        }
        break;
    }
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (this.healthState === Health.DAMAGE || this.healthState === Health.DEAD) {
      return;
    }

    if (!cursors) {
      return;
    }
    if (cursors.left?.isDown) {
      debounce(moveUp(this));
      debounce(moveLeft(this));
    } else if (cursors.right?.isDown) {
      debounce(moveUp(this));
      debounce(moveRight(this));
    } else if (cursors.up?.isDown) {
      moveUp(this);
    } else if (cursors.down?.isDown) {
      moveDown(this);
    } else {
      restartSpeed(this);
    }
  }
}
