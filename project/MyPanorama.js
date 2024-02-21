import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MySphere } from "./primitives/MySphere.js";
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - texture to be applied to the sphere
 */
export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.texture = texture;
        this.sphere = new MySphere(scene, 200, 100, true);
        this.initMaterials();
        
    }

    /**
     * @method initMaterials
     * Initialize the Panorama's appearance and texture
     */
    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1,1,1,1);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

    }

    /**
     * @method display
     * Display the panorama
     */
    display() {
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.scale(200,200,200);
        this.sphere.display();
        this.scene.popMatrix();
    }
};

