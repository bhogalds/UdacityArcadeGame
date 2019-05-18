// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x; // set x location
    this.y = y + 60; // off set to avoid enemy on the water stream
    this.speed = speed; // set the speed
    this.xMove = 101; // setting x-axis move to width of 101 pixels
    this.rightBoundary = this.xMove * 5; // set right bounds to 5 block widths
    this.xStart = -this.xMove; // make start off the canvas by one block width
    this.sprite = 'images/enemy-bug.png'; // set enemy character image
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // 
    if (this.x < this.rightBoundary) { // keep moving until right boundary
        this.x += this.speed * dt;
    }
    else {
        this.x = this.xStart; // go back to starting x location if reached right end
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Prince {
    constructor() {
            this.xMove = 101; // setting move along x-axis to block width pixels
            this.yMove = 83; // setting move along y-axis to block height pixels
            this.xHome = this.xMove * 2; // setting start or home on x to center
            this.yHome = (this.yMove * 4) + 60; // setting start on y home to center
            this.x = this.xHome; // set x and y home to start location
            this.y = this.yHome;
            this.win = false; // init win to false status when game starts
            this.sprite = 'images/char-boy.png'; // Player image
        }
        // this renders the sprite character on the canvas x,y location
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Handle location updates from event listener
    // Takes the input directions and translates to x and y location
    // Also define x and y boundaries to keep the player on the canvas
    // from (0,0) top-left of the canvas

    handleInput(input){
        switch(input){
            case 'left':
                if (this.x > 0){ // Only move left if x is > than 0
                    this.x -= this.xMove;
                }
                break;
            case 'up':
                if (this.y > 0){ // only move up if y is > 0
                    this.y -= this.yMove;
                }
                break;
            case 'right':
                if (this.x < this.xMove * 4){ // only move right if x < than 101 * 4
                    this.x += this.xMove;
                }
                break;
            case 'down':
                if (this.y < this.yMove * 4){ // only move down if y < bottom 83 * 4
                    this.y += this.yMove;
                }
                break;            
        }
    }
    // update function to check for collision with enemy and wins.
    // compare location of all enemies and player 
    // to make the collison real wait till enemy is almost half way into player x,y
    // enemy.x + xMove / 2. On a hit call home to reset the player to starting
    // location. If player locations maps to stream set player.win to true
    // 
    update() {
        for(let enemy of allEnemies){
            if(this.y === enemy.y && (enemy.x + enemy.xMove/2 > this.x && 
                enemy.x < this.x + this.xMove/2)) {
                this.home();
            }
        }
        if(this.y === -23) { // check if the player made it to stream
            this.win = true; // and 
        }
    }

    home(){
        this.x = this.xHome;
        this.y = this.yHome
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Prince();
// instantiate enemey objects arguments x , y, speed
// - minus location has the roaches starting off the canvas on left
// and -101*n spaces, staggers the enemies by varying the off canvas start location
//
const roach1 = new Enemy(-101, 0 , 200);
const roach2 = new Enemy(-101, 83, 300);
const roach3 = new Enemy((-101*2.75), 83, 300);
const roach4 = new Enemy((-101*5),166, 350);
const allEnemies = [];
allEnemies.push(roach1, roach2, roach3, roach4);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

