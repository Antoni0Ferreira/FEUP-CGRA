import {CGFobject} from '../../lib/CGF.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';

/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 **/

export class MyWing extends CGFobject {
    constructor(scene) {
        super(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangle = new MyTriangleSmall(scene);
    }

    /**
     * @method display
     * Display the bird wing
     */
    display() {
        this.scene.pushMatrix();
        this.scene.scale(1,-1,1);
        this.scene.scale(0.8,0.8,0.8);
        this.scene.translate(0.76,-1,0);
        this.scene.rotate(Math.PI/4,1,1,0);          
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.translate(0,-1,0)
        this.scene.scale(1,1,1);
        this.triangle.display();
        this.scene.popMatrix();
    }
 }