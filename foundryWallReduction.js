// let sceneName = "Fortress (Bottom)"
// let currentScene = game.scenes.entities.find(s => s.name === sceneName);
let currentScene = canvas.scene;
console.log(currentScene.name);
console.log(`before cleanup there are ${currentScene.data.walls.length} walls`, 10);
console.log(`after cleanup there are ${await MergeWalls().filter(currentScene)} walls`);
