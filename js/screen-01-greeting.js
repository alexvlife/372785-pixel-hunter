import ScreenGreetingView from './view/screen-greeting-view';
import {showScreen} from './utilsForBrowser';
import rules from './screen-02-rules';

const screenGreetingView = new ScreenGreetingView();
screenGreetingView.onClickButton = () => showScreen(rules);

const screenGreetingElement = screenGreetingView.element;

export default screenGreetingElement;
