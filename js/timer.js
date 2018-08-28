export const makeTimer = (limit) => {
  return {
    timeLimit: limit,
    tick() {
      if (this.timeLimit > 0) {
        --this.timeLimit;
      }
      if (this.timeLimit === 0) {
        this.onTimeElapsed();
      }
    },
    onTimeElapsed() {
    }
  };
};
