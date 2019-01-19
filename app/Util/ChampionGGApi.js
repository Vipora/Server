const Config = use('Config');
const TeemoJS = use('teemojs');

class ChampionGGApi{
    constructor(){
        this.api = new TeemoJS(Config.get('app.championGGKey'), TeemoJS.championGGConfig);
        this.data = undefined;
        this.lastUpdate = 0;
    }

    async getChampion(champId){
        if(!this.data){
            this._storeData(await this.api.get('champion.getAllChampions', {'limit': 1000}))
        }
        return this.data[champId];
    }

    _storeData(data){
        this.data = {}
        for (const entry of data) {
            if(!this.data[entry.championId])
                this.data[entry.championId] = [];
            this.data[entry.championId].push(entry);
        }
    }

    convertRole(lcuApiRole){
        switch(lcuApiRole){
            case 'JUNGLE':
                return "JUNGLER"
            case 'UTILITY':
                return "DUO_SUPPORT"
            case 'BOTTOM':
                return "DUP_CARRY"
            default:
                return lcuApiRole
        }
    }
}

module.exports = new ChampionGGApi()