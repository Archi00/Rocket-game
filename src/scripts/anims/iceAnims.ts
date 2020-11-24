import Phaser from 'phaser';

const createIceAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'iceAnims',
    frames: anims.generateFrameNames('ice', {
      start: 0,
      end: 3,
      prefix: 'Ice',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 3,
  });
};

export { createIceAnims };
