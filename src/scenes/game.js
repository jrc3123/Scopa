import io from 'socket.io-client';
import Card from '../helpers/card';
import Dealer from "../helpers/dealer";
import Zone from '../helpers/zone';

// https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
/*
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};*/


export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        /*
        this.load.image('cyanCardFront', 'src/assets/CyanCardFront.png');
        this.load.image('cyanCardBack', 'src/assets/CyanCardBack.png');
        this.load.image('magentaCardFront', 'src/assets/magentaCardFront.png');
        this.load.image('magentaCardBack', 'src/assets/magentaCardBack.png');
        */
        this.load.image('Card Back', 'src/assets/cards/Card Back.jpg');
        this.load.image('Ace of Swords', 'src/assets/cards/ace of swords.jpg');
        this.load.image('Two of Swords', 'src/assets/cards/two of swords.jpg');
        this.load.image('Three of Swords', 'src/assets/cards/three of swords.jpg');
        this.load.image('Four of Swords', 'src/assets/cards/four of swords.jpg');
        this.load.image('Five of Swords', 'src/assets/cards/five of swords.jpg');
        this.load.image('Six of Swords', 'src/assets/cards/six of swords.jpg');
        this.load.image('Seven of Swords', 'src/assets/cards/seven of swords.jpg');
        this.load.image('Queen of Swords', 'src/assets/cards/queen of swords.jpg');
        this.load.image('Jack of Swords', 'src/assets/cards/jack of swords.jpg');
        this.load.image('King of Swords', 'src/assets/cards/king of swords.jpg');
        this.load.image('Ace of Cups', 'src/assets/cards/ace of cups.jpg');
        this.load.image('Two of Cups', 'src/assets/cards/two of cups.jpg');
        this.load.image('Three of Cups', 'src/assets/cards/three of cups.jpg');
        this.load.image('Four of Cups', 'src/assets/cards/four of cups.jpg');
        this.load.image('Five of Cups', 'src/assets/cards/five of cups.jpg');
        this.load.image('Six of Cups', 'src/assets/cards/six of cups.jpg');
        this.load.image('Seven of Cups', 'src/assets/cards/seven of cups.jpg');
        this.load.image('Queen of Cups', 'src/assets/cards/queen of cups.jpg');
        this.load.image('Jack of Cups', 'src/assets/cards/jack of cups.jpg');
        this.load.image('King of Cups', 'src/assets/cards/king of cups.jpg');
        this.load.image('Ace of Clubs', 'src/assets/cards/ace of clubs.jpg');
        this.load.image('Two of Clubs', 'src/assets/cards/two of clubs.jpg');
        this.load.image('Three of Clubs', 'src/assets/cards/three of clubs.jpg');
        this.load.image('Four of Clubs', 'src/assets/cards/four of clubs.jpg');
        this.load.image('Five of Clubs', 'src/assets/cards/five of clubs.jpg');
        this.load.image('Six of Clubs', 'src/assets/cards/six of clubs.jpg');
        this.load.image('Seven of Clubs', 'src/assets/cards/seven of clubs.jpg');
        this.load.image('Queen of Clubs', 'src/assets/cards/queen of clubs.jpg');
        this.load.image('Jack of Clubs', 'src/assets/cards/jack of clubs.jpg');
        this.load.image('King of Clubs', 'src/assets/cards/king of clubs.jpg');
        this.load.image('Ace of Gold', 'src/assets/cards/ace of gold.jpg');
        this.load.image('Two of Gold', 'src/assets/cards/two of gold.jpg');
        this.load.image('Three of Gold', 'src/assets/cards/three of gold.jpg');
        this.load.image('Four of Gold', 'src/assets/cards/four of gold.jpg');
        this.load.image('Five of Gold', 'src/assets/cards/five of gold.jpg');
        this.load.image('Six of Gold', 'src/assets/cards/six of gold.jpg');
        this.load.image('Seven of Gold', 'src/assets/cards/seven of gold.jpg');
        this.load.image('Queen of Gold', 'src/assets/cards/queen of gold.jpg');
        this.load.image('Jack of Gold', 'src/assets/cards/jack of gold.jpg');
        this.load.image('King of Gold', 'src/assets/cards/king of gold.jpg');
    }

    create() {
        this.isPlayerA = false;
        this.opponentHand = [];
        //this.hand = [];

        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        this.dealer = new Dealer(this);
        let self = this;

        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
            console.log('Connected!');
        });

        this.socket.on('isPlayerA', function () {
            self.isPlayerA = true;
            console.log("You are Player A");
        })

        this.socket.on('dealCards', function () {
            self.dealer.dealCards(self.dropZone);
            self.dealText.disableInteractive();
        })

        this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
            let sprite = gameObject.textureKey;
            if (isPlayerA !== self.isPlayerA) {
                self.opponentHand.shift().destroy();
                console.log("The opponent just played a card");
                self.dropZone.data.values.cards++;
                let card = new Card(self);
                card.render(((self.dropZone.x - 375) + (self.dropZone.data.values.cards * 120)), (self.dropZone.y), sprite).disableInteractive();
            }
            else {
                console.log("You have just played a card");
                //self.hand.remove(self.hand.find(element => element.name = sprite));
                //console.log(self.hand);
                if(self.opponentHand.length == 0) {
                    self.socket.emit("dealCards");
                }
            }
            
        })

        this.dealText = this.add.text(75, 350, ['START ROUND']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

        this.dealText.on('pointerdown', function () {
            self.socket.emit("dealCards");
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 120);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
            self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
        })
    }

    update() {
        
    }

    startGame() {

    }
}