import {assert} from 'chai';
import {makeTimer} from '../timer';

describe(`Timer tests`, () => {
  it(`Should return 30, when the game is start`, () => {
    assert.equal(makeTimer(30).timeLimit, 30);
  });
  it(`Should return 26, when update timer with limit = 30,
      when calling tick() 4 times`, () => {
    const myTimer = makeTimer(30);
    myTimer.tick();
    myTimer.tick();
    myTimer.tick();
    myTimer.tick();
    assert.equal(myTimer.timeLimit, 26);
  });
  it(`Should return true, when time is up`, () => {
    const myTimer = makeTimer(5);
    myTimer.tick();
    myTimer.tick();
    myTimer.tick();
    myTimer.tick();
    myTimer.tick();
    assert.equal(myTimer.isTimeUp, true);
  });
});
