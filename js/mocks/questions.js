const questions = [
  {
    type: 1,
    description: `Угадай, фото или рисунок?`,
    image: {
      url: `https://k42.kn3.net/CF42609C8.jpg`,
      type: `paint`,
    }
  },
  {
    type: 2,
    description: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      {
        url: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`,
      },
      {
        url: `https://i.imgur.com/DiHM5Zb.jpg`,
        type: `photo`,
      },
    ]
  },
  {
    type: 3,
    description: `Найдите рисунок среди изображений`,
    images: [
      {
        url: `https://k32.kn3.net/5C7060EC5.jpg`,
        type: `paint`,
      },
      {
        url: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`,
      },
      {
        url: `http://i.imgur.com/DKR1HtB.jpg`,
        type: `photo`,
      },
    ]
  },
];

export default questions;
