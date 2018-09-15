const END_TIME_VALUE = 0;

export const makeTimer = (limit) => {
  return {
    timeLeft: limit,
    tick() {
      if (this.timeLeft > END_TIME_VALUE) {
        --this.timeLeft;
      }
      if (this.timeLeft === END_TIME_VALUE) {
        this.onTimeElapsed();
      }
    },
    reset() {
      this.timeLeft = limit;
    },
    onTimeElapsed() {
    },
    onTimeToFlash() {
    },
  };
};
