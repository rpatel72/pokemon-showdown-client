import { numberString, string } from './Random'
import { parseAssertion, sendWsMessage} from './DataTools'


export const submitCheckUsernameRequest = async (socket, username, challStr) => {
    console.log("checking " + username);
    var formData = new FormData();
    formData.append('act', 'getassertion');
    formData.append('userid', username);
    formData.append('challstr', challStr)

    try {
      let response = await fetch('https://play.pokemonshowdown.com/~~showdown/action.php', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: formData
      });
      let text = await response.text();
      
      let parsed = parseAssertion(username, text);
      return parsed;
      
      
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export function generateWSString(){
    var server = numberString(1000);
    var sessionId = string(8);
    var wsString = 'wss://sim3.psim.us/showdown/' + server + '/' + sessionId + '/websocket';

    return wsString;
}