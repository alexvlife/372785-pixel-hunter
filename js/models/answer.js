export class Answer {
  constructor(isTrue, time) {
    this.isTrue = isTrue;
    this.time = time;
    this.answerScoring = 0;
  }
  calcScoring(rules) {
    switch (true) {
      case (this.time <= rules.answerTime.fast):
        this.answerScoring = rules.score.answer.correct + rules.score.answer.fast;
        break;
      case (this.time > rules.answerTime.slow):
        this.answerScoring = rules.score.answer.correct + rules.score.answer.slow;
        break;
      default:
        this.answerScoring = rules.score.answer.correct;
        break;
    }
    this.answerScoring *= this.isTrue;
    return this.answerScoring;
  }
}
