let applyChanges = false;
new Dialog({
  title: `Wildshape`,
  content: `
    <form>
      <div class="form-group">
        <label>Wildshape Form:</label>
        <select id="wildshape-form" name="wildshape-form">
          <option value="blackBear">Black Bear</option>
          <option value="brownBear">Brown Bear</option>
          <option value="cat">Cat</option>
          <option value="caveBear">Cave Bear</option>
          <option value="giantSpider">Giant Spider</option>
          <option value="panther">Panther</option>
          <option value="rhinoceros">Rhinoceros</option>
          <option value="spider">Spider</option>
          <option value="tiger">Tiger</option>
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
          case "blackBear":
            wildshape = game.actors.entities.find(a => a.name === "Black Bear");
            break;
          case "brownBear":
            wildshape = game.actors.entities.find(a => a.name === "Brown Bear");
            break;
          case "cat":
            wildshape = game.actors.entities.find(a => a.id === "SaYjMQqVq9mEbZOR");
            break;
          case "caveBear":
              wildshape = game.actors.entities.find(a => a.name === "Cave Bear");
              break;
          case "giantSpider":
            wildshape = game.actors.entities.find(a => a.id === "lUJJUinpsXi9zwXA");
            break;
          case "panther":
            wildshape = game.actors.entities.find(a => a.name === "Panther");
            break;
          case "rhinoceros":
            wildshape = game.actors.entities.find(a => a.name === "Rhinoceros");
            break;
          case "spider":
            wildshape = game.actors.entities.find(a => a.name === "Spider");
            break;
          case "tiger":
            wildshape = game.actors.entities.find(a => a.name === "Tiger");
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