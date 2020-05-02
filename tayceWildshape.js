let applyChanges = false;
new Dialog({
  title: `Wildshape`,
  content: `
    <form>
      <div class="form-group">
        <label>Wildshape Form:</label>
        <select id="wildshape-form" name="wildshape-form">
          <option value="brownBear">Brown Bear</option>
          <option value="wolf">Wolf</option>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply Changes`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel Changes`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      for ( let token of canvas.tokens.controlled ) {
        let wildshapeType = html.find('[name="wildshape-form"]')[0].value || "none";
        let wildshape = {};
        // Get Wildshape Actors
        switch (wildshapeType) {
          case "brownBear":
            wildshape = game.actors.entities.find(a => a.name === "Brown Bear");
            break;
          case "wolf":
            wildshape = game.actors.entities.find(a => a.id === "TXmf0eh94tEKHHqA");
            break;
          case "nochange":
          default:
            
        }
        // Update Token
        console.log(token);
        actor.transformInto(wildshape);
      }
    }
  }
}).render(true);