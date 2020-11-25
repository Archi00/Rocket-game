import Spaceship from '../objects/Spaceship';

let speed = 15;
const moveLeft = (spaceship) => {
  spaceship.setAccelerationX(speed * 0.5 * -Math.cos(spaceship.angle * (Math.PI / 180)));
  spaceship.setAccelerationY(speed * 0.5 * -Math.sin(spaceship.angle * (Math.PI / 180)));
  spaceship.setAngularVelocity(-100);
};

const moveRight = (spaceship) => {
  spaceship.setAccelerationX(speed * 0.5 * Math.cos(spaceship.angle * (Math.PI / 180)));
  spaceship.setAccelerationY(speed * 0.5 * Math.sin(spaceship.angle * (Math.PI / 180)));
  spaceship.setAngularVelocity(100);
};

const moveUp = (spaceship) => {
  speed += 5;
  spaceship.setAccelerationX(speed * -Math.cos((spaceship.angle + 90) * (Math.PI / 180)));
  spaceship.setAccelerationY(speed * -Math.sin((spaceship.angle + 90) * (Math.PI / 180)));
  spaceship.setAngularVelocity(0);
};

const moveDown = (spaceship) => {
  speed -= 10;

  spaceship.setAccelerationX(speed * Math.cos((spaceship.angle - 90) * (Math.PI / 180)));
  spaceship.setAccelerationY(speed * Math.sin((spaceship.angle - 90) * (Math.PI / 180)));
};

const restartSpeed = (spaceship) => {
  speed = 0;

  spaceship.setAngularVelocity(0);
  spaceship.setAcceleration(speed, speed);
};

export { moveLeft, moveRight, moveUp, moveDown, restartSpeed };
