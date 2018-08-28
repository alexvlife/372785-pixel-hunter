export const makeTimer = (limit) => {
  return {
    timeLimit: limit,
    isTimeUp: false,
    tick() {
      if (this.timeLimit > 0) {
        --this.timeLimit;
      }
      if (this.timeLimit === 0) {
        this.onTimeElapsed();
      }
      return this.timeLimit;
    },
    onTimeElapsed() {
      this.isTimeUp = true;
    }
  };
};
