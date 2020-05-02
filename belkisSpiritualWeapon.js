// setting variables
let allDamage = 0;
let allDamageString = '';
let allCriticalDamage = 0;
let allCriticalDamageString = '';
let belkisWisdomMod = 2;
let proficiencyBonus = 4;
let weaponBonus = 0;
let fullAttackMod = belkisWisdomMod + proficiencyBonus + weaponBonus;
let damageBonus = belkisWisdomMod + weaponBonus;
let criticalHit = false;
let damageTypes = [];

let rollAttack = false;

new Dialog({
  title: `Maneuvers`,
  content: `
    <form>
      <div class="form-group">
        <label>Roll Type:</label>
        <select id="attackRollType" name="attackRollType">
            <option value="advantage">Advantage</option>
            <option value="normal" selected>Normal</option>
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
    // let maneuverSelect = html.find('[name="maneuvers"]')[0].value || "none";
    let messageContent = '';
    // Build Message to Beyond20 Spec
    // Top Details Section
    messageContent += `<div class="beyond20-message">
    <details>
	<summary>
		<a>Spiritual Weapon</a>
	</summary>
	<table>
		<tbody>
			<tr>
				<td>
					<i>2nd Level Evocation</i>
				</td>
			</tr>
			<tr>
				<td>
					<b>Casting Time</b>
				</td>
				<td>1 bonus action</td>
			</tr>
			<tr>
				<td>
					<b>Range</b>
				</td>
				<td>60ft.</td>
			</tr>
			<tr>
				<td>
					<b>Duration</b>
				</td>
				<td>1 minute</td>
			</tr>
			<tr>
				<td>
					<b>Components</b>
				</td>
				<td>V, S</td>
			</tr>
		</tbody>
	</table>
	<div class="beyond20-description">You create a floating, spectral weapon within range that lasts for the duration or until you cast this spell again. When you cast the spell, you can make a melee spell attack against a creature within 5 feet of the weapon. On a hit, the target takes force damage equal to 
		<span class="ct-beyond20-custom-roll">
			<strong>1d8</strong>
			<img class="ct-beyond20-custom-icon" src="chrome-extension://ebbbbblpklcekehepklhakoacmdacjpa/images/icons/icon16.png" style="margin-right:3px;margin-left:3px;border:0px">
				<span class="beyond20-roll-formula" style="display:none">1d8</span>
			</span> + your spellcasting ability modifier.
			<br>As a bonus action on your turn, you can move the weapon up to 20 feet and repeat the attack against a creature within 5 feet of it.
				<br>The weapon can take whatever form you choose. Clerics of deities who are associated with a particular weapon (as St. Cuthbert is known for his mace and Thor for his hammer) make this spell's effect resemble that weapon.
					<br>
						<br>
							<b>At Higher levels.</b> When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 
							<span class="ct-beyond20-custom-roll">
								<strong>1d8</strong>
								<img class="ct-beyond20-custom-icon" src="chrome-extension://ebbbbblpklcekehepklhakoacmdacjpa/images/icons/icon16.png" style="margin-right:3px;margin-left:3px;border:0px">
									<span class="beyond20-roll-formula" style="display:none">1d8</span>
								</span> for every two slot levels above 2nd.
							</div>
						</details>`;

    //TODO: Attack Roll, currently Riposte ONLY
    
    //Hazirawn Attack Roll
        let attackRollTypeSelect = html.find('[name="attackRollType"]')[0].value || "none";
        let attackRollDie = 20;
        let attackRoll;
        let attackRollString;
        let attackRollDieCount;

        // let attackRollDieCount = 1;
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
        if(criticalHit){
          damageTypes = [
            {
              damageType : "Force",
              dieCount : 1,
              dieType : 8,
              hasDamageBonus : true,
              criticalDamage : false
            },
            {
              damageType : "Force Critical",
              dieCount : 2,
              dieType : 6,
              hasDamageBonus : false,
              criticalDamage : true
            }
          ];
        }
        else{
          damageTypes = [
            {
                damageType : "Force",
                dieCount : 1,
                dieType : 8,
                hasDamageBonus : true,
                criticalDamage : false
            }
          ];
        }
        messageContent += `</div>`;
        
          console.log(damageTypes.length);
    
    
    //Weapon Damage
    for(var i = 0; i < damageTypes.length; i++){
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
    // messageContent += `<div class="beyond20-roll-result">
    // <b><hr></b>
    // </div>
    // <div class="beyond20-roll-result">
    // <b>Total Damage: </b>
    // <span class="beyond20-tooltip">
    // <span class="beyond20-roll-detail-normal beyond20-roll-total dice-total">
    // ${allDamage}</span>
    // <span class="dice-roll beyond20-tooltip-content">
    // <div class="dice-formula beyond20-roll-formula">
    // ${allDamageString}
    // </div>
    // <div class="dice-tooltip"></div>
    // </span>
    // </span>
    // </div>

    // </div>`;

    //Critical Damge (if it exists)
    // if(criticalHit){
    //   messageContent += `<div class="beyond20-roll-result">
    //   <b>Total Critical Damage: </b>
    //   <span class="beyond20-tooltip">
    //   <span class="beyond20-roll-detail-normal">
    //   ${allCriticalDamage}</span>
    //   <span class="dice-roll beyond20-tooltip-content">
    //   <div class="dice-formula beyond20-roll-formula">
    //   ${allCriticalDamageString}
    //   </div>
    //   <div class="dice-tooltip"></div>
    //   </span>
    //   </span>
    //   </div>

    //   </div>`;
    // }

    // write to chat
      let chatData = {
        content: messageContent
      };
      ChatMessage.create(chatData, {});
    }
  }
}).render(true);