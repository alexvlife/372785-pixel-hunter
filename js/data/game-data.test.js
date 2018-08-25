import {assert} from 'chai';
import {calcGameScore} from '../util';
import {gameRules} from '../game-data/game-data';
import {Answer} from '../models/answer';

describe(`Game`, () => {
  describe(`Scoring function`, () => {
    it(`The player answered less than 10 questions`, () => {
      const userAnswers = [
        new Answer(false, 10),
        new Answer(false, 21),
        new Answer(true, 16),
        new Answer(false, 10)
      ];
      const livesBalance = 0;
      assert.equal(calcGameScore(userAnswers, livesBalance, gameRules), -1);
    });
    it(`The player answered all questions correctly, not fastly, not slowly, and had all lives`, () => {
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
    it(`The player answered 7 questions correctly, not fastly, not slowly, and had no lives`, () => {
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
    it(`The player answered 8 questions correctly, for 2 questions fastly, for 4 questions slowly, and had 1 live`, () => {
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
});
