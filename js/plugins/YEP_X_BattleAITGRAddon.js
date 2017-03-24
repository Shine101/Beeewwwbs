//=============================================================================
// Add TGR to YEP_BattleAICore
// YEP_X_BattleAITGRAddon.js
// version 1.0.0
//=============================================================================
/*:  
 * @plugindesc v1.00 A quick and dirty addon to add highest and lowest TGR as valid target choices in YEP_BattleAICore
 * @author Ramza
 * 
 * @help
 * Plug and Play.
 * Simply use TGR when you want to target the actor with the highest or 
 * lowest TGR. May conflict with newer versions of YEP_BattleAICore than 1.07
 */
AIManager.setProperTarget = function(group) {
    var action = this.action();
    var randomTarget = group[Math.floor(Math.random() * group.length)];
    if (!randomTarget) return action.setTarget(0);
    if (group.length <= 0) return action.setTarget(randomTarget.index());
    var line = this._aiTarget.toUpperCase();
    if (line.match(/FIRST/i)) {
      action.setTarget(0);
    } else if (line.match(/HIGHEST[ ](.*)/i)) {
      var param = this.getParamId(String(RegExp.$1));
      if (param < 0) return action.setTarget(randomTarget.index());
      if (param === 8) return this.setHighestHpFlatTarget(group);
      if (param === 9) return this.setHighestMpFlatTarget(group);
      if (param === 10) return this.setHighestHpRateTarget(group);
      if (param === 11) return this.setHighestMpRateTarget(group);
      if (param === 12) return this.setHighestLevelTarget(group);
      if (param === 13) return this.setHighestMaxTpTarget(group);
      if (param === 14) return this.setHighestTpTarget(group);
      if (param === 15) return this.setHighestTgrTarget(group);
	  if (param > 16) return action.setTarget(randomTarget.index());
      this.setHighestParamTarget(group, param);
    } else if (line.match(/LOWEST[ ](.*)/i)) {
      var param = this.getParamId(String(RegExp.$1));
      if (param < 0) return action.setTarget(randomTarget.index());
      if (param === 8) return this.setLowestHpFlatTarget(group);
      if (param === 9) return this.setLowestMpFlatTarget(group);
      if (param === 10) return this.setLowestHpRateTarget(group);
      if (param === 11) return this.setLowestMpRateTarget(group);
      if (param === 12) return this.setLowestLevelTarget(group);
      if (param === 13) return this.setLowestMaxTpTarget(group);
      if (param === 14) return this.setLowestTpTarget(group);
	  if (param === 15) return this.setLowestTgrTarget(group);
	  if (param > 16) return action.setTarget(randomTarget.index());
      this.setLowestParamTarget(group, param);
    } else {
      this.setRandomTarget(group);
    }
};

AIManager.getParamId = function(string) {
    string = string.toUpperCase()
    switch (string) {
    case 'MAXHP':
    case 'MAX HP':
      return 0;
      break;
    case 'MAXMP':
    case 'MAX MP':
    case 'MAXSP':
    case 'MAX SP':
      return 1;
      break;
    case 'ATK':
    case 'STR':
      return 2;
      break;
    case 'DEF':
      return 3;
      break;
    case 'MAT':
    case 'INT':
    case 'SPI':
      return 4;
      break;
    case 'MDF':
    case 'RES':
      return 5;
      break;
    case 'AGI':
    case 'SPD':
      return 6;
      break;
    case 'LUK':
      return 7;
      break;
    case 'HP':
      return 8;
      break;
    case 'MP':
    case 'SP':
      return 9;
      break;
    case 'HP%':
      return 10;
      break;
    case 'MP%':
    case 'SP%':
      return 11;
      break;
    case 'LEVEL':
    case 'LV':
    case 'LVL':
      return 12;
      break;
    case 'MAXTP':
      return 13;
      break;
    case 'TP':
      return 14;
      break;
	case 'TGR':
	  return 15;
	  break;
    }
    return -1;
};

AIManager.setHighestTgrTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.tgr > maintarget.tgr) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestTgrTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.tgr < maintarget.tgr) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};