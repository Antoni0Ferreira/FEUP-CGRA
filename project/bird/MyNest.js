import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyCircle } from '../primitives/MyCircle.js';
import { MyNestSide } from '../primitives/MyNestSide.js';

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Nest Texture
 */
export class MyNest extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.texture = texture;
        this.base = new MyCircle(scene, 200);
        this.side = new MyNestSide(scene, 200);
        this.eggPositions = [];
        this.eggPositions.push({pos: [30.5,-80.0,60.5], occupied: false});
        this.eggPositions.push({pos: [30.5,-80.0,59.5], occupied: false});
        this.eggPositions.push({pos: [29.5,-80.0,60.5], occupied: false});
        this.eggPositions.push({pos: [29.5,-80.0,59.5], occupied: false});
        this.position = [30,-80.8,60];
        this.eggs = [];
        this.initMaterials();

    }

    /**
     * @method initMaterials
     * Initialize the appearance and the textures of the nest
     */
    initMaterials() {
        this.circleMaterial = new CGFappearance(this.scene);
        this.circleMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.circleMaterial.setEmission(0.1, 0.1, 0.1, 1);
        this.circleMaterial.setDiffuse(0.9, 0.9, 0.9, 1);;
        this.circleMaterial.setShininess(10.0);
        this.circleMaterial.setTexture(this.texture);
        this.circleMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    /**
     * @method addEgg
     * Add egg to the nest
     * @param egg - Reference to MyBirdEgg object 
     */
    addEgg(egg){
        egg.onNest = true;
        egg.captured = false;
        for(let i = 0; i < 4; i++){
            if(!this.eggPositions[i].occupied){
                
                egg.targetPosition = this.eggPositions[i].pos;
                egg.dropping = true;
                this.eggPositions[i].occupied = true;
                break;
            }
        }
        this.eggs.push(egg);
    }

    /**
     * @method display
     * Display the bird nest
     */
    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.scale(8,8,8);
        this.scene.translate(0,-0.2,0);
        this.circleMaterial.apply();
        this.base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.scale(8,-8,8);
        this.scene.translate(0,-0.2,0);
        this.circleMaterial.apply();
        this.side.display();
        this.scene.popMatrix();

        this.pushMatrix;
        this.popMatrix;


    }
}