const END_TIME_VALUE = 0;

export const TIME_TO_FLASH = 5;

export const makeTimer = (limit) => {
  return {
    timeLeft: limit,
    tick() {
      if (this.timeLeft <= TIME_TO_FLASH) {
        this.onTimeToFlash();
      }
      if (this.timeLeft > END_TIME_VALUE) {
        --this.timeLeft;
      } else {
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
