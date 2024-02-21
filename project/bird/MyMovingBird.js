import {CGFobject} from '../../lib/CGF.js';

/**
 * MyMovingBird
 * @constructor
 * @param scene - Reference to MyScene object
 * @param bird - Reference to MyBird Object
 * @param pos - position of the bird
 */
export class MyMovingBird  extends CGFobject{
    constructor(scene, bird, pos) {
        super(scene);
        this.bird = bird;
        this.speed = 0;
        this.orientation = 0;
        this.height = 0;
        this.position = pos;
        this.initialPosition = pos;
        this.initialY = pos[1];
        this.turnLeft = false;
        this.turnRight = false;
        this.speedFactor = 1;
        this.scaleFactor = 1;
        this.startTime = Date.now();
        this.amplitude = 0.3;
        this.height = 0;
        this.period = 0;
        this.goingDown = false;
        this.clickedPTime = 0;

        this.egg = null;
        
    }

    /**
     * @method update
     * method that updates the bird's speed and position
     * @param t - speed factor 
     */
    update(t) {
        var dirVector = [Math.sin(this.orientation), this.height, Math.cos(this.orientation)];
        this.speedFactor = t;

        this.position[0] += this.speed * dirVector[0] * t;
        this.position[2] += this.speed * dirVector[2] * t;
        
    }

    /**
     * @method turn
     * Turns bird to the left/right
     * @param angle - angle of rotation
     */
    turn(angle) {

        this.orientation += angle;

        if(angle > 0)
            this.turnRight = true;
        else
            this.turnLeft = true;
    }

    /**
     * @method accelerate
     * Accelerates the bird
     * @param acceleration - how much the bird should accelerate 
     */
    accelerate(acceleration) {

        if(this.speed + acceleration < 0){
            this.speed = 0;
            this.speedFactor = 1;
        }
        else
            this.speed += acceleration;

    }

    /**
     * @method stopTurning
     * Makes the bird stop turning
     */
    stopTurning() {
        this.turnLeft = false;
        this.turnRight = false;
    }

    /**
     * @method reset
     * Resets the bird to a specific position
     * @param position - position to put the bird when it resets 
     */
    reset(position) {
        this.speed = 0;
        this.orientation = 0;
        this.position = position;
        this.turnLeft = false;
        this.turnRight = false;
        this.speedFactor = 1;
        this.goingDown = false;
    }

    /**
     * @method oscillate
     * Oscillate the bird up and down every one second
     */
    oscillate() {

        const now = Date.now();
        const elapsedTime = (now - this.startTime) / 1000; // convert milliseconds to seconds

        // elapsed time after the P key was clicked
        const elapsedPTime = (now - this.clickedPTime) / 1000;

        let period = 1.0; 
        let offsetY = this.initialY;;

        // check if the bird is going down to pick up the bird
        if(this.goingDown) {
            period = 2.0;
            if(elapsedPTime < 1.0)
                offsetY = offsetY - 10.0 * elapsedPTime;
            else if (elapsedPTime < 2.0) 
                offsetY = offsetY - 10.0 * (2.0 - elapsedPTime);

            else {
                this.goingDown = false
            };

        }
        
        const oscillation = Math.sin(elapsedTime * 2 * Math.PI / period);
        this.position[1] = (oscillation * this.amplitude) + offsetY; //update the bird's height

    }

    /**
     * @method pickUpEgg
     * Pick up the Bird Egg
     * @param egg - Reference to the MyBirdEgg object
     */
    pickUpEgg(egg) {
        this.egg = egg;
    }

    /**
     * @method dropEgg
     * Drop the bird egg in one of the available positions of the nest
     * @param nest - Reference to the MyNest object 
     */
    dropEgg(nest) {
        this.min = 10;
        this.index = -1;
        let found = false;
        this.dist = Math.sqrt(Math.pow(nest.position[0] - this.position[0], 2) + Math.pow(nest.position[2] - this.position[2], 2));
        if (this.dist < this.min && (this.egg.captured)) {
            found = true;
            this.min = this.dist;
        }
        

        if (found) {
            this.egg.setPosition(this.position[0], this.position[1] - 0.6, this.position[2]);
            this.egg.initialTime = Date.now();
            nest.addEgg(this.egg);
            this.egg = null;
        }

    }

    /**
     * @method hasEgg
     * Check if the bird has an egg
     * @returns 
     */
    hasEgg() {
        return this.egg != null;
    }

    /**
     * @method display
     * Displays the moving bird
     */
    display() {
        this.scene.pushMatrix();
        this.oscillate(); 
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
         
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.egg?.display();
        
        this.bird.speedFactor = this.speedFactor;
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.bird.display();
        this.scene.popMatrix();

        this.stopTurning();
    }
}