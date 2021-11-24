import PlayScene from "./play-scene";
import PlayScene2 from "./play-scene2";

var lvl1trigger = false;
var lvl2trigger = false;

class PreloadScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    create() {
        // Det går att göra så att input lyssnar på spelet
        // nu är det på scenen, därför behöver vi skapa input igen
        this.keyObjW = this.input.keyboard.addKey('W', true, false);
        this.keyObjR = this.input.keyboard.addKey('R', true, false);

        // spelets config om vi behöver något från den, som width height
        // console.log(this.game.config)
        // skapa texten för PAUSED
        // använder en font som laddats i base.njk från Google fonts
        // fixedW/H används för  att kunna centrera texten på skärmen
        this.text = this.add.text(0, (this.game.config.height / 2) - 64, 'Start Screen', {
            fontFamily: '"Mochiy Pop P One"',
            fontSize: '64px',
            fill: '#ff0000',
            align: 'center',
            fixedWidth: this.game.config.width,
            fixedHeight: this.game.config.height,
        });

        var lvl1 = this.add.sprite(this.game.config.width / 2, (this.game.config.height / 2) + 64, 'spike').setInteractive();
        var lvl2 = this.add.sprite(this.game.config.width / 2, (this.game.config.height / 2) + 128, 'player').setInteractive();

        lvl1.on('pointerdown', function(pointer){
            lvl1trigger = true;
        });
        lvl2.on('pointerdown', function(pointer){
            lvl2trigger = true;
        });
    }

    // scenens uppdate metod, lyssnar på keyDown
    update() {
        //setVisible och launch fungerar enbart i update tror jag så därför använder jag trigger variablerna
        if(lvl1trigger) {
            lvl1trigger = false;
            this.scene.setVisible(false);
            this.scene.launch('PlayScene')
        }
        if(lvl2trigger) {
            lvl2trigger = false;
            this.scene.setVisible(false);
            this.scene.launch('PlayScene2');
        }
    }
}

export default PreloadScene;
