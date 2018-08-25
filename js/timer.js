export const questionTimer = (timer) => {

  const limit = timer.limit * 1000;
  // начать повторы с интервалом 1 сек.
  let timerId = setInterval(() => {
    timer.tick();
  }, 1000);

  const stop = () => {
    clearInterval(timerId);
    return `Время на данный вопрос истекло..`;
  };

  // через limit сек. остановить повторы
  setTimeout(() => {
    stop();
  }, limit);
};
