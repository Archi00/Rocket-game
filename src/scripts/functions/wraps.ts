import Phaser from 'phaser';

function verticalWrap(sprite, scene: Phaser.Scene) {
  const halfHeight = sprite.displayHeight * 0.5;
  const gameHeight = scene.cameras.main.height;

  if (sprite.y < -halfHeight) {
    sprite.y = gameHeight + halfHeight;
  } else if (sprite.y > gameHeight + halfHeight) {
    sprite.y = -halfHeight;
  }
}

function horizontalWrap(sprite, scene: Phaser.Scene) {
  const halfWidth = sprite.displayWidth * 0.5;
  const gameWidth = scene.cameras.main.width;

  if (sprite.x < -halfWidth) {
    sprite.x = gameWidth + halfWidth;
  } else if (sprite.x > gameWidth + halfWidth) {
    sprite.x = -halfWidth;
  }
}

export { verticalWrap, horizontalWrap };
