export const makeTimer = (limit) => {
  return {
    timeLeft: limit,
    tick() {
      if (this.timeLeft > 0) {
        --this.timeLeft;
      }
      if (this.timeLeft === 0) {
        this.onTimeElapsed();
      }
    },
    reset() {
      this.timeLeft = limit;
    },
    onTimeElapsed() {
    }
  };
};
