// setting variables
let allDamage = 0;
let allDamageString = '';
let allCriticalDamage = 0;
let allCriticalDamageString = '';
let charismaMod = 5;
let proficiencyBonus = 4;
let spellSaveDC = 8 + proficiencyBonus + charismaMod;
let weaponBonus = 0;
let fullAttackMod = charismaMod + proficiencyBonus + weaponBonus;
let elementalAdeptDamageBonus = charismaMod;
let damageBonus = elementalAdeptDamageBonus;
let criticalHit = false;
let damageTypes = [];

let rollAttack = false;

new Dialog({
  title: `Spell Level`,
  content: `
    <form>
      <div class="form-group">
        <label>Spell Level:</label>
        <select id="spellLevel" name="spellLevel">
            <option value="level4" selected>Level 4</option>
            <option value="level5">Level 5</option>
            <option value="level6">Level 6</option>
        </select>
      </div>
      <div class="form-group">
        <label>Roll Type:</label>
        <select id="attackRollType" name="attackRollType">
            <option value="advantage" selected>Advantage</option>
            <option value="normal">Normal</option>
            <option value="disadvantage">Disadvantage</option>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Roll Maneuver`,
      callback: () => rollAttack = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel`
    },
  },
  default: "yes",
  close: html => {
    if (rollAttack) {
    let spellLevelSelect = html.find('[name="spellLevel"]')[0].value || "none";
    let messageContent = '';
    // Build Message to Beyond20 Spec
    // Top Details Section
    messageContent += `<div class="beyond20-message">
    <details>
    <summary><a>Storm Sphere</a></summary>
    <table>
        <tbody>
            <tr>
                <td><i>4th Level Evocation</i></td>
            </tr>
            <tr>
                <td><b>Casting Time</b></td>
                <td>1 action</td>
            </tr>
            <tr>
                <td><b>Range</b></td>
                <td>150ft./20ft.</td>
            </tr>
            <tr>
                <td><b>Duration</b></td>
                <td>up to 1 minute</td>
            </tr>
            <tr>
                <td><b>Components</b></td>
                <td>V, S</td>
            </tr>
            <tr>
                <td><b>Concentration</b></td>
                <td>Requires Concentration</td>
            </tr>
        </tbody>
    </table>
    <div class="beyond20-description">A 20-foot-radius sphere of whirling air springs into existence centered on a point you choose within range. The sphere remains for the spell’s duration. Each creature in the sphere when it appears or that ends its turn there must succeed on a Strength saving throw or take <span class="ct-beyond20-custom-roll"><strong>2d6</strong><img class="ct-beyond20-custom-icon" src="/modules/beyond20/images/icons/icon16.png" style="margin-right:3px;margin-left:3px;border:0px"><span class="beyond20-roll-formula" style="display:none">2d6</span></span> bludgeoning damage. The sphere’s space is difficult terrain.
        <br>Until the spell ends, you can use a bonus action on each of your turns to cause a bolt of lightning to leap from the center of the sphere toward one creature you choose within 60 feet of the center. Make a ranged spell attack. You have advantage on the attack roll if the target is in the sphere. On a hit, the target takes <span class="ct-beyond20-custom-roll"><strong>4d6</strong><img class="ct-beyond20-custom-icon" src="/modules/beyond20/images/icons/icon16.png" style="margin-right:3px;margin-left:3px;border:0px"><span class="beyond20-roll-formula" style="display:none">4d6</span></span> lightning damage.
        <br>Creatures within 30 feet of the sphere have disadvantage on Wisdom (Perception) checks made to listen.
        <br>
        <br><b>At Higher levels.</b> When you cast this spell using a spell slot of 5th level or higher, the damage increases for each of its effects by <span class="ct-beyond20-custom-roll"><strong>1d6</strong><img class="ct-beyond20-custom-icon" src="/modules/beyond20/images/icons/icon16.png" style="margin-right:3px;margin-left:3px;border:0px"><span class="beyond20-roll-formula" style="display:none">1d6</span></span> for each slot level above 4th.</div>
</details>
<div class="beyond20-roll-result"><b>Range: </b><span>150ft./20ft.</span></div>
<div class="beyond20-roll-result"><b>Components: : </b><span>V, S</span></div>
<div class="beyond20-roll-result"><b>Save: </b><span>Strength DC ${spellSaveDC}</span></div>`;


    
    //Attack Roll
    let attackRollTypeSelect = html.find('[name="attackRollType"]')[0].value || "none";
    let attackRollDie = 20;
    let attackRoll;
    let attackRollString;
    let attackRollDieCount;

    if(attackRollTypeSelect === 'advantage'){
        attackRollDieCount = 2;
        attackRollString = attackRollDieCount + 'd' + attackRollDie + 'kh';
        attackRoll = new Roll(attackRollString);
        attackRoll.roll();
    
    }
    else if(attackRollTypeSelect === 'normal'){
        attackRollDieCount = 1;
        attackRollString = attackRollDieCount + 'd' + attackRollDie;
        attackRoll = new Roll(attackRollString);
        attackRoll.roll();
    
    }
    else if(attackRollTypeSelect === 'disadvantage'){
        attackRollDieCount = 2;
        attackRollString = attackRollDieCount + 'd' + attackRollDie + 'kl';
        attackRoll = new Roll(attackRollString);
        attackRoll.roll();
    }
    
    let separateDieString = attackRollDieCount + 'd' + attackRollDie;

    messageContent += `<div class="beyond20-roll-result beyond20-roll-cells">`;
    
    // attackRoll.parts[0].rolls.foreach(element => {
    for(var i = 0; i < attackRoll.parts[0].rolls.length; i++){
        messageContent += `<div class="beyond20-roll-cell">
        <span class="beyond20-tooltip">`;
        if(attackRoll.total === 20){
            if(attackRoll.parts[0].rolls[i].discarded){
            messageContent += `<span class="beyond20-roll-detail-critical beyond20-roll-detail-discarded">${attackRoll.parts[0].rolls[i].roll + fullAttackMod}</span>`;
            }
            else{
            messageContent += `<span class="beyond20-roll-detail-crit">${attackRoll.parts[0].rolls[i].roll + fullAttackMod}</span>`;
            }
            criticalHit = true;
        }
        else if(attackRoll.total === 1){
        if(attackRoll.parts[0].rolls[i].discarded){
            messageContent += `<span class="beyond20-roll-detail-fail beyond20-roll-detail-discarded">${attackRoll.parts[0].rolls[i].roll + fullAttackMod}</span>`;
        }
        else{
            messageContent += `<span class="beyond20-roll-detail-fail">${attackRoll.parts[0].rolls[i].roll + fullAttackMod}</span>`;
        }
        }
        else{
        if(attackRoll.parts[0].rolls[i].discarded){
            messageContent += `<span class="beyond20-roll-detail-normal beyond20-roll-detail-discarded">${attackRoll.parts[0].rolls[i].roll + fullAttackMod}</span>`;
        }
        else{
            messageContent += `<span class="beyond20-roll-detail-normal">${attackRoll.parts[0].rolls[i].roll + fullAttackMod}</span>`;
        }
        }
        
        messageContent += `<span class="dice-roll beyond20-tooltip-content">
        <div class="dice-formula beyond20-roll-formula">${separateDieString} + ${fullAttackMod}</div>
        <div class="dice-tooltip">
            <div class="dice">
            <p class="part-formula">
                ${attackRollString}
                <span class="part-total">
                ${attackRoll.result}
                </span>
            </p>
            <ol class="dice-rolls">`;
            if(attackRoll.parts[0].rolls[i].roll === attackRollDie){
                messageContent += `<li class="roll d20 max">${attackRoll.parts[0].rolls[i].roll}</li>`;
            }
            else if(attackRoll.parts[0].rolls[i].roll === 1){
                messageContent += `<li class="roll d20 min">${attackRoll.parts[0].rolls[i].roll}</li>`;
            }
            else{
                messageContent += `<li class="roll d20">${attackRoll.parts[0].rolls[i].roll}</li>`;
            }
            // attackRoll.parts[0].rolls.forEach(element => messageContent += '<li class="roll d20">' + element.roll + '</li>');
            messageContent += `</ol>
            </div>
        </div>
        </div>
        </span>
    </span>`;
            // </div>`;
        
    }
    let bludgeoningDieCount = 0;
    let lightningDieCount = 0;
    switch (spellLevelSelect) {
      case "level5":
      bludgeoningDieCount = 3;
      lightningDieCount = 5;
      break;
      case "level6":
      bludgeoningDieCount = 4;
      lightningDieCount = 6;
      break;
      default:
        bludgeoningDieCount = 2;
        lightningDieCount = 4;
  }
    
    if(criticalHit){
        damageTypes = [
        {
            damageType : "Bludgeoning",
            dieCount : bludgeoningDieCount,
            dieType : 6,
            hasDamageBonus : false,
            criticalDamage : false
        },
        {
            damageType : "Lightning",
            dieCount : lightningDieCount,
            dieType : 6,
            hasDamageBonus : false,
            criticalDamage : false
        },
        {
            damageType : "Bludgeoning Critical",
            dieCount : bludgeoningDieCount,
            dieType : 6,
            hasDamageBonus : false,
            criticalDamage : true
        },
        {
            damageType : "Lightning Critical",
            dieCount : lightningDieCount,
            dieType : 6,
            hasDamageBonus : false,
            criticalDamage : true
        },
        ];
    }
    else{
        damageTypes = [
          {
            damageType : "Bludgeoning",
            dieCount : bludgeoningDieCount,
            dieType : 6,
            hasDamageBonus : false,
            criticalDamage : false
        },
        {
            damageType : "Lightning",
            dieCount : lightningDieCount,
            dieType : 6,
            hasDamageBonus : false,
            criticalDamage : false
        }
        ];
    }
    messageContent += `</div>`;
    console.log(damageTypes.length);
    console.log(damageTypes.length);

    
    //Weapon Damage
    for(var i = 0; i < damageTypes.length; i++){
      // let hazirawnSlashingDieCount = 2;
      // let hazirawnSlashingDieType = 6;
      console.log("Working on " + damageTypes[i].damageType);
      let rollString = damageTypes[i].dieCount + 'd' + damageTypes[i].dieType;
      let damageRoll = new Roll(rollString);
      damageRoll.roll();
      let combinedDamage = 0;
      
      if(damageTypes[i].hasDamageBonus){
        combinedDamage = damageRoll.total + damageBonus;
      }
      else{
        combinedDamage = damageRoll.total;
      }
      if(!damageTypes[i].criticalDamage && i != 0 && i < damageTypes.length){
        allDamageString += " + ";
      }
      if(!damageTypes[i].criticalDamage){
        allDamage += combinedDamage;
        allDamageString += combinedDamage;
      }
      else if(damageTypes[i].criticalDamage){
        allCriticalDamage += combinedDamage;
        allCriticalDamageString += combinedDamage;
      }
      if(damageTypes[i].criticalDamage && i != 0 && i + 1 < damageTypes.length){
        allCriticalDamageString += " + ";
      }

      let dieMax = false;
      let dieMin = false;

      let messageAddition = '';

      for(var j = 0; j < damageRoll.parts[0].rolls.length; j++){
        if(damageRoll.parts[0].rolls[j].roll === damageTypes[i].dieType){
          messageAddition += `<li class="roll d${damageTypes[i].dieType} max">${damageRoll.parts[0].rolls[j].roll}</li>`;
          dieMax = true;
        }
        else if(damageRoll.parts[0].rolls[j].roll === 1){
          messageAddition += `<li class="roll d${damageTypes[i].dieType} min">${damageRoll.parts[0].rolls[j].roll}</li>`;
          dieMin = true;
        }
        else{
          messageAddition += `<li class="roll d${damageTypes[i].dieType}">${damageRoll.parts[0].rolls[j].roll}</li>`;
        }
      }

      messageContent += `<div class="beyond20-roll-result">
      <b> ${damageTypes[i].damageType} Damage: </b>
      <span class="beyond20-tooltip">`;
      // <span class="beyond20-roll-detail-normal">${damageRoll.total + damageBonus}</span>
      if(dieMax && dieMin){
        if(damageTypes[i].hasDamageBonus){
          messageContent += `<span class="beyond20-roll-detail-crit-fail">${damageRoll.total + damageBonus}</span>`;
        }
        else{
          messageContent += `<span class="beyond20-roll-detail-crit-fail">${damageRoll.total}</span>`;
        }
      }
      else if(dieMax && !dieMin){
        if(damageTypes[i].hasDamageBonus){
          messageContent += `<span class="beyond20-roll-detail-crit">${damageRoll.total + damageBonus}</span>`;
        }
        else{
          messageContent += `<span class="beyond20-roll-detail-crit">${damageRoll.total}</span>`;
        }
      }
      else if(!dieMax && dieMin){
        if(damageTypes[i].hasDamageBonus){
          messageContent += `<span class="beyond20-roll-detail-fail">${damageRoll.total + damageBonus}</span>`;
        }
        else{
          messageContent += `<span class="beyond20-roll-detail-fail">${damageRoll.total}</span>`;
        }
      }
      else{
        if(damageTypes[i].hasDamageBonus){
          messageContent += `<span class="beyond20-roll-detail-normal">${damageRoll.total + damageBonus}</span>`;
        }
        else{
          messageContent += `<span class="beyond20-roll-detail-normal">${damageRoll.total}</span>`;
        }
      }
      messageContent += `<span class="dice-roll beyond20-tooltip-content">`;
      
      if(damageTypes[i].hasDamageBonus){
        messageContent += `<div class="dice-formula beyond20-roll-formula">${rollString} + ${damageBonus}</div>`;
      }
      else{
        messageContent += `<div class="dice-formula beyond20-roll-formula">${rollString}</div>`;
      }
      
      messageContent += `<div class="dice-tooltip">
        <div class="dice">
          <p class="part-formula">
              ${rollString}
              
            <span class="part-total">${damageRoll.total}</span>
          </p>
          <ol class="dice-rolls">`;
          messageContent += messageAddition;            
          // damageRoll.parts[0].rolls.forEach(element => messageContent += '<li class="roll d6">' + element.roll + '</li>');
          messageContent += `</ol>
        </div>
      </div>
      </span>
      </span>
      </div>`;
    }
    
    //Elemental Affinity Damage
    allDamage += elementalAdeptDamageBonus;
    allDamageString += ' + ' + elementalAdeptDamageBonus;
    messageContent += `<div class="beyond20-roll-result">
    <b>Lightning (Elemental Affinity) Damage: </b>
    <span class="beyond20-tooltip">
      <span class="beyond20-roll-detail-normal">5</span>
      <span class="dice-roll beyond20-tooltip-content">
        <div class="dice-formula beyond20-roll-formula">+ ${elementalAdeptDamageBonus}</div>
        <div class="dice-tooltip"></div>
      </span>
    </span>
  </div>`;

    //TODO: Total Damage
    messageContent += `<div class="beyond20-roll-result">
    <b><hr></b>
    </div>
    <div class="beyond20-roll-result">
    <b>Total Damage: </b>
    <span class="beyond20-tooltip">
    <span class="beyond20-roll-detail-normal beyond20-roll-total dice-total">
    ${allDamage}</span>
    <span class="dice-roll beyond20-tooltip-content">
    <div class="dice-formula beyond20-roll-formula">
    ${allDamageString}
    </div>
    <div class="dice-tooltip"></div>
    </span>
    </span>
    </div>

    </div>`;

    //Critical Damge (if it exists)
    if(criticalHit){
      messageContent += `<div class="beyond20-roll-result">
      <b>Total Critical Damage: </b>
      <span class="beyond20-tooltip">
      <span class="beyond20-roll-detail-normal">
      ${allCriticalDamage}</span>
      <span class="dice-roll beyond20-tooltip-content">
      <div class="dice-formula beyond20-roll-formula">
      ${allCriticalDamageString}
      </div>
      <div class="dice-tooltip"></div>
      </span>
      </span>
      </div>

      </div>`;
    }

    // write to chat
      let chatData = {
        content: messageContent
      };
      ChatMessage.create(chatData, {});
    }
  }
}).render(true);