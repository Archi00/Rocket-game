import Phaser from 'phaser';

const createLavaAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'lavaAnims',
    frames: anims.generateFrameNames('lava', {
      start: 0,
      end: 3,
      prefix: 'Lava',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 3,
  });
};

export { createLavaAnims };
