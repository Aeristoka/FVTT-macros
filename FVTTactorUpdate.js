for ( let a of game.actors.entities ) {
    let token = duplicate(a.data.token);
    token.name = a.data.name;
    token.img = a.data.img;
    token.bar1 = {attribute: "attributes.hp"};
    token.bar2 = {attribute: ""};
    token.displayBars = CONST.TOKEN_DISPLAY_MODES.OWNER;
    token.displayName = CONST.TOKEN_DISPLAY_MODES.OWNER;
    await a.update({token: token});
}