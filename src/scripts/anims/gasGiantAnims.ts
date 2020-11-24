import Phaser from 'phaser';

const createGasGiantAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'gasGiantAnims',
    frames: anims.generateFrameNames('gasGiant', {
      start: 0,
      end: 3,
      prefix: 'GasGiant',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 3,
  });
};

export { createGasGiantAnims };
