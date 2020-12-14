import Phaser from 'phaser';
import Terran from '../objects/Terran';
import { createTerranAnims } from '../anims/terranAnims';
import Barren from '../objects/Barren';
import { createBarrenAnims } from '../anims/barrenAnims';
import Spaceship from '../objects/Spaceship';
import Desert from '../objects/Desert';
import { createDesertAnims } from '../anims/desertAnims';
import { horizontalWrap, verticalWrap } from '../functions/wraps';
import Lava from '../objects/Lava';
import { createLavaAnims } from '../anims/lavaAnims';
import { sceneEvents } from '../Events/MainEvent';
import StartingScene from './startingScene';
import WinningScene from './winningScene';
import GasGiant from '../objects/GasGiant';
import Ice from '../objects/Ice';
import { createGasGiantAnims } from '../anims/gasGiantAnims';
import { createIceAnims } from '../anims/iceAnims';
import ShieldUI from '../scenes/shieldUI';
export default class MainScene extends Phaser.Scene {
  private terran: Terran;
  private barren: Barren;
  private desert: Desert;
  private lava: Lava;
  private ice: Ice;
  private gasGiant: GasGiant;
  private spaceship: Spaceship;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private particles: any;
  private rightEmitter: any;
  private leftEmitter: any;
  private deserts: any;
  private lavas: any;
  private ices: any;
  private gasGiants: any;
  private shield: any;
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  private triggerShield = (shield) => {
    shield.on = true;
    setTimeout(() => {
      shield.on = false;
    }, 100);
  };

  private barrenSpaceshipCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    if (
      this.spaceship.body.velocity.x > 50 ||
      this.spaceship.body.velocity.y > 50 ||
      this.spaceship.body.velocity.x < -50 ||
      this.spaceship.body.velocity.y < -50
    ) {
      this.scene.start('retryScene');
    } else {
      this.scene.start('WinningScene');
    }
    const barren = obj2 as Barren;

    const dx = this.spaceship.x - barren.x;
    const dy = this.spaceship.y - barren.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

