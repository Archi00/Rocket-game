import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import WinningScene from './scenes/winningScene';
import StartingScene from './scenes/startingScene';
import ShieldUI from './scenes/shieldUI';

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [StartingScene, PreloadScene, MainScene, WinningScene, ShieldUI],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
    },
  },
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
