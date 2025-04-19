class Figure {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        
        this.state = 0; //0 = running, 1 = jumping, 2 = falling, 3 = sliding
        this.facing = 0; //0 = left, 1 = right
        this.light = 0; //0 = light mode, 1 =  dark-mode
        
        this.animations = [];

        this.scale = 0.5;



        this.x = -250; //-250
        this.y = 428;
        this.speed = 300;

            // Add physics properties
        this.velocity = 0;
        this.gravity = 980; // Adjust as needed
        this.jumpPower = -525; // Negative because y decreases as you go up

        this.loadAnimations();
    }


    loadAnimations () {
        for (var i = 0; i < 2; i++) {
            this.animations.push([]);
            for (var j = 0; j < 4; j++) {
                this.animations[i].push([]);
                for (var k = 0; k < 2; k++) {
                    this.animations[i][j].push([]);
                }
            }
        }
        
        //light mode facing right
        this.animations[0][0][0] = new Animator(ASSET_MANAGER.getAsset("./images/run-white.png"), 67, 27, 201, 208, 6, 0.08, false, true);
        this.animations[0][1][0] = new Animator(ASSET_MANAGER.getAsset("./images/jump-white.png"), 0, 30, 188, 208, 1, 1, false, true);
        this.animations[0][2][0] = new Animator(ASSET_MANAGER.getAsset("./images/fall-white.png"), -25, 20, 170, 175, 3, 0.3, false, true);
        this.animations[0][3][0] = new Animator(ASSET_MANAGER.getAsset("./images/slide-white.png"), 17, 30, 204, 175, 3, 0.6, false, true);

        //light mode facing left
        this.animations[1][0][0] = new Animator(ASSET_MANAGER.getAsset("./images/run-white-flipped.png"), -7, 27, 201, 208, 5, 0.08, true, true);
        this.animations[1][1][0] = new Animator(ASSET_MANAGER.getAsset("./images/jump-white-flipped.png"), 687, 30, 188, 208, 1, 1, true, true); //work on left features
        this.animations[1][2][0] = new Animator(ASSET_MANAGER.getAsset("./images/fall-white-flipped.png"), 365, 20, 170, 175, 3, 0.3, true, true);
        this.animations[1][3][0] = new Animator(ASSET_MANAGER.getAsset("./images/slide-white-flipped.png"), 102, 30, 204, 175, 3, 0.6, true, true);

        // this.sit = new Animator()

        

    }

    update() {
        // Update position based on current state
        if (this.facing == 0) {
            // Always update horizontal position
            this.x += this.speed * this.game.clockTick;
            
            if (this.state == 0) { // Running
                if (this.x >= 350 && this.x <= 820) { //when we want to jump
                    this.state = 1; // Change to jumping
                    this.velocity = this.jumpPower; // Apply initial jump velocity
                }
                if (this.x > 1300) {
                    this.facing = 1;
                }
            } else if (this.state == 1 || this.state == 2) { // Jumping or falling
                // Apply gravity to velocity
                this.velocity += this.gravity * this.game.clockTick;
                
                // Update position based on velocity
                this.y += this.velocity * this.game.clockTick;
                
                // Change state based on velocity direction
                if (this.velocity < 0) {
                    this.state = 1; // Moving upward = jumping
                } else {
                    this.state = 2; // Moving downward = falling
                }
                
                // Check if we've landed
                if (this.y >= 428) { // Your ground level
                    console.log("hello");
                    this.y = 428;
                    this.velocity = 0;
                    // this.state = 0; // Back to running when we land
                    this.state = 3;
                }
            } else if (this.state == 3) {
                this.x += (this.speed / 3) * this.game.clockTick;
                if (this.x >= 820) {
                    this.state = 0;
                }
            }
        } else if (this.facing == 1) { // LEFT-FACING
            // Always update horizontal position when running (negative for left)
            this.x -= this.speed * this.game.clockTick;
            
            if (this.state == 0) { // Running
                if (this.x <= 665 && this.x >= 350) { // Jump zone going left
                    this.state = 1; // Change to jumping
                    this.velocity = this.jumpPower; // Apply initial jump velocity
                }
                if (this.x < -250) {
                    this.facing = 0; // Switch direction when reaching left edge
                }
            } else if (this.state == 1 || this.state == 2) { // Jumping or falling
                
                // Apply gravity to velocity
                this.velocity += this.gravity * this.game.clockTick;
                
                // Update position based on velocity
                this.y += this.velocity * this.game.clockTick;
                
                // Change state based on velocity direction
                if (this.velocity < 0) {
                    this.state = 1; // Moving upward = jumping
                } else {
                    this.state = 2; // Moving downward = falling
                }
                
                // Check if we've landed
                if (this.y >= 428) { // Your ground level
                    this.y = 428;
                    this.velocity = 0;
                    this.state = 3; // Slide after landing
                }
            } else if (this.state == 3) { // Sliding
                this.x -= (this.speed / 3) * this.game.clockTick;
                if (this.x <= 200) {
                    this.state = 0; // Back to running
                }
            }
        }
    }

    draw(ctx) {
        if (this.state == 3) {
            this.animations[this.facing][this.state][this.light].drawFrame(this.game.clockTick, ctx, this.x, this.y - 11, 0.6);
        } else {
            this.animations[this.facing][this.state][this.light].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        }
    
    }
}