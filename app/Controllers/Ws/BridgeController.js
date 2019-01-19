'use strict'

const Ws = use('Ws')
const ChampionGG = use('ChampionGG')

class BridgeController {
  constructor ({ socket, request, auth }) {
    this.socket = socket;
    this.request = request;
    this.auth = auth;
    this.lastActions = [];
    console.log(socket.id + " joined");
  }

  //This method gets called if the bridge sent an event
  async onBridge(message){
    console.log(message);
    switch(message.uri){
      case '/lol-champ-select/v1/session':
        let currentActions = [].concat.apply([], message.data.actions);
        let newActions = this._getNewActions(this.lastActions, currentActions);
        let players = message.data.myTeam.concat(message.data.theirTeam);
        console.table(this.lastActions);  
        console.table(currentActions);  
        for (const action of newActions) {
          action.isLocalPlayer = action.actorCellId === message.data.localPlayerCellId;
          let p = players[action.actorCellId] || {};
          action.assignedPosition  = p.assignedPosition || undefined;
          action.spell1Id = p.spell1Id || undefined;
          action.spell2Id = p.spell2Id || undefined;
          action.team = p.team || undefined;
          if(action.championId){
            var champGGData = await ChampionGG.getChampion(action.championId);
            var data = champGGData[0];
            for (const d of champGGData) {
              if(d.role == ChampionGG.convertRole(p.assignedPosition)){
                data = d;
                break;
              }
            }
            action.winrate = Math.round(data.winRate * 100 * 100) / 100;
            action.banrate = Math.round(data.banRate * 100 * 100) / 100;
            action.playRate = Math.round(data.playRate * 100 * 100) / 100;
          }
          delete action.completed;
          delete action.id;
          this.socket.broadcast('client', action);
        }
        console.table(newActions);
        this.lastActions = currentActions;
        break;
    }
  }

  _getNewActions(oldActions, currentActions){
    let newActions = [];
    for(let i=0; i < currentActions.length; i++){
      if(currentActions[i].completed && (oldActions.length < i ||!oldActions[i].completed))newActions.push(Object.assign({},currentActions[i]));
    }
    return newActions;
  }
}

module.exports = BridgeController
