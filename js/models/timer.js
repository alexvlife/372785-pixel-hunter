export default class Timer {
  constructor(timeLimit) {
    this.limit = timeLimit;
  }
  tick() {
    this.limit -= 1;
  }
}
