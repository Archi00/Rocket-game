import Phaser from 'phaser';

const createTerranAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'terranAnims',
    frames: anims.generateFrameNames('terran', {
      start: 0,
      end: 3,
      prefix: 'Terran',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 3,
  });
};

export { createTerranAnims };
