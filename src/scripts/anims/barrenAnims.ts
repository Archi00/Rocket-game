import Phaser from 'phaser';

const createBarrenAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'barrenAnims',
    frames: anims.generateFrameNames('barren', {
      start: 0,
      end: 3,
      prefix: 'Barren',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 3,
  });
};

export { createBarrenAnims };
