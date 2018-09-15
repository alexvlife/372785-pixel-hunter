import {assert} from 'chai';
import {makeTimer} from '../timer';

describe(`Timer tests`, () => {
  it(`Should return 30, when the game is start`, () => {
    const myTimer = makeTimer(30);
    assert.equal(myTimer.timeLeft, 30);
  });
  it(`Should return 20, when update timer with limit = 30,
      when calling tick() 10 times`, () => {
    const myTimer = makeTimer(30);
    for (let i = 1; i <= 10; i++) {
      myTimer.tick();
    }
    assert.equal(myTimer.timeLeft, 20);
  });
  it(`Should return true, when time is up`, () => {
    const myTimer = makeTimer(30);
    let timeElapsed = false;
    myTimer.onTimeElapsed = () => {
      timeElapsed = true;
    };
    for (let i = 0; i <= 30; i++) {
      myTimer.tick();
    }
    assert.equal(timeElapsed, true);
  });
});
