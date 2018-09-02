const questions = [
  {
    type: `one-image`,
    description: `Угадай, фото или рисунок?`,
    image: {
      url: `https://k42.kn3.net/CF42609C8.jpg`,
      type: `paint`,
    },
    rightAnswer: `paint`,
  },
  {
    type: `one-image`,
    description: `Угадай, фото или рисунок?`,
    image: {
      url: `http://i.imgur.com/DKR1HtB.jpg`,
      type: `photo`,
    },
    rightAnswer: `photo`,
  },
  {
    type: `two-images`,
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
    ],
    rightAnswer: `paint-photo`,
  },
  {
    type: `three-images`,
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
    ],
    rightAnswer: `https://k32.kn3.net/5C7060EC5.jpg`,
  },
  {
    type: `three-images`,
    description: `Найдите рисунок среди изображений`,
    images: [
      {
        url: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`,
      },
      {
        url: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`,
      },
      {
        url: `https://i.imgur.com/DiHM5Zb.jpg`,
        type: `photo`,
      },
    ],
    rightAnswer: `https://k42.kn3.net/D2F0370D6.jpg`,
  },
];

export default questions;
