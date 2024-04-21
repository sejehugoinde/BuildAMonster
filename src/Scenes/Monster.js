class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = { sprite: {} };  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.rightHandX = this.bodyX + 110;
        this.rightHandY = this.bodyY + 20;
        this.leftHandX = this.bodyX - 110;
        this.leftHandY = this.bodyY + 20;

        this.leftFootY = this.bodyX + 180;
        this.leftFootX = this.bodyY - 120;
        this.rightFootY = this.bodyX + 180;
        this.rightFootX = this.bodyY + 20;

        // Set initial position for the smile
        this.smileX = this.bodyX;
        this.smileY = this.bodyY + 10; // Adjust the Y position
        this.fangsX = this.bodyX;
        this.fangsY = this.bodyY + 10;

        // Set initial position for the eye
        this.rightEyeX = this.bodyX + 25;
        this.rightEyeY = this.bodyY - 40;
        this.leftEyeX = this.bodyX - 25;
        this.leftEyeY = this.bodyY - 40;

        // Set initial position for the ear
        this.rightEarX = this.bodyX + 70;
        this.rightEarY = this.bodyY - 120;
        this.leftEarX = this.bodyX - 70;
        this.leftEarX = this.bodyY - 120;
        
        this.aKey = null;
        this.dKey = null;

        this.counter = 0;
    }


    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");

        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability
        // Create the main body sprite
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenF.png");

        // Create the sprite for the left and right hands
        my.sprite.rightHand = this.add.sprite(this.rightHandX, this.rightHandY, 'monsterParts', 'arm_greenE.png');
        my.sprite.leftHand = this.add.sprite(this.leftHandX, this.leftHandY, 'monsterParts', 'arm_greenE.png');
        my.sprite.leftHand.flipX = true;   // flip sprite to have thumb on correct side
        my.sprite.rightHand.angle -= 40;
        my.sprite.leftHand.angle += 40;

        // Create the sprite for the right and left foot
        my.sprite.rightFoot = this.add.sprite(this.rightFootX, this.rightFootY, 'monsterParts', 'leg_greenC.png');
        my.sprite.leftFoot = this.add.sprite(this.leftFootX, this.leftFootY, 'monsterParts', 'leg_greenC.png');
        my.sprite.leftFoot.flipX = true;   // flip sprite to have thumb on correct side
        my.sprite.rightFoot.angle -= 20;
        my.sprite.leftFoot.angle += 20;

        // Create the smile sprite and adjust its position and scale
        my.sprite.smile = this.add.sprite(this.smileX, this.smileY, 'monsterParts', 'mouthA.png');
        my.sprite.smile.setScale(0.8); // Adjust scale to make it smaller
        my.sprite.fangs = this.add.sprite(this.fangsX, this.fangsY, 'monsterParts', 'mouthB.png');
        my.sprite.fangs.setScale(0.8); // Adjust scale to make it smaller

        // Since sprites are visible when created and we only want one smile to be shown
        // at a time, make the "fangs" smile not visible to start.
        my.sprite.fangs.visible = false;

        // Create the eye sprite and adjust its position and scale
        my.sprite.rightEye = this.add.sprite(this.rightEyeX, this.rightEyeY, 'monsterParts', 'eye_angry_green.png');
        my.sprite.leftEye = this.add.sprite(this.leftEyeX, this.leftEyeY, 'monsterParts', 'eye_angry_green.png');
        my.sprite.leftEye.flipX = true;   // flip sprite to have eye on correct side
        my.sprite.leftEye.setScale(0.8); // Adjust scale to make it smaller
        my.sprite.rightEye.setScale(0.8); // Adjust scale to make it smaller

        // Create the ear sprite and adjust ist position and scale
        my.sprite.rightEar = this.add.sprite(this.rightEarX, this.rightEarY, 'monsterParts', 'detail_green_eye.png');
        my.sprite.leftEar = this.add.sprite(this.leftEarX, this.leftEarY, 'monsterParts', 'detail_green_eye.png');
        my.sprite.leftEar.flipX = true;   // flip sprite to have eye on correct side

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Event handling for fangs smile
        this.input.keyboard.on('keydown-F', () => {
            my.sprite.smile.visible = false;
            my.sprite.fangs.visible = true;
        })

        // Event handling for regular smile
        this.input.keyboard.on('keydown-S', () => {
            my.sprite.smile.visible = true;
            my.sprite.fangs.visible = false;
        })
    }

    update() {
        let my = this.my; // Create an alias to this.my for readability
    
        // Polling: Check if the 'A' key is currently being pressed
        if (this.aKey.isDown) {
            // If the 'A' key is down, iterate through each sprite in the 'my.sprite' array
            for (const sprite in my.sprite) {
                // Move the sprite to the left by decreasing its x-coordinate
                my.sprite[sprite].x += -0.2;
            }
        }
    
        // Polling: Check if the 'D' key is currently being pressed
        if (this.dKey.isDown) {
            // If the 'D' key is down, iterate through each sprite in the 'my.sprite' array
            for (const sprite in my.sprite) {
                // Move the sprite to the right by increasing its x-coordinate
                my.sprite[sprite].x += 0.2;
            }
        }
    }    
}

