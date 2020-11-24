import Phaser from 'phaser';

const createDesertAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'desertAnims',
    frames: anims.generateFrameNames('desert', {
      start: 0,
      end: 3,
      prefix: 'Desert',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 3,
  });
};

export { createDesertAnims };
