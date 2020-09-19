export function parseIncomingData(data){
    // var roomid = '';
    // var autojoined = false;
    // if (data.charAt(0) === '>') {
    //     var nlIndex = data.indexOf('\n');
    //     if (nlIndex < 0) return;
    //     roomid = toRoomid(data.substr(1, nlIndex - 1));
    //     data = data.substr(nlIndex + 1);
    // }
    // if (data.substr(0, 6) === '|init|') {
    //     if (!roomid) roomid = 'lobby';
    //     var roomType = data.substr(6);
    //     var roomTypeLFIndex = roomType.indexOf('\n');
    //     if (roomTypeLFIndex >= 0) roomType = roomType.substr(0, roomTypeLFIndex);
    //     roomType = toID(roomType);
    //     if (this.rooms[roomid] || roomid === 'staff' || roomid === 'upperstaff') {
    //         // autojoin rooms are joined in background
    //         this.addRoom(roomid, roomType, true);
    //     } else {
    //         this.joinRoom(roomid, roomType, true);
    //     }
    //     if (roomType === 'chat') autojoined = true;
    // } else if ((data + '|').substr(0, 8) === '|expire|') {
    //     var room = this.rooms[roomid];
    //     if (room) {
    //         room.expired = (data.substr(8) || true);
    //         if (room.updateUser) room.updateUser();
    //     }
    //     return;
    // } else if ((data + '|').substr(0, 8) === '|deinit|' || (data + '|').substr(0, 8) === '|noinit|') {
    //     if (!roomid) roomid = 'lobby';

    //     if (this.rooms[roomid] && this.rooms[roomid].expired) {
    //         // expired rooms aren't closed when left
    //         return;
    //     }

    //     var isdeinit = (data.charAt(1) === 'd');
    //     data = data.substr(8);
    //     var pipeIndex = data.indexOf('|');
    //     var errormessage;
    //     if (pipeIndex >= 0) {
    //         errormessage = data.substr(pipeIndex + 1);
    //         data = data.substr(0, pipeIndex);
    //     }
    //     // handle error codes here
    //     // data is the error code
    //     if (data === 'namerequired') {
    //         var self = this;
    //         this.once('init:choosename', function () {
    //             self.send('/join ' + roomid);
    //         });
    //     } else if (data === 'rename') {
    //         // |newid|newtitle
    //         var parts = errormessage.split('|');
    //         this.renameRoom(roomid, parts[0], parts[1]);
    //     } else if (data === 'nonexistent' && Config.server.id && roomid.slice(0, 7) === 'battle-' && errormessage) {
    //         var replayid = roomid.slice(7);
    //         if (Config.server.id !== 'showdown') replayid = Config.server.id + '-' + replayid;
    //         var replayLink = 'https://' + Config.routes.replays + '/' + replayid;
    //         $.ajax(replayLink + '.json', {dataType: 'json'}).done(function (replay) {
    //             if (replay) {
    //                 var title = BattleLog.escapeHTML(replay.p1) + ' vs. ' + BattleLog.escapeHTML(replay.p2);
    //                 app.receive('>battle-' + replayid + '\n|init|battle\n|title|' + title + '\n' + replay.log);
    //                 app.receive('>battle-' + replayid + '\n|expire|<a href=' + replayLink + ' target="_blank" class="no-panel-intercept">Open replay in new tab</a>');
    //             } else {
    //                 errormessage += '\n\nResponse received, but no data.';
    //                 app.addPopupMessage(errormessage);
    //             }
    //         }).fail(function () {
    //             app.removeRoom(roomid, true);
    //             errormessage += "\n\nThe battle you're looking for has expired. Battles expire after 15 minutes of inactivity unless they're saved.\nIn the future, remember to click \"Save replay\" to save a replay permanently.";
    //             app.addPopupMessage(errormessage);
    //         });
    //     } else {
    //         if (isdeinit) { // deinit
    //             if (this.rooms[roomid] && this.rooms[roomid].type === 'chat') {
    //                 this.removeRoom(roomid, true);
    //                 this.updateAutojoin();
    //             } else {
    //                 this.removeRoom(roomid, true);
    //             }
    //         } else { // noinit
    //             this.unjoinRoom(roomid);
    //             if (roomid === 'lobby') this.joinRoom('rooms');
    //         }
    //         if (errormessage) this.addPopupMessage(errormessage);
    //     }
    //     return;
    // } else if (data.substr(0, 3) === '|N|') {
    //     var names = data.substr(1).split('|');
    //     if (app.ignore[toUserid(names[2])]) {
    //         app.ignore[toUserid(names[1])] = 1;
    //     }
    // }
    // if (roomid) {
    //     if (this.rooms[roomid]) {
    //         this.rooms[roomid].receive(data);
    //     }
    //     if (autojoined) this.updateAutojoin();
    //     return;
    // }

    // Since roomid is blank, it could be either a global message or
    // a lobby message. (For bandwidth reasons, lobby messages can
    // have blank roomids.)

    // If it starts with a messagetype in the global messagetype
    // list, we'll assume global; otherwise, we'll assume lobby.
    // console.log(data);
    var parts;
    if (data.charAt(0) === '|') {
        parts = data.substr(1).split('|');
    } else {
        parts = [];
    }

    // console.log(parts);

    switch (parts[0]) {
    // case 'customgroups':
    //     var nlIndex = data.indexOf('\n');
    //     if (nlIndex > 0) {
    //         this.receive(data.substr(nlIndex + 1));
    //     }

    //     var tarRow = data.slice(14, nlIndex);
    //     this.parseGroups(tarRow);
    //     break;

    case 'challstr':
        var challstr;
        if (parts[2]) {
            challstr = parts[1] + '|' + parts[2];
        } else {
            challstr = parts[1];
        }

        var obj =  new Object();
        obj.challstr = challstr;
        // console.log(obj);
        return obj;
        break;

    case 'formats':
        // console.log("FORMATS");
        // this.parseFormats(parts);
        break;

    case 'updateuser':
        var nlIndex = data.indexOf('\n');
        if (nlIndex > 0) {
            this.receive(data.substr(nlIndex + 1));
            parts = data.slice(1, nlIndex).split('|');
        }
        var parsed = global.BattleTextParser.parseNameParts(parts[1]);
        // console.log(parsed);
        var named = !!+parts[2];
        // var userid = toUserid(parsed.name);
        // if (userid === this.user.get('userid') && parsed.name !== this.user.get('name')) {
        //     $.post(app.user.getActionPHP(), {
        //         act: 'changeusername',
        //         username: parsed.name
        //     }, function () {}, 'text');
        // }

        // var settings = _.clone(app.user.get('settings'));
        // if (parts.length > 4) {
        //     // Update our existing settings based on what the server has sent us.
        //     // This approach is more robust as it works regardless of whether the
        //     // server sends us all the values or just the diffs.
        //     var update = JSON.parse(parts[4]);
        //     for (var key in update) {
        //         settings[key] = update[key];
        //     }
        // }

        // this.user.set({
        //     name: parsed.name,
        //     userid: userid,
        //     named: named,
        //     avatar: parts[3],
        //     settings: settings,
        //     status: parsed.status,
        //     away: parsed.away
        // });
        // this.user.setPersistentName(named ? parsed.name : null);
        // if (named) {
        //     this.trigger('init:choosename');
        // }
        // if (app.ignore[userid]) {
        //     delete app.ignore[userid];
        // }
        console.log("NAMED: " + named);
        var obj =  new Object();
        obj.updateuser = parsed;
        // console.log(obj);
        return obj;
        break;
// 
    // case 'nametaken':
    //     app.addPopup(LoginPopup, {name: parts[1] || '', error: parts[2] || ''});
    //     break;

    // case 'queryresponse':
    //     var responseData = JSON.parse(data.substr(16 + parts[1].length));
    //     app.trigger('response:' + parts[1], responseData);
    //     break;

    // case 'updatechallenges':
    //     if (this.rooms['']) {
    //         this.rooms[''].updateChallenges(JSON.parse(data.substr(18)));
    //     }
    //     break;

    // case 'updatesearch':
    //     if (this.rooms['']) {
    //         this.rooms[''].updateSearch(JSON.parse(data.substr(14)));
    //     }
    //     break;

    // case 'popup':
    //     var maxWidth;
    //     var type = 'semimodal';
    //     data = data.substr(7);
    //     if (data.substr(0, 6) === '|wide|') {
    //         data = data.substr(6);
    //         maxWidth = 960;
    //     }
    //     if (data.substr(0, 7) === '|modal|') {
    //         data = data.substr(7);
    //         type = 'modal';
    //     }
    //     if (data.substr(0, 6) === '|html|') {
    //         data = data.substr(6);
    //         app.addPopup(Popup, {
    //             type: type,
    //             maxWidth: maxWidth,
    //             htmlMessage: BattleLog.sanitizeHTML(data)
    //         });
    //     } else {
    //         app.addPopup(Popup, {
    //             type: type,
    //             maxWidth: maxWidth,
    //             message: data.replace(/\|\|/g, '\n')
    //         });
    //     }
    //     if (this.rooms['']) this.rooms[''].resetPending();
    //     break;

    // case 'disconnect':
    //     app.trigger('init:socketclosed', BattleLog.sanitizeHTML(data.substr(12)));
    //     break;

    // case 'pm':
    //     var dataLines = data.split('\n');
    //     for (var i = 0; i < dataLines.length; i++) {
    //         parts = dataLines[i].slice(1).split('|');
    //         var message = parts.slice(3).join('|');
    //         this.rooms[''].addPM(parts[1], message, parts[2]);
    //         if (toUserid(parts[1]) !== app.user.get('userid')) {
    //             app.user.lastPM = toUserid(parts[1]);
    //         }
    //     }
    //     break;

    // case 'roomerror':
    //     // deprecated; use |deinit| or |noinit|
    //     this.unjoinRoom(parts[1]);
    //     this.addPopupMessage(parts.slice(2).join('|'));
    //     break;

    // case 'refresh':
    //     // refresh the page
    //     document.location.reload(true);
    //     break;

    // case 'c':
    // case 'chat':
    //     if (parts[1] === '~') {
    //         if (parts[2].substr(0, 6) === '/warn ') {
    //             app.addPopup(RulesPopup, {warning: parts[2].substr(6)});
    //             break;
    //         }
    //     }

    /* fall through */
    default:
        // the messagetype wasn't in our list of recognized global
        // messagetypes; so the message is presumed to be for the
        // lobby.
        // if (this.rooms['lobby']) {
        //     this.rooms['lobby'].receive(data);
        // }
        return null;
        break;
    }



}