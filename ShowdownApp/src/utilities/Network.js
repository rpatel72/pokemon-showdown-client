import { numberString, string } from './Random'

export async function submitCheckUsernameRequest(username){
    console.log("checking " + username);
}

export function generateWSString(){
    var server = numberString(1000);
    var sessionId = string(8);
    var wsString = 'wss://sim3.psim.us/showdown/' + server + '/' + sessionId + '/websocket';

    return wsString;
}