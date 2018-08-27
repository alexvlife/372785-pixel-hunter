export const makeTimer = (limit) => {
  return {
    timeLimit: limit,
    status: `There is still some time`,
    tick() {
      if (this.timeLimit > 0) {
        --this.timeLimit;
      }
      if (this.timeLimit === 0) {
        this.chageStatus();
      }
      return this.status;
    },
    chageStatus() {
      this.status = `Time is up..`;
    }
  };
};
