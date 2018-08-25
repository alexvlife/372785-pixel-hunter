import {assert} from 'chai';
import {gameRules} from '../game-data/game-data';
import {Answer} from '../models/answer';
import {calcGameScore, calcLivesBalance, switchGameLevel, gameStore} from '../game-logic';

describe(`Game`, () => {
  describe(`Scoring function - calcGameScore`, () => {
    it(`Should return -1, when the player answered less than 10 questions`, () => {
      const userAnswers = [
        new Answer(false, 10),
        new Answer(false, 21),
        new Answer(true, 16),
        new Answer(false, 10)
      ];
      const livesBalance = 0;
      assert.equal(calcGameScore(userAnswers, livesBalance, gameRules), -1);
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
      const livesBalance = 3;
      assert.equal(calcGameScore(userAnswers, livesBalance, gameRules), 1150);
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
      const livesBalance = 0;
      assert.equal(calcGameScore(userAnswers, livesBalance, gameRules), 700);
    });
    it(`Should return 750, when the player answered 8 questions correctly,
        for 2 questions fastly, for 4 questions slowly, and had 1 live`, () => {
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
      const livesBalance = 1;
      assert.equal(calcGameScore(userAnswers, livesBalance, gameRules), 750);
    });
  });
  describe(`Manage player lives function - calcLivesBalance`, () => {
    it(`Should return 2, when for the first time the player answered wrongly`, () => {
      gameStore.livesBalance = 3;
      const currentAnswer = new Answer(false, 11);
      assert.equal(calcLivesBalance(currentAnswer), 2);
    });
    it(`Should return 3, when the player answered correctly`, () => {
      gameStore.livesBalance = 3;
      const currentAnswer = new Answer(true, 20);
      assert.equal(calcLivesBalance(currentAnswer), 3);
    });
  });
  describe(`Switch level function - switchGameLevel`, () => {
    it(`Should return 8, when the player answered the 7-th question
        and had all lives, and this question isn't last`, () => {
      gameStore.livesBalance = 3;
      gameStore.currentLevel = 7;
      assert.equal(switchGameLevel(), 8);
    });
    it(`Should return -1, when the player answered the last question`, () => {
      gameStore.livesBalance = 3;
      gameStore.currentLevel = 10;
      assert.equal(switchGameLevel(), -1);
    });
    it(`Should return -1, when the player answered wrongly and hadn't lives`, () => {
      gameStore.livesBalance = -1;
      gameStore.currentLevel = 9;
      assert.equal(switchGameLevel(), -1);
    });
  });
});
