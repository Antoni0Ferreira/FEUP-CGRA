import {CGFobject} from '../../lib/CGF.js';
import { MyBirdEgg } from './MyBirdEgg.js';

/**
 * MyBirdEggs
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of divisions around the Y axis
 * @param stacks - Number of divisions along the Y axis
 * @param texture - Bird Egg Texture
 */
export class MyBirdEggs extends CGFobject {
    constructor(scene, slices, stacks, texture) {
        super(scene);
        this.egg1 = new MyBirdEgg(scene, slices, stacks, texture);
        this.egg2 = new MyBirdEgg(scene, slices, stacks, texture);
        this.egg3 = new MyBirdEgg(scene, slices, stacks, texture);
        this.egg4 = new MyBirdEgg(scene, slices, stacks, texture);
        this.allEggs = [];
        this.allEggs.push(this.egg1);
        this.allEggs.push(this.egg2);
        this.allEggs.push(this.egg3);
        this.allEggs.push(this.egg4);
        
    }

    /**
     * @method getEgg
     * Function for bird to pick up egg from the ground
     * @param position - Current Bird Position 
     * @returns MyBirdEgg
     */
    getEgg(position) {
        this.min = 5;
        this.index = -1;
        for (var i = 0; i < 4; i++) {
            this.dist = Math.sqrt(Math.pow(this.allEggs[i].getPosition()[0] - position[0], 2) + Math.pow(this.allEggs[i].getPosition()[1] - position[1], 2) + Math.pow(this.allEggs[i].getPosition()[2] - position[2], 2));
            if ((this.dist <= 1.5) && (this.dist < this.min) && (!this.allEggs[i].onNest)) {
                this.min = this.dist;
                this.index = i;
            }
        }

        if (this.index != -1) {
            this.allEggs[this.index].captured = true;
            this.allEggs[this.index].position = [position[0], -71.1, position[2]];
            return this.allEggs[this.index];
        }

        return null;
    }

    /**
     * @method display
     * Display the bird eggs
     */
    display() {
        for(let i = 0; i < 4; i++) {
            this.scene.pushMatrix();
            if (!this.allEggs[i].captured) {
                this.allEggs[i].display();
            }
            this.scene.popMatrix();
        }
    }
}
