import Card from './card';

export default class Dealer {
    constructor(scene) {
        this.dealCards = (dropZone) => {
            /*
            let playerSprite;
            let opponentSprite;
            if (scene.isPlayerA) {
                playerSprite = 'cyanCardFront';
                opponentSprite = 'cardBack';
            } else {
                playerSprite = 'magentaCardFront';
                opponentSprite = 'cardBack';
            };
            */
           //let hand = [];
           // distribute cards to each player
           for (let i = 0; i < 3; i++) {
                let playerCard = this.deck.shift();
                playerCard.render(475 + (i * 100), 650, playerCard.name);
                //hand.push(playerCard);
                let opponentCard = this.deck.shift();
                scene.opponentHand.push(opponentCard.render(475 + (i * 100), 125, 'Card Back').disableInteractive());
            }
            
            // distribute cards to the field
            for (let i = 0; i < 4; i++) {
                let card = this.deck.shift();
                card.render(((dropZone.x - 375) + (dropZone.data.values.cards * 120)), (dropZone.y), card.name).disableInteractive();
                //scene.input.setDraggable(card.name, false);
                dropZone.data.values.cards++;
            }
           console.log(this.deck);
           //return hand;
        }
        this.deck = [];
        this.deck = this.setupDeck(scene);  
    }

    setupDeck(scene) {
        this.deck.push(new Card(scene, "Ace of Swords", 1));
        this.deck.push(new Card(scene, "Two of Swords", 2));
        this.deck.push(new Card(scene, "Three of Swords", 3));
        this.deck.push(new Card(scene, "Four of Swords",  4));
        this.deck.push(new Card(scene, "Five of Swords", 5));
        this.deck.push(new Card(scene, "Six of Swords", 6));
        this.deck.push(new Card(scene, "Seven of Swords", 7));
        this.deck.push(new Card(scene, "Queen of Swords", 8));
        this.deck.push(new Card(scene, "Jack of Swords", 9));
        this.deck.push(new Card(scene, "King of Swords", 10));
        this.deck.push(new Card(scene, "Ace of Cups", 1));
        this.deck.push(new Card(scene, "Two of Cups", 2));
        this.deck.push(new Card(scene, "Three of Cups", 3));
        this.deck.push(new Card(scene, "Four of Cups", 4));
        this.deck.push(new Card(scene, "Five of Cups", 5));
        this.deck.push(new Card(scene, "Six of Cups", 6));
        this.deck.push(new Card(scene, "Seven of Cups", 7));
        this.deck.push(new Card(scene, "Queen of Cups", 8));
        this.deck.push(new Card(scene, "Jack of Cups", 9));
        this.deck.push(new Card(scene, "King of Cups", 10));
        this.deck.push(new Card(scene, "Ace of Clubs", 1));
        this.deck.push(new Card(scene, "Two of Clubs", 2));
        this.deck.push(new Card(scene, "Three of Clubs", 3));
        this.deck.push(new Card(scene, "Four of Clubs", 4));
        this.deck.push(new Card(scene, "Five of Clubs", 5));
        this.deck.push(new Card(scene, "Six of Clubs", 6));
        this.deck.push(new Card(scene, "Seven of Clubs", 7));
        this.deck.push(new Card(scene, "Queen of Clubs", 8));
        this.deck.push(new Card(scene, "Jack of Clubs", 9));
        this.deck.push(new Card(scene, "King of Clubs", 10));
        this.deck.push(new Card(scene, "Ace of Gold", 1));
        this.deck.push(new Card(scene, "Two of Gold", 2));
        this.deck.push(new Card(scene, "Three of Gold", 3));
        this.deck.push(new Card(scene, "Four of Gold", 4));
        this.deck.push(new Card(scene, "Five of Gold", 5));
        this.deck.push(new Card(scene, "Six of Gold", 6));
        this.deck.push(new Card(scene, "Seven of Gold", 7));
        this.deck.push(new Card(scene, "Queen of Gold", 8));
        this.deck.push(new Card(scene, "Jack of Gold", 9));
        this.deck.push(new Card(scene, "King of Gold", 10));
        this.shuffleDeck();
        return this.deck;
    }

    shuffleDeck() {
        // https://www.frankmitchell.org/2015/01/fisher-yates/
        var i = 0
        , j = 0
        , temp = null

        for (i = this.deck.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }
}

