import {assert} from 'chai';
import Answer from '../models/answer';
import {
  calcGameScore,
  calcLivesBalance,
  switchGameLevel
} from '../game-logic';

describe(`Game logic tests`, () => {
  describe(`Scoring function - calcGameScore`, () => {
    it(`Should return -1, when the player answered less than 10 questions`, () => {
      const userAnswers = [
        new Answer(false, 10),
        new Answer(false, 21),
        new Answer(true, 16),
        new Answer(false, 10)
      ];
      assert.equal(calcGameScore(userAnswers, 0), -1);
    });
    it(`Should return 1150, when the player answered all questions correctly,
        not fastly, not slowly, and had all lives`, () => {
      const userAnswers = [
        new Answer(true, 11),
        new Answer(true, 12),
        new Answer(true, 13),
        new Answer(true, 14),
        new Answer(true, 15),
        new Answer(true, 16),
        new Answer(true, 17),
        new Answer(true, 18),
        new Answer(true, 19),
        new Answer(true, 20)
      ];
      assert.equal(calcGameScore(userAnswers, 3), 1150);
    });
    it(`Should return 700, when the player answered 7 questions correctly,
        not fastly, not slowly, and had no lives`, () => {
      const userAnswers = [
        new Answer(true, 11),
        new Answer(true, 12),
        new Answer(true, 13),
        new Answer(true, 14),
        new Answer(true, 15),
        new Answer(true, 16),
        new Answer(true, 17),
        new Answer(false, 18),
        new Answer(false, 19),
        new Answer(false, 20)
      ];
      assert.equal(calcGameScore(userAnswers, 0), 700);
    });
    it(`Should return 750, when the player answered 8 questions correctly,
        for 2 questions fastly, for 4 questions slowly, and had one live`, () => {
      const userAnswers = [
        new Answer(false, 11),
        new Answer(false, 8),
        new Answer(true, 23),
        new Answer(true, 14),
        new Answer(true, 7),
        new Answer(true, 16),
        new Answer(true, 25),
        new Answer(true, 28),
        new Answer(true, 22),
        new Answer(true, 5)
      ];
      assert.equal(calcGameScore(userAnswers, 1), 750);
    });
  });
  describe(`Manage player lives function - calcLivesBalance`, () => {
    it(`Should return 2, when for the first time the player answered wrongly`, () => {
      const currentAnswer = new Answer(false, 11);
      assert.equal(calcLivesBalance(3, currentAnswer), 2);
    });
    it(`Should return 3, when the player answered correctly`, () => {
      const currentAnswer = new Answer(true, 20);
      assert.equal(calcLivesBalance(3, currentAnswer), 3);
    });
  });
  describe(`Switch game level function - switchGameLevel`, () => {
    it(`should update level of the game`, () => {
      assert.equal(switchGameLevel(1, 2), 2);
      assert.equal(switchGameLevel(2, 3), 3);
      assert.equal(switchGameLevel(4, 5), 5);
      assert.equal(switchGameLevel(9, 10), 10);
    });
    it(`should return current level, when set negative value`, () => {
      assert.equal(switchGameLevel(1, -1), 1);
    });
    it(`should return current level, when set value bigger than max level`, () => {
      assert.equal(switchGameLevel(10, 11), 10);
    });
    it(`should not allow set non number value`, () => {
      assert.equal(switchGameLevel(1, []), 1);
      assert.equal(switchGameLevel(2, {}), 2);
      assert.equal(switchGameLevel(3, undefined), 3);
      assert.equal(switchGameLevel(4, `nine`), 4);
    });
  });
});