    this.spaceship.onCollide(dir);
    this.barren.onCollide(dir);
  }

  private desertSpaceshipCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const desert = obj2 as Desert;

    const dx = this.spaceship.x - desert.x;
    const dy = this.spaceship.y - desert.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(5);

    this.triggerShield(this.shield);
    this.spaceship.onCollide(dir);
    this.desert.onCollide(dir);

    sceneEvents.emit('shield-state', this.spaceship.health);
  }
  private iceSpaceshipCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const ice = obj2 as Ice;

    const dx = this.spaceship.x - ice.x;
    const dy = this.spaceship.y - ice.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(5);

    this.triggerShield(this.shield);
    this.spaceship.onCollide(dir);
    this.ice.onCollide(dir);

    sceneEvents.emit('shield-state', this.spaceship.health);
  }
  private gasGiantSpaceshipCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const gasGiant = obj2 as GasGiant;

    const dx = this.spaceship.x - gasGiant.x;
    const dy = this.spaceship.y - gasGiant.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(5);

    this.triggerShield(this.shield);
    this.spaceship.onCollide(dir);
    this.gasGiant.onCollide(dir);

    sceneEvents.emit('shield-state', this.spaceship.health);
  }
  private lavaSpaceshipCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const lava = obj2 as Lava;

    const dx = this.spaceship.x - lava.x;
    const dy = this.spaceship.y - lava.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(5);

    this.triggerShield(this.shield);
    this.spaceship.onCollide(dir);
    this.lava.onCollide(dir);

    sceneEvents.emit('shield-state', this.spaceship.health);
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
    this.scene.run('shieldUI');
    this.particles = this.add.particles('emitter');
    this.deserts = this.physics.add.group({
      classType: Desert,
    });
    this.lavas = this.physics.add.group({
      classType: Lava,
    });
    this.ices = this.physics.add.group({
      classType: Ice,
    });
    this.gasGiants = this.physics.add.group({
      classType: GasGiant,
    });
    const createDeserts = () => {
      for (let i = 0; i < 5; i++) {
        let x = Math.random() * this.cameras.main.width;
        let y = Math.random() * this.cameras.main.height;

        this.desert = this.deserts
          .get(x, y, 'desert')
          .setGravityY(-400)
          .setScale(Math.random())
          .setVelocity(Math.random() * 300, Math.random() * 300);
      }
    };
    createDeserts();

    const createIces = () => {
      for (let i = 0; i < 5; i++) {
        let x = Math.random() * this.cameras.main.width;
        let y = Math.random() * this.cameras.main.height;

        this.ice = this.ices
          .get(x, y, 'ice')
          .setGravityY(-400)
          .setScale(Math.random())
          .setVelocity(Math.random() * 300, Math.random() * 300);
      }
    };
    createIces();
    const createGasGiants = () => {
      for (let i = 0; i < 5; i++) {
        let x = Math.random() * this.cameras.main.width;
        let y = Math.random() * this.cameras.main.height;

        this.gasGiant = this.gasGiants
          .get(x, y, 'gasGiant')
          .setGravityY(-400)
          .setScale(Math.random())
          .setVelocity(Math.random() * 300, Math.random() * 300);
      }
    };
    createGasGiants();
    const createLavas = () => {
      for (let i = 0; i < 5; i++) {
        let x = Math.random() * this.cameras.main.width;
        let y = Math.random() * this.cameras.main.height;

        this.lava = this.lavas
          .get(x, y, 'lava')
          .setGravityY(-400)
          .setScale(Math.random())
          .setVelocity(Math.random() * 300, Math.random() * 300);
      }
    };
    createLavas();

    this.spaceship = new Spaceship(this, 40, this.cameras.main.height / 1.05)
      .setScale(0.06)
      .setTint(0xffffff);
    this.physics.add.collider(
      this.barren,
      this.spaceship,
      this.barrenSpaceshipCollision,
      undefined,
      this
    );

    createTerranAnims(this.anims);
    createBarrenAnims(this.anims);
    createDesertAnims(this.anims);
    createLavaAnims(this.anims);
    createIceAnims(this.anims);
    createGasGiantAnims(this.anims);

    this.shield = this.add.particles('emitter');

    this.shield = this.particles.createEmitter({
      quantity: 10,
      speedX: { min: 50, max: 50 },
      speedY: { min: 50, max: 50 },
      follow: this.spaceship,
      lifespan: { min: 10, max: 100 },
      blendMode: 'ADD',
      on: false,
      scale: { start: 0.3, end: 0 },
      alpha: { start: 0.5, end: 0, ease: true },
      frequency: 0,
    });
    const direction = new Phaser.Math.Vector2(0, 0);
    direction.setToPolar(this.spaceship.rotation - 90, 1);

    const dx = -direction.x;
    const dy = -direction.y;

    const ox = dx * this.spaceship.width * 0;
    const oy = dy * this.spaceship.height * 0;
    this.rightEmitter = this.particles.createEmitter({
      quantity: 20,
      speedY: { min: 20 * -dy, max: 50 * -dy },
      speedX: { min: -10 * -dx, max: 10 * -dx },
      scale: { start: 0.05, end: 0 },
      alpha: { start: 0.5, end: 0, ease: true },
      blendMode: 'ADD',
      on: false,
      accelerationY: 1000 * -dy,
      accelerationX: 1000 * -dx,
      lifespan: { min: 100, max: 500 },
      rotate: { min: -180, max: 180 },
      follow: this.spaceship,
      followOffset: { x: -ox, y: -oy },
      frequency: 15,
      tint: 0xff002b,
    });
    this.leftEmitter = this.particles.createEmitter({
      quantity: 10,
      speedY: { min: 20 * dy, max: 50 * dy },
      speedX: { min: -10 * dx, max: 10 * dx },
      scale: { start: 0.05, end: 0 },
      alpha: { start: 0.5, end: 0, ease: true },
      blendMode: 'ADD',
      on: true,
      accelerationX: 1000 * dx,
      accelerationY: 1000 * dy,
      lifespan: { min: 100, max: 300 },
      rotate: { min: -180, max: 180 },
      frequency: 0,
      follow: this.spaceship,
      followOffset: { x: ox, y: oy },
      tint: 0xfcfcfc,
    });
  }

  update() {
    this.terran.anims.play('terranAnims', true);
    this.barren.anims.play('barrenAnims', true);

    if (this.spaceship) {
      this.spaceship.update(this.cursors);
      if (this.cursors.left?.isDown) {
        //this.emitter.on = true;
        //this.emitter.angle.propertyValue = this.spaceship.angle;
      } else if (this.cursors.right?.isDown) {
        //this.emitter.on = true;
        //this.emitter.angle.propertyValue = this.spaceship.angle - 180;
      } else if (this.cursors.up?.isDown) {
        this.leftEmitter.on = true;
      } else if (this.cursors.down?.isDown) {
        this.rightEmitter.on = true;
      } else {
        this.rightEmitter.on = false;
        this.leftEmitter.on = false;
      }
    }

    for (let each of this.deserts.children.entries) {
      verticalWrap(each, this);
      horizontalWrap(each, this);
      each.anims.play('desertAnims', true);
      this.physics.add.collider(
        this.spaceship,
        each,
        this.desertSpaceshipCollision,
        undefined,
        this
      );
    }

    for (let each of this.lavas.children.entries) {
      verticalWrap(each, this);
      horizontalWrap(each, this);
      each.anims.play('lavaAnims', true);
      this.physics.add.collider(
        this.spaceship,
        each,
        this.lavaSpaceshipCollision,
        undefined,
        this
      );
    }
    for (let each of this.ices.children.entries) {
      verticalWrap(each, this);
      horizontalWrap(each, this);
      each.anims.play('iceAnims', true);
      this.physics.add.collider(
        this.spaceship,
        each,
        this.iceSpaceshipCollision,
        undefined,
        this
      );
    }
    for (let each of this.gasGiants.children.entries) {
      verticalWrap(each, this);
      horizontalWrap(each, this);
      each.anims.play('gasGiantAnims', true);
      this.physics.add.collider(
        this.spaceship,
        each,
        this.gasGiantSpaceshipCollision,
        undefined,
        this
      );
      console.log(each);
    }
    if (
      this.spaceship.body.x > this.cameras.main.width ||
      this.spaceship.body.y > this.cameras.main.height ||
      this.spaceship.body.x < 0 ||
      this.spaceship.body.y < 0
    ) {
      this.scene.start('StartingScene');
    }
  }
}
