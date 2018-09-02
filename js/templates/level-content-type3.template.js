const levelContentType3Template = (question) => {
  return `<form class="game__content  game__content--triple">
            <div class="game__option">
              <img src="${question.images[0].url}" alt="Option 1" width="304" height="455">
            </div>
            <div class="game__option  game__option--selected">
              <img src="${question.images[1].url}" alt="Option 2" width="304" height="455">
            </div>
            <div class="game__option">
              <img src="${question.images[2].url}" alt="Option 3" width="304" height="455">
            </div>
          </form>`;
};

export default levelContentType3Template;
