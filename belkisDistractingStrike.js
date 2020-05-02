{
    // setting variables
    let all_dmg = 0;
    // Sup Dice Roll
    let supDiceCount = '1';
    let supDiceType = 'd8';
    let supDiceRollFormula = supDiceCount + supDiceType;
    let supDiceRoll = new Roll(supDiceRollFormula);
    supDiceRoll.roll();

    all_dmg += supDiceRoll.total;
    
    let messageContent = '<div class="beyond20-message">';
    messageContent += '<details open>';
    messageContent += '<summary><a>Maneuver: Distracting Strike</a></summary>';
    messageContent += '<div class="beyond20-description"><b>Description:</b> When you hit with a weapon attack, you can expend one superiority die to add the total to the damage roll and the next attack roll against the target by an attacker other than you has advantage if the attack is made before the start of your next turn.</div>';
    messageContent += '</details>';
    
    
    
    messageContent += '<div class="beyond20-roll-result">';
    messageContent += '<b>Slashing Damage: </b>';
    messageContent += '<span class="beyond20-tooltip">';

    messageContent += '<span class="beyond20-roll-detail-normal">' + supDiceRoll.result + '</span>';

    messageContent += '<span class="dice-roll beyond20-tooltip-content">';
    messageContent += '<div class="dice-formula beyond20-roll-formula">' + supDiceRollFormula + '</div>';
    messageContent += '<div class="dice-tooltip">';
    messageContent += '<div class="dice">';
    messageContent += '<p class="part-formula">';
    messageContent += supDiceRollFormula;
    messageContent += '<span class="part-total">' + supDiceRoll.result + '</span>';
    messageContent += '</p>';
    messageContent += '<ol class="dice-rolls">';
    supDiceRoll.parts[0].rolls.forEach(element => messageContent += '<li class="roll ' + supDiceType + '">' + element.roll + '</li>');
    supDiceRoll.parts[0].rolls.forEach(element => console.log(element.roll));
    messageContent += '</ol>'
    messageContent += '</div>'
    messageContent += '</div>'
    messageContent += '</span>'
    messageContent += '</span>';
    messageContent += '</div>';

    messageContent += '<div class="beyond20-roll-result">';
    messageContent += '<b><hr></b>';
    messageContent += '</div>';
    messageContent += '<div class="beyond20-roll-result">';
    messageContent += '<b>Total Damage: </b>';
    messageContent += '<span class="beyond20-tooltip">';
    messageContent += '<span class="beyond20-roll-detail-normal beyond20-roll-total dice-total">' + all_dmg + '</span>';
    messageContent += '<span class="dice-roll beyond20-tooltip-content">';
    messageContent += '<div class="dice-formula beyond20-roll-formula">' + supDiceRoll.result + '</div>'
    messageContent += '<div class="dice-tooltip"></div>'
    messageContent += '</span>'
    messageContent += '</span>'
    messageContent += '</div>'

    messageContent += '</div>';
    
    // write to chat
      let chatData = {
        content: messageContent
      };
      ChatMessage.create(chatData, {});
    }