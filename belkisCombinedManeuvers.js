// setting variables
let allDamage = 0;
let allDamageString = '';
let allCriticalDamage = 0;
let allCriticalDamageString = '';
let belkisStrengthMod = 3;
let proficiencyBonus = 4;
let weaponBonus = 2;
let fullAttackMod = belkisStrengthMod + proficiencyBonus + weaponBonus;
let damageBonus = belkisStrengthMod + weaponBonus;
let criticalHit = false;
let damageTypes = [];

let rollManeuver = false;

new Dialog({
  title: `Maneuvers`,
  content: `
    <form>
      <div class="form-group">
        <label>Maneuvers:</label>
        <select id="maneuvers" name="maneuvers">
            <option value="commandersStrike">Commander's Strike</option>
            <option value="distractingStrike">Distracting Strike</option>
            <option value="feintingAttack">Feinting Attack</option>
            <option value="goadingAttack">Goading Attack</option>
            <option value="riposte" selected>Riposte</option>
        </select>
      </div>
      <div class="form-group">
        <label>Roll Type (Riposte Only):</label>
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
      callback: () => rollManeuver = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel`
    },
  },
  default: "yes",
  close: html => {
    if (rollManeuver) {
    let maneuverSelect = html.find('[name="maneuvers"]')[0].value || "none";
    let messageContent = '';
    // Build Message to Beyond20 Spec
    // Top Details Section
    messageContent += `<div class="beyond20-message">
    <details open>
    <summary><a>Maneuver: `;
    switch (maneuverSelect) {
        case "commandersStrike":
        messageContent += `Commander's Strike`;
        break;
        case "distractingStrike":
        messageContent += `Distracting Strike`;
        break;
        case "feintingAttack":
        messageContent += `Feinting Attack`;
        break;
        case "goadingAttack":
        messageContent += `Goading Attack`;
        break;
        case "riposte":
        messageContent += `Riposte`;
        break;
        default:
    }

    messageContent += `</a></summary>
    <div class="beyond20-description"><b>Description:</b> `;
    
    switch (maneuverSelect) {
        case "commandersStrike":
        messageContent += `When you take the Attack action on your turn, you can forgo one of your attacks and use a bonus action to direct an ally that can see and hear you to strike using its reaction, adding the superiority die to the damage roll.`;
        break;
        case "distractingStrike":
        messageContent += `When you hit with a weapon attack, you can expend one superiority die to add the total to the damage roll and the next attack roll against the target by an attacker other than you has advantage if the attack is made before the start of your next turn.`;
        break;
        case "feintingAttack":
        messageContent += `You can expend one superiority die and use a bonus action on your turn to add the total to the damage roll and to gain advantage on your next attack roll against a chosen creature within 5 ft. this turn.`;
        break;
        case "goadingAttack":
        messageContent += `When you hit with a weapon attack, you can expend one superiority die to add the total to the damage roll and the target must make a WIS saving throw (DC 15). On failure, the target has disadvantage on all attack rolls against targets other than you until the end of your next turn.your `;
        break;
        case "riposte":
        messageContent += `When a creature misses you with a melee attack, you can use your reaction and expend one superiority die to make a melee weapon attack against it (add the superiority die to the attack’s damage roll on hit).`;
        break;
        default:
    }

    messageContent += `</div>
    </details>`;

    //TODO: Attack Roll, currently Riposte ONLY
    
    switch (maneuverSelect) {
        case "riposte":
        //Hazirawn Attack Roll
        let attackRollTypeSelect = html.find('[name="attackRollType"]')[0].value || "none";
        let attackRollDie = 20;
        let hazirawnAttackRoll;
        let attackRollString;
        let attackRollDieCount;

        // let attackRollDieCount = 1;
        if(attackRollTypeSelect === 'advantage'){
          attackRollDieCount = 2;
          attackRollString = attackRollDieCount + 'd' + attackRollDie + 'kh';
          hazirawnAttackRoll = new Roll(attackRollString);
          hazirawnAttackRoll.roll();
        
        }
        else if(attackRollTypeSelect === 'normal'){
          attackRollDieCount = 1;
          attackRollString = attackRollDieCount + 'd' + attackRollDie;
          hazirawnAttackRoll = new Roll(attackRollString);
          hazirawnAttackRoll.roll();
        
        }
        else if(attackRollTypeSelect === 'disadvantage'){
          attackRollDieCount = 2;
          attackRollString = attackRollDieCount + 'd' + attackRollDie + 'kl';
          hazirawnAttackRoll = new Roll(attackRollString);
          hazirawnAttackRoll.roll();
        }
        
        let separateDieString = attackRollDieCount + 'd' + attackRollDie;

        messageContent += `<div class="beyond20-roll-result beyond20-roll-cells">`;
        
        // hazirawnAttackRoll.parts[0].rolls.foreach(element => {
        for(var i = 0; i < hazirawnAttackRoll.parts[0].rolls.length; i++){
          messageContent += `<div class="beyond20-roll-cell">
          <span class="beyond20-tooltip">`;
          if(hazirawnAttackRoll.total === 20){
              if(hazirawnAttackRoll.parts[0].rolls[i].discarded){
                messageContent += `<span class="beyond20-roll-detail-critical beyond20-roll-detail-discarded">${hazirawnAttackRoll.parts[0].rolls[i].roll + fullAttackMod}</span>`;
              }
              else{
                messageContent += `<span class="beyond20-roll-detail-crit">${hazirawnAttackRoll.parts[0].rolls[i].roll + fullAttackMod}</span>`;
              }
              criticalHit = true;
          }
          else if(hazirawnAttackRoll.total === 1){
            if(hazirawnAttackRoll.parts[0].rolls[i].discarded){
              messageContent += `<span class="beyond20-roll-detail-fail beyond20-roll-detail-discarded">${hazirawnAttackRoll.parts[0].rolls[i].roll + fullAttackMod}</span>`;
            }
            else{
              messageContent += `<span class="beyond20-roll-detail-fail">${hazirawnAttackRoll.parts[0].rolls[i].roll + fullAttackMod}</span>`;
            }
          }
          else{
            if(hazirawnAttackRoll.parts[0].rolls[i].discarded){
              messageContent += `<span class="beyond20-roll-detail-normal beyond20-roll-detail-discarded">${hazirawnAttackRoll.parts[0].rolls[i].roll + fullAttackMod}</span>`;
            }
            else{
              messageContent += `<span class="beyond20-roll-detail-normal">${hazirawnAttackRoll.parts[0].rolls[i].roll + fullAttackMod}</span>`;
            }
          }
          
          messageContent += `<span class="dice-roll beyond20-tooltip-content">
            <div class="dice-formula beyond20-roll-formula">${separateDieString} + ${fullAttackMod}</div>
            <div class="dice-tooltip">
              <div class="dice">
                <p class="part-formula">
                  ${attackRollString}
                  <span class="part-total">
                  ${hazirawnAttackRoll.result}
                  </span>
                </p>
                <ol class="dice-rolls">`;
                if(hazirawnAttackRoll.parts[0].rolls[i].roll === attackRollDie){
                  messageContent += `<li class="roll d20 max">${hazirawnAttackRoll.parts[0].rolls[i].roll}</li>`;
                }
                else if(hazirawnAttackRoll.parts[0].rolls[i].roll === 1){
                  messageContent += `<li class="roll d20 min">${hazirawnAttackRoll.parts[0].rolls[i].roll}</li>`;
                }
                else{
                  messageContent += `<li class="roll d20">${hazirawnAttackRoll.parts[0].rolls[i].roll}</li>`;
                }
                // hazirawnAttackRoll.parts[0].rolls.forEach(element => messageContent += '<li class="roll d20">' + element.roll + '</li>');
                messageContent += `</ol>
              </div>
            </div>
            </div>
          </span>
        </span>`;
              // </div>`;
          
        }
        if(criticalHit){
          damageTypes = [
            {
              damageType : "Slashing",
              dieCount : 2,
              dieType : 6,
              hasDamageBonus : true,
              criticalDamage : false
            },
            {
              damageType : "Necrotic",
              dieCount : 2,
              dieType : 6,
              hasDamageBonus : false,
              criticalDamage : false
            },
            {
              damageType : "Superiority",
              dieCount : 1,
              dieType : 8,
              hasDamageBonus : false,
              criticalDamage : false
            },
            {
              damageType : "Slashing Critical",
              dieCount : 2,
              dieType : 6,
              hasDamageBonus : false,
              criticalDamage : true
            },
            {
              damageType : "Necrotic Critical",
              dieCount : 2,
              dieType : 6,
              hasDamageBonus : false,
              criticalDamage : true
            },
            {
              damageType : "Superiority Critical",
              dieCount : 1,
              dieType : 8,
              hasDamageBonus : false,
              criticalDamage : true
            }
          ];
        }
        else{
          damageTypes = [
            {
              damageType : "Slashing",
              dieCount : 2,
              dieType : 6,
              hasDamageBonus : true
            },
            {
              damageType : "Necrotic",
              dieCount : 2,
              dieType : 6,
              hasDamageBonus : false
            },
            {
              damageType : "Superiority",
              dieCount : 1,
              dieType : 8,
              hasDamageBonus : false
            }
          ];
        }
        messageContent += `</div>`;
        console.log(damageTypes.length);
        break;
        default:
          damageTypes = [
            {
              damageType : "Superiority",
              dieCount : 1,
              dieType : 8,
              hasDamageBonus : false
            }
          ];
          console.log(damageTypes.length);
    }
    
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
      <b>Total Damage: </b>
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