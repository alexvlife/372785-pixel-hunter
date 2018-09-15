import {adaptServerQuestionsData} from "./data-adapter";
import {toJSON} from "./utils";

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = 22101985;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON).then(adaptServerQuestionsData);
  }

  static loadResults(playerName) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${playerName}`).then(checkStatus).then(toJSON);
  }

  static saveResults(finalGameState, playerName) {
    finalGameState = Object.assign({playerName}, finalGameState);
    const requestSettings = {
      body: JSON.stringify(finalGameState),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${playerName}`, requestSettings).then(checkStatus);
  }
}
