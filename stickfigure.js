class Figure {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        
        this.state = 0; //0 = running, 1 = jumping, 2 = falling, 3 = sliding
        this.facing = 0; //0 = left, 1 = right
        this.light = 0; //0 = light mode, 1 =  dark-mode
        
        this.animations = [];

        this.scale = 0.5;



        this.x = 0;
        this.y = 20;
        this.speed = 220;

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
        this.animations[0][0][0] = new Animator(ASSET_MANAGER.getAsset("./images/run-white.png"), 67, 27, 201, 208, 5, 0.08, false, true);
        this.animations[0][1][0] = new Animator(ASSET_MANAGER.getAsset("./images/jump-white.png"), 67, 27, 201, 208, 5, 0.08, false, true);
        this.animations[0][2][0] = new Animator(ASSET_MANAGER.getAsset("./images/fall-white.png"), 67, 27, 201, 208, 5, 0.08, false, true);
        this.animations[0][3][0] = new Animator(ASSET_MANAGER.getAsset("./images/sliding-white.png"), 67, 27, 201, 208, 5, 0.08, false, true);

        //light mode facing left
        this.animations[1][0][0] = new Animator(ASSET_MANAGER.getAsset("./images/run-white-flipped.png"), 67, 27, 201, 208, 5, 0.08, true, true);
        this.animations[1][1][0] = new Animator(ASSET_MANAGER.getAsset("./images/jump-white-flipped.png"), 67, 27, 201, 208, 5, 0.08, true, true);
        this.animations[1][2][0] = new Animator(ASSET_MANAGER.getAsset("./images/fall-white-flipped.png"), 67, 27, 201, 208, 5, 0.08, true, true);
        this.animations[1][3][0] = new Animator(ASSET_MANAGER.getAsset("./images/sliding-white-flipped.png"), 67, 27, 201, 208, 5, 0.08, true, true);

        

    }

    update() {
        this.x += this.speed * this.game.clockTick;
        //if they go across the screen, just set it back to beginning!
        if (this.x > 1300) {
            this.x = 0;
        }
        console.log("ello mate");
    }

    draw(ctx) {
        this.animations[this.facing][this.state][this.light].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }
}