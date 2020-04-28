export default class Card {
    constructor(scene, name, numVal) {
        this.render = (x, y, sprite) => {
            let card = scene.add.image(x, y, sprite).setScale(0.3, 0.3).setInteractive();
            scene.input.setDraggable(card);
            return card;
        };
        this.name = name;
        this.numVal = numVal;
    }
}