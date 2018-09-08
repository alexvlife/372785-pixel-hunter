import ScreenIntroView from './view/screen-intro-view';
import {showScreen} from './utilsForBrowser';
import greeting from './screen-01-greeting';

const screenIntroView = new ScreenIntroView();
screenIntroView.onGoNextButtonClick = () => showScreen(greeting);

const screenIntroElement = screenIntroView.element;

export default screenIntroElement;
